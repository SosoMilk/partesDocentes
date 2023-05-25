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
import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

@RestController
@RequestMapping("licencias")
public class LicenciaPresenter {
    
    @Autowired
    LicenciaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Licencia licenciaOrNull = service.findById(id);
        return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    }

    // @RequestMapping(value = "/{nombre}", method = RequestMethod.GET)
    // public ResponseEntity<Object> findByNomTip(@PathVariable("nombre") String nombre) {
    //     Licencia licenciaOrNull = service.findByNomTip(nombre);
    //     return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    // }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Licencia Licencia) {

        if (Licencia.getId() == 0) {
            return Response.error("la Licencia no existe, imposible modificar");
        }
        return Response.ok(service.save(Licencia), "Datos de la Licencia actualizados correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Licencia Licencia) {
        try { // Se otorga Licencia artículo 5A a Ermenegildo Sabat
            return Response.ok(service.save(Licencia), "Se otorga Licencia artículo "+Licencia.getArticulo().getArticulo()+" a "
            + Licencia.getPersona().getNombre()+" "+Licencia.getPersona().getApellido());
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "el Licencia ya existe", null);
        }
    }
}
