const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

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
        'http://backend:8080/licencias/' + this.personaP.id + '/' + art.id + '/' + desde + '/' + hasta);

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

        return assert.equal(res.statusCode, 200);
    });

Then('se recupera el mensaje', function (docString) {
    // Write code here that turns the phrase above into concrete actions

    console.log(this.response.message);
    if (this.response && this.response.status == 200) {
        const expectedMessage = JSON.parse(docString).StatusText;
        const expectedStatusCode = JSON.parse(docString).StatusCode;

        assert.equal(this.response.message, expectedMessage);
        assert.equal(this.response.status, expectedStatusCode);
    }

    return true;
});
