const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

Given('el espacio físico división con {int} {int} {string} {string}', function (año, numero, orientacion, turno) {
    // Write code here that turns the phrase above into concrete actions
    let división = {
        anio: año,
        numero: numero,
        orientacion: orientacion,
        turno: turno
    };

    let res = request(
        'POST',
        'http://backend:8080/division',
        { json: división }
    );

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});