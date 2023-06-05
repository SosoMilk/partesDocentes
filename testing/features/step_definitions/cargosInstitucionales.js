const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');


Given('el cargo institucional cuyo {string} que da título al mismo', function (nombre) {
    this.cargo = {
        nombre: nombre
    };
    return assert.ok(true);
});

Given('que es del {string}', function (tipoDesignación) {
    // Write code here that turns the phrase above into concrete actions
    this.cargo.tipo = tipoDesignación;

    return assert.ok(true);
});

Given('que tiene una {int} con la vigencia {string} {string}', function (cargoHoraria, Desde, Hasta) {
    // Write code here that turns the phrase above into concrete actions
    this.cargo.cargaHoraria = cargoHoraria;
    this.cargo.fechaInicio = new Date(Desde);
    this.cargo.fechaFin = new Date(Hasta);

    return assert.ok(true);
});

Given('que si el tipo es espacio curricular, opcionalmente se asigna a la división {int}, {int}, {string}', function (año, numero, turno) {

    let resD = request(
        'GET',
        'http://backend:8080/division/' + año + '/' + numero);

    const divisionId = JSON.parse(resD.body, 'utf8').data;

    this.cargo.division = divisionId;

    return assert.equal(resD.statusCode, 200);

});

Given('que si el tipo es espacio curricular, opcionalmente se asigna a la división , , {string}', function (string) {

    if (string == "Tarde") {
        let resD = request(
            'GET',
            'http://backend:8080/division/' + 3 + '/' + 1);

        const divisionId = JSON.parse(resD.body, 'utf8').data;

        this.cargo.division = divisionId;
    }

    return assert.ok(true);
});

When('se presiona el botón de guardar cargo', function () {
    let res = request(
        'POST',
        'http://backend:8080/cargo', { json: this.cargo });
    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});