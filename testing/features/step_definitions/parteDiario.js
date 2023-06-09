const assert = require('assert');
const { Given, When, Then, BeforeAll, AfterAll } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

Given('la existencia de las siguientes licencias', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const licencias = dataTable.hashes();

    for (const licencia of licencias) {
        const cuil = licencia.CUIL;
        const articulo = licencia.Artículo;
        const desde = licencia.Desde;
        const hasta = licencia.Hasta;

        let res = request(
            'GET',
            'http://backend:8080/personas/' + cuil); //urlenconding

        const personaT = JSON.parse(res.body, 'utf8').data;

        let resA = request(
            'GET',
            'http://backend:8080/articulos/' + articulo); //urlenconding

        const art = JSON.parse(resA.body, 'utf8').data;

        let resL = request(
            'GET',
            'http://backend:8080/licencias/' + personaT.id + '/' + art.id + '/' + desde + '/' + hasta);

        return assert.equal(resL.statusCode, 200);
    }

    return assert.ok(true);
});

Given('que se otorgan las siguientes nuevas licencias', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const licencias = dataTable.hashes();

    for (const licencia of licencias) {
        const cuil = licencia.CUIL;
        const articulo = licencia.Artículo;
        const desde = licencia.Desde;
        const hasta = licencia.Hasta;

        let res = request(
            'GET',
            'http://backend:8080/personas/' + cuil); //urlenconding

        const personaT = JSON.parse(res.body, 'utf8').data;

        let resA = request(
            'GET',
            'http://backend:8080/articulos/' + articulo); //urlenconding

        const art = JSON.parse(resA.body, 'utf8').data;

        this.licencia = {
            persona: personaT,
            articulo: art,
            pedidoDesde: desde,
            pedidoHasta: hasta,
            certificadoMedico: true
        }

        let resl = request(
            'POST',
            'http://backend:8080/licencias', { json: this.licencia });
        this.response = JSON.parse(resl.body, 'utf8');

        return assert.equal(resl.statusCode, 200);
    }

    return assert.ok(true);
});

When('se solicita el parte diario para la fecha {string}', function (fecha) {
    // Write code here that turns the phrase above into concrete actions
    let res = request(
        'GET',
        'http://backend:8080/licencias/parteDiario/' + fecha); //urlenconding

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});

Then('el sistema responde', function (docString) {
    // Write code here that turns the phrase above into concrete actions
    let expectedResponse = JSON.parse(docString);
    let expectedParteDiario = expectedResponse.ParteDiario;

    if (this.response && this.response.ParteDiario) {
        let actualParteDiario = this.response.ParteDiario;

        console.log(actualParteDiario);
        assert.deepEqual(actualParteDiario, expectedParteDiario);
    }

    return true;
});
