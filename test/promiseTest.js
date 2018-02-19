var chai = require('chai');
var Promise = require('bluebird');
var nodeRestPromised = require('../index');
var it = require('mocha').it;
var describe = require('mocha').describe;

var should = chai.should();
describe('node-rest-client-promise', function () {
    describe('client', function () {
        it('should generate the promisified methods', function () {
            // eslint-disable-next-line new-cap
            var client = nodeRestPromised.Client({});

            client.should.hasOwnProperty(
                'getPromise',
                'Missing GET method'
            );

            client.should.hasOwnProperty(
                'postPromise',
                'Missing POST method'
            );

            client.should.hasOwnProperty(
                'putPromise',
                'Missing PUT method'
            );

            client.should.hasOwnProperty(
                'deletePromise',
                'Missing DELETE method'
            );

            client.should.hasOwnProperty(
                'patchPromise',
                'Missing PATCH method'
            );

        });

        it('should provide working promises', function () {

            // eslint-disable-next-line new-cap
            var client = nodeRestPromised.Client({});

            return client.getPromise(
                'https://www.google.de'
            )
                .then(
                    function (result) {
                        result.response.statusCode
                            .should.be.below(
                            300,
                            'Got wrong http status code back'
                        );
                    }
                );

            done();

        });
    });
    describe('client#registerMethod', function() {
        it('should add a promise', function () {
            // eslint-disable-next-line new-cap
            var client = nodeRestPromised.Client({});

            client.registerMethodPromise(
                'testMethod', 'https://somedomain', 'GET'
            );

            return client.methods.testMethod()
                .catch(
                    function (e) {
                        return e.code === 'ENOTFOUND';
                    },
                    function () {
                        return Promise.resolve();
                    }
                );
        });
    });
});
