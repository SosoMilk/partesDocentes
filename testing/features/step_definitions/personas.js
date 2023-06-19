const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

BeforeAll(async function () {
    // Guardar los cargos
    let res = request('GET', 'http://backend:8080/cargo');
    let response = JSON.parse(res.body, 'utf8');
    this.cargos = response.data;

    // Guardo las divisiones
    res = request('GET', 'http://backend:8080/division');
    response = JSON.parse(res.body, 'utf8');
    this.divisiones = response.data;

    // Guardo las personas
    res = request('GET', 'http://backend:8080/personas');
    response = JSON.parse(res.body, 'utf8');
    this.personas = response.data;

    // Guardo las designaciones
    res = request('GET', 'http://backend:8080/designacion');
    response = JSON.parse(res.body, 'utf8');
    this.designaciones = response.data;

    // Guardo las licencias
    res = request('GET', 'http://backend:8080/licencias');
    response = JSON.parse(res.body, 'utf8');
    this.licencias = response.data;

    res = request('GET', 'http://backend:8080/horario');
    response = JSON.parse(res.body, 'utf8');
    this.horarios = response.data;

    for (let designacion of this.designaciones) {
        await request('DELETE', `http://backend:8080/designacion/id/${designacion.id}`);
    }

    for (let licencia of this.licencias) {
        await request('DELETE', `http://backend:8080/licencias/id/${licencia.id}`);
    }

    for (let horario of this.horarios) {
        await request('DELETE', `http://backend:8080/horario/id/${horario.id}`);
    }

    for (let cargo of this.cargos) {
        await request('DELETE', `http://backend:8080/cargo/id/${cargo.id}`);
    }

    for (let division of this.divisiones) {
        await request('DELETE', 'http://backend:8080/division/id/' + division.id);
    }

    for (let persona of this.personas) {
        await request('DELETE', 'http://backend:8080/personas/id/' + persona.id);
    }

});


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

AfterAll(async function () {
    // Primero agrego las divisiones, despues los cargos, despues las designaciones
    for (let persona of this.personas) {
        await request('POST', 'http://backend:8080/personas', { json: persona });
    }

    for (let division of this.divisiones) {
        await request('POST', 'http://backend:8080/division', { json: division });
    }

    for (let cargo of this.cargos) {
        await request('POST', 'http://backend:8080/cargo', { json: cargo })
    }

    for (let designacion of this.designaciones) {
        await request('POST', 'http://backend:8080/designacion', { json: designacion });
    }

    for (let horario of this.horarios){
        await request('POST', 'http://backend:8080/horario',{json:horario});
    }

    for (let licencia of this.licencias){
        await request('POST', 'http://backend:8080/licencias',{json:licencia})
    }
});