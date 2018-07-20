var Promise = require('bluebird');
var methodNamesToPromisify = 'get post put delete patch'.split(' ');
var nodeRestClient = require('node-rest-client');

/**
 * The Promisifier promisifying the node-rest-client
 * @param originalMethod Original method to be promisified
 * @returns {promisified} The promisified version of the method
 * @constructor
 */
function EventEmitterPromisifier(originalMethod) {
    return function promisified() {
        var args = [].slice.call(arguments);
        var self = this;
        return new Promise(function (resolve, reject) {

            // add the callback to the arguments

            args.push(
                function (data, response) {
                    // resolve the Promise providing data and response as
                    // an object
                    resolve({
                        data: data,
                        response: response
                    });
                }
            );

            // call the method

            var emitter = originalMethod.apply(self,
                args
            );

            // listen to specific events leading to rejects

            emitter
                .on('error', function (err) {
                    reject(err);
                })
                .on('requestTimeout', function (req) {
					req.abort();
                    reject(new Promise.TimeoutError());
                })
                .on('responseTimeout', function () {
                    reject(new Promise.TimeoutError());
                });
        });
    };
};

var registerPromiseMethod = function (name, url, method) {
    // create method in method registry with preconfigured REST invocation
    // method

    var self = this;

    var PromisifiedMethod = function (url, method) {
        var httpMethod = self[method.toLowerCase()];

        return function (args) {
            var completeURL = url;
            if (!args) {
                args = {};
            }

            // eslint-disable-next-line new-cap
            return EventEmitterPromisifier(httpMethod)(completeURL, args);
        };
    };

    this.methods[name] = new PromisifiedMethod(url, method);
};

/**
 * A simple wrapper around `new Client(options)`, returning a promisified
 * client object.
 *
 * @param options Options for `node-rest-client.Client`
 * @returns {*} the promisified client
 */
var client = function (options) {

    var restClient = new nodeRestClient.Client(options);

    var promisifiedClient = Promise.promisifyAll(restClient, {
        filter: function (name) {
            return methodNamesToPromisify.indexOf(name) > -1;
        },
        promisifier: EventEmitterPromisifier,
        suffix: 'Promise'
    });

    promisifiedClient.registerMethodPromise =
        registerPromiseMethod.bind(promisifiedClient);

    return promisifiedClient;
};

exports.Client = client;
