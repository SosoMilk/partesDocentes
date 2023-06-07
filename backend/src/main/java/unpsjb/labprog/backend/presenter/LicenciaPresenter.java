package unpsjb.labprog.backend.presenter;

import java.sql.Date;
import java.util.Optional;

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
import unpsjb.labprog.backend.business.ValidadorService;
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

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Licencia Licencia) {

        if (Licencia.getId() == 0) {
            return Response.error("la Licencia no existe, imposible modificar");
        }
        return Response.ok(service.save(Licencia), "Datos de la Licencia actualizados correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Licencia licencia) {
        try {

            // if(licencia.getArticulo().getId() == 3){
            //     if(!service.cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde())){
            //         return Response.response(HttpStatus.OK, "NO se otorga Licencia artículo "
            //         +licencia.getArticulo().getArticulo()+" a "+licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido()
            //         +" debido a que supera el tope de 2 dias de licencias por mes", null);
            //     }

            //     if(!service.cantLicenciasXAño(licencia.getPersona(), licencia.getPedidoDesde())){
            //         return Response.response(HttpStatus.OK, "NO se otorga Licencia artículo "
            //         +licencia.getArticulo().getArticulo()+" a "+licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido()
            //         +" debido a que supera el tope de 6 dias de licencias por año", null);
            //     }
            // }

            // if(service.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoHasta(), licencia.getPedidoDesde())){
            //     return Response.response(HttpStatus.BAD_REQUEST,"NO se otorga Licencia artículo"+licencia.getArticulo().getArticulo()+" a "
            //     +licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido()+" debido a que ya posee una licencia en el mismo período", null);
            // }

            // if(!service.poseeCargo(licencia.getPersona())){
            //     return Response.response(HttpStatus.BAD_REQUEST, "NO se otorga Licencia artículo "+licencia.getArticulo().getArticulo()
            //     +" a "+licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido()+" debido a que el agente no posee ningún cargo en la institución", null);
            // }

            // if(!service.desigXDia(licencia.getPersona(), licencia.getPedidoDesde())){
            //     return Response.response(HttpStatus.BAD_REQUEST, "NO se otorga Licencia artículo "+licencia.getArticulo().getArticulo()
            //     +" a "+licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido()
            //     +"i debido a que el agente no tiene designación ese día en la institución", null);
            // }

            // if (!service.validarTopeDiasLicencia(licencia.getPedidoDesde(), licencia.getPedidoHasta())){
            //     return Response.response(HttpStatus.BAD_REQUEST,
            //             "NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
            //                     + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
            //                     + " debido a que supera el tope de 30 días de licencia",
            //             null);
            // }
            
            // return Response.ok(service.save(licencia), "Se otorga Licencia artículo "+licencia.getArticulo().getArticulo()+" a "
            // + licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido());

            String response = ValidadorService.validacion(licencia, service);

            if(response.contains("NO se otorga Licencia artículo")){
                return Response.response(HttpStatus.OK, response, null);
            }else{
                return Response.ok(service.save(licencia), "Se otorga Licencia artículo "+licencia.getArticulo().getArticulo()+" a "
             + licencia.getPersona().getNombre()+" "+licencia.getPersona().getApellido());
            }
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "la Licencia ya existe", null);
        }
    }
}
