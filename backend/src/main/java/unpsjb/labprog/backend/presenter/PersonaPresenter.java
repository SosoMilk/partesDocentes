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
import unpsjb.labprog.backend.business.PersonaService;
import unpsjb.labprog.backend.model.Persona;

@RestController
@RequestMapping("personas") // por este nos conectamos medio internes
public class PersonaPresenter {

    @Autowired
    PersonaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Persona personaOrNull = service.findById(id);
        return (personaOrNull != null) ? Response.ok(personaOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/{code}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByCuit(@PathVariable("code") String cuit) {
        Persona personaOrNull = service.findByCuit(cuit);
        return (personaOrNull != null) ? Response.ok(personaOrNull, "Persona encontrada correctamente")
                : Response.notFound("La persona no existe");
    }

    @RequestMapping(value = "/{dni}/{nombre}/{apellido}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByDna(@PathVariable("dni") String dni, @PathVariable("nombre") String nombre,
            @PathVariable("apellido") String apellido) {
        Persona PersonaOrNull = service.findByDna(dni, nombre, apellido);
        return (PersonaOrNull != null) ? Response.ok(PersonaOrNull, "Persona encontrada correctamente")
                : Response.notFound("La Persona no existe");
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Persona persona) {

        if (persona.getId() == 0) {
            return Response.error("Persona no existe, imposible modificar");
        }
        return Response.ok(service.save(persona), "Datos de persona actualizada correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Persona persona) {
        try {
            return Response.ok(service.save(persona),
                    "La persona: " + persona.getNombre() + " " + persona.getApellido() + " con DNI "
                            + persona.getDni() + " ingresado/a correctamente");
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "La persona con el id " + persona.getId()
                    + " ya existe", null);
        }

    }

    @RequestMapping(value = "/{cuit}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("cuit") String cuit) {
        return (service.delete(cuit) != null) ? Response.ok(null, "Persona eliminada correctamente")
                : Response.notFound("la persona con cuil " + cuit + " no existe");
    }

    // @RequestMapping(method = RequestMethod.DELETE)
    // public ResponseEntity<Object> delete(@PathVariable("id") int id) {
    // Persona apersonaOrNull = service.findById(id);
    // return (apersonaOrNull != null) ? Response.ok(apersonaOrNull) :
    // Response.notFound();
    // }
}
