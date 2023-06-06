const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

Given('el horario del dia {string}', function (dia) {
    // Write code here that turns the phrase above into concrete actions
    let horario = {
        dia: dia
    };

    let res = request(
        'POST',
        'http://backend:8080/horario',
        { json: horario }
    );

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

