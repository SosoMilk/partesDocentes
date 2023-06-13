package unpsjb.labprog.backend.presenter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import unpsjb.labprog.backend.model.Persona;
import unpsjb.labprog.backend.model.TipoDesignacion;
import unpsjb.labprog.backend.strategy.DesignacionExistenteValidacion;
import unpsjb.labprog.backend.strategy.DesignacionValidationStrategy;
import unpsjb.labprog.backend.strategy.FechaValidacion;
import unpsjb.labprog.backend.strategy.TipoCargoStrategy;
import unpsjb.labprog.backend.strategy.TipoDesignacionStrategy;
import unpsjb.labprog.backend.strategy.TipoEspacioStrategy;

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

    public List<DesignacionValidationStrategy> validaciones(){
        List<DesignacionValidationStrategy> validaciones = new ArrayList<>();
        validaciones.add(new FechaValidacion());
        validaciones.add(new DesignacionExistenteValidacion(service));

        return validaciones;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Designacion Designacion) {
        
        Persona persona = service.buscarDesig(Designacion.getCargo(), Designacion.getFechaInicio(), Designacion.getFechaFin());
        if (persona != null) {           
            return Response.ok(service.save(Designacion), Designacion.getPersona().getNombre()+" "+Designacion.getPersona().getApellido()
                +" ha sido designado/a al cargo "+Designacion.getCargo().getNombre()+" exitosamente, en reemplado de "
                +persona.getNombre()+" "+persona.getApellido());
        }

        for (DesignacionValidationStrategy validacion : validaciones()) {
            //ResponseEntity<Object> validationResponse = validacion.validate(Designacion);
            if (validacion.validate(Designacion) != null) {
                return validacion.validate(Designacion);
            }
        }

        Map<TipoDesignacion, TipoDesignacionStrategy> tipoStrategyMap = new HashMap<>();
        tipoStrategyMap.put(TipoDesignacion.CARGO, new TipoCargoStrategy(service));
        tipoStrategyMap.put(TipoDesignacion.ESPACIO_CURRICULAR, new TipoEspacioStrategy(service));

        TipoDesignacionStrategy tipoStrategy = tipoStrategyMap.get(Designacion.getCargo().getTipo());
        if (tipoStrategy != null) {
            return tipoStrategy.process(Designacion);
        }else{
            return Response.response(HttpStatus.CONFLICT, "la Designacion ya existe", null);
        }
    }
}
