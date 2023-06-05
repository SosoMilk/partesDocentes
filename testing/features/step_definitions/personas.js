const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

// BeforeAll(async function () {
//     let res = request('GET', 'http://backend:8080/personas');
//     let response = JSON.parse(res.body, 'utf8');
//     this.personas = response.data;

//     this.personas.forEach(persona => request('DELETE', 'http://backend:8080/personas/' + persona.cuit));
// });


Given('la persona con {string}, {string}, {int}, {string}, {string}, {string}, {string}, {string}', 
function (nombre, apellido, Dni, Cuit, sexo, titulo, domicilio, telefono) {
    // Write code here that turns the phrase above into concrete actions
    let persona = {
        nombre: nombre,
        apellido: apellido,
        dni: Dni,
        cuit: Cuit,
        sexo: sexo,
        titulo: titulo,
        domicilio: domicilio,
        telefono: telefono
    };

    let res = request(
        'POST',
        'http://backend:8080/personas',
        { json: persona }
    );

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
    //return true;
});

When('se presiona el botón de guardar', function () {
    // Write code here that turns the phrase above into concrete actions
    return assert.ok(true);
});

Then('se espera el siguiente {int} con la {string}', function (status, message) {
    
    if (this.response && this.response.status == 200) {
        assert.equal(this.response.status, status);
        assert.equal(this.response.message, message);
    }

 
    return true;
});

//esquema de la gran tabla
Given('el docente con CUIL {string}, nombre {string} y apellido {string}', function (cuil, nombre, apellido) {
    // Write code here that turns the phrase above into concrete actions
    let res = request(
        'GET',
        'http://backend:8080/personas/' + cuil); //urlenconding

    const personaT = JSON.parse(res.body, 'utf8').data;

    this.licencia = {
        persona: personaT
    };

    return assert.equal(res.statusCode, 200);
});

When('solicita una licencia artículo {string} con descripción {string} para el período {string} {string}', 
function (articulo, descripción, desde, hasta) {
    this.licencia.pedidoDesde = new Date(desde);
    this.licencia.pedidoHasta = new Date(hasta);
    
    let res = request(
        'GET',
        'http://backend:8080/articulos/' + articulo); //urlenconding

    const art = JSON.parse(res.body, 'utf8').data;

    this.licencia.articulo = art;

    return assert.equal(res.statusCode, 200);
});

When('se presiona el botón de guardar licencia', function () {
    let res = request(
        'POST',
        'http://backend:8080/licencias', { json: this.licencia });
    this.response = JSON.parse(res.body, 'utf8');

    
    return assert.equal(res.statusCode, 200);
});

Then('debería obtener la siguiente resultado de {int} y {string}', function (status, respuesta) {
    // Then('debería obtener la siguiente resultado de {float} y {string}', function (float, string) {
    // Write code here that turns the phrase above into concrete actions
    
    if (this.response && this.response.status == 200) {
        assert.equal(this.response.status, status);
        assert.equal(this.response.message, respuesta);
    }

    return true;
});

// AfterAll(async function () {
//     this.personas.forEach(persona => request('POST', 'http://backend:8080/personas', { json: persona }));
// });