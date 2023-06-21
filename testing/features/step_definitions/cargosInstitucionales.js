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




Given('el cargo institucional existente cuyo nombre es {string}', function (nombre) {

    const nombreCod = encodeURIComponent(nombre);

    let res = request(
        'GET',
        'http://backend:8080/cargo/' + nombreCod
    );
    const cargo = JSON.parse(res.body, 'utf8').data;

    this.cargo = cargo;
    //console.log(cargo);

    return assert.equal(res.statusCode, 200);

});

function createLocalTime(hours, minutes, seconds) {
    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function getLocalTime(localTime) {
    return {
        hours: localTime.hours,
        minutes: localTime.minutes,
        seconds: localTime.seconds
    };
}

Given('con horario para el {string}', function (dia) {
    // Write code here that turns the phrase above into concrete actions
    let horaInicio = createLocalTime(13, 0, 0);
    let horaFin = createLocalTime(13, 0, 0);

    if (dia !== "dia") {
        this.cargo.horarios = [{
            id: 0,
            dia: dia,
            horaInicio: null,
            horaFin: null
        }];
    } else {
        this.cargo.horarios = [
            { id: 0, dia: "Lunes", horaInicio: null, horaFin: null },
            { id: 0, dia: "Martes", horaInicio: null, horaFin: null },
            { id: 0, dia: "Miércoles", horaInicio: null, horaFin: null },
            { id: 0, dia: "Jueves", horaInicio: null, horaFin: null },
            { id: 0, dia: "Viernes", horaInicio: null, horaFin: null },
            { id: 0, dia: "Sábado", horaInicio: null, horaFin: null },
            { id: 0, dia: "Domingo", horaInicio: null, horaFin: null }
        ];
    }

    return assert.ok(true);
});

When('se presiona el botón de actualizar cargo', function () {
    //const { id, ...cargoData } = this.cargo;

    let res = request(
        'PUT',
        'http://backend:8080/cargo', { json: this.cargo });

    this.response = JSON.parse(res.body, 'utf8');

    return assert.equal(res.statusCode, 200);
});
