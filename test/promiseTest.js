var chai = require("chai");
var nodeRestPromised = require('../index');
var it = require("mocha").it;
var describe = require("mocha").describe;

var should = chai.should();
describe('node-rest-client-promise', function () {
    describe('client', function () {
        it('should generate the promisified methods', function () {
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

        it('should provide working promises', function (done) {

            var client = nodeRestPromised.Client({});

            client.getPromise(
                'https://www.google.de'
            )
                .catch(
                    function (error) {
                        should.not.exist(
                            error,
                            'Got error: ' + error.message
                        );
                    }
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
});
