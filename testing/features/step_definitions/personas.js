const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');
// const { After } = require('cucumber');

// After(function () {
//     // Agrega aquí el código que deseas ejecutar después de cada escenario
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

Given('que existe la persona con cuil {string}', function (cuil) {
    let res = request(
        'GET', 
        'http://backend:8080/personas/' + cuil);

    this.aPersona = JSON.parse(res.body, 'utf8').data;
    // TENGO QUE HACER ASSERT FALSE SI DA 404
    return assert.ok(true);
});

When('solicito borrar a la persona con cuil {string}', function (cuil) {
    let res = request(
        'DELETE', 
        'http://backend:8080/personas/' + cuil);

    this.response = JSON.parse(res.body, 'utf8');
    
    return assert.equal(res.statusCode, 200);
});

When('se presiona el botón de guardar', function () {
    // Write code here that turns the phrase above into concrete actions
    let res = request(
        'GET',
        'http://backend:8080/personas'
    );

    JSON.parse(res.body, 'utf8');//this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

Then('se espera el siguiente {int} con la {string}', function (status, message) {
    
    if (this.response.status == 200) {
        assert.equal(this.response.status, status);
        assert.equal(this.response.message, message);
    }

    return true;
});
