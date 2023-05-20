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
        'http://backend:8080/division/' +año+'/'+numero);

    const divisionId = JSON.parse(resD.body, 'utf8').data;

    this.cargo.division = divisionId;

    return assert.equal(resD.statusCode, 200);

});

Given('que si el tipo es espacio curricular, opcionalmente se asigna a la división , , {string}', function (string) {

    if(string == "Tarde"){
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

Given('la persona con {int} {string} y {string}', function (dni, nombre, apellido) { //ver que no se guarda a ermenegildo
    // Write code here that turns the phrase above into concrete actions
    const nombreCodificado = encodeURIComponent(nombre);
    const apellidoCodificado = encodeURIComponent(apellido);
    let res = request(
        'GET',
        'http://backend:8080/personas/'+dni+'/'+nombreCodificado+'/'+apellidoCodificado); //urlenconding

    const personaT = JSON.parse(res.body, 'utf8').data;

    this.designacion = {
        persona : personaT};

    return assert.equal(res.statusCode, 200);
});

Given('que se asigna al cargo  con tipo de designación {string} y {string}', function (tipo, nombre) {
    const nombreCod = encodeURIComponent(nombre);
    let res = request (
        'GET',
        'http://backend:8080/cargo/'+ nombreCod
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

Given('la persona con {string}, {string} y {string}', function (cuil, nombre, apellido) {
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

Given('que se le asigna el articulo {string}', function (articulo) {
    // Write code here that turns the phrase above into concrete actions
    let res = request(
        'GET',
        'http://backend:8080/articulos/' + articulo); //urlenconding

    const art = JSON.parse(res.body, 'utf8').data;

    this.licencia.articulo= art;

    return assert.ok(true);
});

Given('se designa por el período {string} hasta {string}', function (fechaI, fechaF) {
    // Write code here that turns the phrase above into concrete actions
    this.licencia.pedidoDesde = new Date(fechaI);
    this.licencia.pedidoHasta = new Date(fechaF);
    return assert.ok(true);
});

Given('con cetificado médico {string}', function (certificado) {
    this.licencia.certificadoMedico = certificado;
    return assert.ok(true);
});

When('se presiona el botón de guardar licencia', function () {
    let res = request(
        'POST',
        'http://backend:8080/licencias', { json: this.licencia });
    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});
// AfterAll(async function () {
//     this.personas.forEach(persona => request('POST', 'http://backend:8080/personas', { json: persona }));
// });