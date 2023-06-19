package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DivisionService;
import unpsjb.labprog.backend.model.Division;

@RestController
@RequestMapping("division")
public class DivisionPresenter {
    
    @Autowired
    DivisionService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Division divisionOrNull = service.findById(id);
        return (divisionOrNull != null) ? Response.ok(divisionOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/{anio}/{numero}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByCode(@PathVariable("anio") String anio, @PathVariable("numero") String numero) {
        Division divisionOrNull = service.findByCode(anio, numero);
        return (divisionOrNull != null) ? Response.ok(divisionOrNull, "Division encontrada correctamente")
                : Response.notFound("La Division no existe");
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Division division) {

        if (division.getId() == 0) {
            return Response.error("Division no existe, imposible modificar");
        }
        return Response.ok(service.save(division), "Datos de la division actualizada correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Division division) {
        try {     // División 5º 2º turno Mañana ingresada correctamente
            return Response.ok(service.save(division),
                    "División " + division.getAnio() + "º " + division.getNumero() + "º turno "
                            + division.getTurno() + " ingresada correctamente");
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "La division ya existe", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        Division division = service.findById(id);
        return (division != null) ? Response.ok(service.delete(id), "division eliminada")
                : Response.notFound("no se puede eliminar");
    }
}