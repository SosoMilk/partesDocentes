package unpsjb.labprog.backend.presenter;

import java.sql.Date;
import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.ArticuloLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

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

    @RequestMapping(value = "/{persona}/{articulo}/{desde}/{hasta}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByPADH(@PathVariable("persona") Persona persona, @PathVariable("articulo") ArticuloLicencia articulo,
                                            @PathVariable("desde") Date desde, @PathVariable("hasta") Date hasta) {
        Optional<Licencia> licenciaOrNull = service.findByPADH(persona, articulo, desde, hasta);
        return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/parteDiario/{fecha}", method = RequestMethod.GET)
    public ResponseEntity<Object> parteDiario(@PathVariable("fecha") String fecha) throws ParseException {
        List<Licencia> licenciaOrNull = service.parteDiario(fecha);
        return (licenciaOrNull != null) ? Response.ok(licenciaOrNull) : Response.notFound();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Licencia Licencia) {

        if (Licencia.getId() == 0) {
            return Response.error("la Licencia no existe, imposible modificar");
        }
        return Response.ok(service.save(Licencia), "Datos de la Licencia actualizados correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Licencia licencia) {  //esta seria factory03
            String response = "";
            
            response = service.validacion(licencia);
            
            if(response.isEmpty() || response == null){
                return Response.ok(service.save(licencia), "Se otorga Licencia artículo "+licencia.getArticulo().getArticulo()+" a "
                    + licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido());
            }else{
                return Response.response(HttpStatus.OK, response, null);
            }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
    Licencia licencia = service.findById(id);
    return (licencia != null) ? Response.ok(service.delete(id), "licencia eliminada") : Response.error("algo salio mal");
    }
}