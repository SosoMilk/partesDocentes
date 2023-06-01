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
//escenarios
Given('que existe la persona', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const personaData = dataTable.hashes()[0];
    const cuil = personaData.CUIL;

    let res = request(
        'GET',
        'http://backend:8080/personas/' + cuil); //urlenconding

    const personaT = JSON.parse(res.body, 'utf8').data;

    this.auxDesig = {
        persona: personaT
    };

    return assert.equal(res.statusCode, 200);
});

Given('que existen las siguientes instancias de designación asignada', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const designacionData = dataTable.hashes()[0];
    const nombre = designacionData.NombreTipoDesignacion;
    const nombreCod = encodeURIComponent(nombre);

    let res = request(
        'GET',
        'http://backend:8080/cargo/' + nombreCod
    );
    const cargo = JSON.parse(res.body, 'utf8').data;

    this.auxDesig.cargo = cargo;
    console.log(cargo);

    return assert.equal(res.statusCode, 200);
});

Given('que la instancia de designación está asignada a la persona', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const personaData = dataTable.hashes()[0];
    const cuil = personaData.CUIL;


    let resP = request(
        'GET',
        'http://backend:8080/personas/' + cuil); //urlenconding

    this.personaP = JSON.parse(resP.body, 'utf8').data;

    return assert.equal(resP.statusCode, 200);
});

Given('que la instancia de designación está asignada a la persona con licencia {string} comprendida en el período desde {string} hasta {string}', function (articulo, desde, hasta) {
    // Write code here that turns the phrase above into concrete actions

    let resA = request(
        'GET',
        'http://backend:8080/articulos/' + articulo); //urlenconding

    const art = JSON.parse(resA.body, 'utf8').data;

    let resL = request(
        'GET',
        'http://backend:8080/licencias/'+ this.personaP.id+'/'+art.id+'/'+desde+'/'+hasta);

    return assert.equal(resL.statusCode, 200);
});

When('se solicita el servicio de designación de la persona al cargo en el período comprendido desde {string} hasta {string}', 
    function (desde, hasta) {
    // Write code here that turns the phrase above into concrete actions
    this.auxDesig.fechaInicio = new Date(desde);
    this.auxDesig.fechaFin = new Date(hasta);

        let res = request(
            'POST',
            'http://backend:8080/designacion', { json: this.auxDesig });
        this.response = JSON.parse(res.body, 'utf8');

        console.log(this.response.message);

    return assert.equal(res.statusCode, 200);
});

Then('se recupera el mensaje', function (docString) {
    // Write code here that turns the phrase above into concrete actions

    if (this.response && this.response.status == 200) {
        const expectedMessage = JSON.parse(docString).StatusText;
        const expectedStatusCode = JSON.parse(docString).StatusCode;

        assert.equal(this.response.message, expectedMessage);
        assert.equal(this.response.status, expectedStatusCode);
        console.log(this.response.message);

    }

    return true;
});
// AfterAll(async function () {
//     this.personas.forEach(persona => request('POST', 'http://backend:8080/personas', { json: persona }));
// });