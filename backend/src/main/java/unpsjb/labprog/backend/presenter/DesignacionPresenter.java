package unpsjb.labprog.backend.presenter;

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
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.TipoDesignacion;

@RestController
@RequestMapping("designacion")
public class DesignacionPresenter {
    
    @Autowired
    DesignacionService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Designacion DesignacionOrNull = service.findById(id);
        return (DesignacionOrNull != null) ? Response.ok(DesignacionOrNull) : Response.notFound();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Designacion Designacion) {
        try {
            if(Designacion.getFechaFin() != null)
            if (Designacion.getFechaFin().before(Designacion.getFechaInicio())){
                return Response.response(HttpStatus.CONFLICT, "Existe un error en la seleccion de fechas",null);
            }

            Optional<Designacion> designacionExistente = service.consultaFechaCargo(
                Designacion.getCargo(), Designacion.getFechaInicio(), Designacion.getFechaFin());

        if (designacionExistente.isPresent()) {
            Designacion designacionEncontrada = designacionExistente.get();

            if (Designacion.getCargo().getTipo() == TipoDesignacion.CARGO) { 
                return Response.response(HttpStatus.BAD_REQUEST,
                        Designacion.getPersona().getNombre() + " " + Designacion.getPersona().getApellido()
                                + " NO ha sido designado/a como " + Designacion.getCargo().getNombre()
                                + ". pues el cargo solicitado lo ocupa "
                                + designacionEncontrada.getPersona().getNombre() + " "
                                + designacionEncontrada.getPersona().getApellido()+ 
                                " para el periodo",
                        null);
            } else {
                return Response.response(HttpStatus.BAD_REQUEST,
                        Designacion.getPersona().getNombre() + " " + Designacion.getPersona().getApellido()
                                + " NO ha sido designado/a debido a que la asignatura "
                                + Designacion.getCargo().getNombre() + " de la división "
                                + Designacion.getCargo().getDivision().getAnio() + "º "
                                + Designacion.getCargo().getDivision().getNumero() + "º turno "
                                + Designacion.getCargo().getDivision().getTurno() + " lo ocupa "
                                + designacionEncontrada.getPersona().getNombre() + " "
                                + designacionEncontrada.getPersona().getApellido() + " para el periodo",
                        null);
            }  
        }

            if (Designacion.getCargo().getTipo() == TipoDesignacion.CARGO) {
                return Response.ok(service.save(Designacion),
                        Designacion.getPersona().getNombre() +" "+ Designacion.getPersona().getApellido()+
                        " ha sido designado/a como "+Designacion.getCargo().getNombre()+" exitosamente");
            } else {
                return Response.ok(service.save(Designacion), Designacion.getPersona().getNombre()+" "+
                Designacion.getPersona().getApellido()+" ha sido designado/a a la asignatura "+Designacion.getCargo().getNombre()
                +" a la división "+Designacion.getCargo().getDivision().getAnio()+"º "+Designacion.getCargo().getDivision().getNumero()+
                "º turno "+Designacion.getCargo().getDivision().getTurno()+" exitosamente");
            }

        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "la Designacion ya existe", null);
        }
    }
}
