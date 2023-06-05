const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

Given('la persona con {int} {string} y {string}', function (dni, nombre, apellido) { //ver que no se guarda a ermenegildo
    // Write code here that turns the phrase above into concrete actions
    const nombreCodificado = encodeURIComponent(nombre);
    const apellidoCodificado = encodeURIComponent(apellido);
    let res = request(
        'GET',
        'http://backend:8080/personas/' + dni + '/' + nombreCodificado + '/' + apellidoCodificado); //urlenconding

    const personaT = JSON.parse(res.body, 'utf8').data;

    this.designacion = {
        persona: personaT
    };

    return assert.equal(res.statusCode, 200);
});

Given('que se asigna al cargo  con tipo de designación {string} y {string}', function (tipo, nombre) {
    const nombreCod = encodeURIComponent(nombre);
    let res = request(
        'GET',
        'http://backend:8080/cargo/' + nombreCod
    );
    const cargo = JSON.parse(res.body, 'utf8').data;

    this.designacion.cargo = cargo;

    return assert.equal(res.statusCode, 200);
});

Given('si es espacio curricular asignada a la división {int} {int} {string}', function (año, numero, turno) {
    // Write code here that turns the phrase above into concrete actions
    // if(this.designacion.cargo.tipo == "ESPACIO_CURRICULAR"){
    assert.equal(this.designacion.cargo.division.anio, año);
    assert.equal(this.designacion.cargo.division.numero, numero);
    assert.equal(this.designacion.cargo.division.turno, turno);
    //}
    return assert.ok(true);
});

Given('si es espacio curricular asignada a la división   {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return assert.ok(true);
});

Given('se designa por el período {string} {string}', function (fechaI, fechaF) {
    // Write code here that turns the phrase above into concrete actions
    this.designacion.fechaInicio = new Date(fechaI);
    this.designacion.fechaFin = new Date(fechaF);
    return assert.ok(true);
});

When('se presiona el botón de guardar designacion', function () {
    let res = request(
        'POST',
        'http://backend:8080/designacion', { json: this.designacion });
    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

Given('la persona con {string} {string} y {string}', function (cuil, nombre, apellido) {
    // Write code here that turns the phrase above into concrete actions
    let res = request(
        'GET',
        'http://backend:8080/personas/' + cuil); //urlenconding

    const personaT = JSON.parse(res.body, 'utf8').data;

    this.designacion = {
        persona: personaT
    };

    return assert.equal(res.statusCode, 200);
});

Given('se designa por el período {string} a {string}', function (fechaI, fechaF) {
    // Write code here that turns the phrase above into concrete actions
    this.designacion.fechaInicio = new Date(fechaI);
    this.designacion.fechaFin = new Date(fechaF);
    return assert.ok(true);
});