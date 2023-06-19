package unpsjb.labprog.backend.presenter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import unpsjb.labprog.backend.strategy.DesignacionValidation;
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

    @RequestMapping(value = "/reporte", method = RequestMethod.GET)
    public ResponseEntity<Object> findReporte() {
        return Response.ok(service.findResporte());
    }

    public List<DesignacionValidation> validaciones(){
        List<DesignacionValidation> validaciones = new ArrayList<>();
        validaciones.add(new FechaValidacion());
        validaciones.add(new DesignacionExistenteValidacion(service));

        return validaciones;
    }

    public TipoDesignacionStrategy tipoDelMapa(TipoDesignacion tipo){
        Map<TipoDesignacion, TipoDesignacionStrategy> mapaTipo = new HashMap<>();
        mapaTipo.put(TipoDesignacion.CARGO, new TipoCargoStrategy(service));
        mapaTipo.put(TipoDesignacion.ESPACIO_CURRICULAR, new TipoEspacioStrategy(service));

        return mapaTipo.get(tipo);

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Designacion Designacion) {
        
        Persona persona = service.buscarDesig(Designacion.getCargo(), Designacion.getFechaInicio(), Designacion.getFechaFin());
        if (persona != null) {           
            return Response.ok(service.save(Designacion), Designacion.getPersona().getNombre()+" "+Designacion.getPersona().getApellido()
                +" ha sido designado/a al cargo "+Designacion.getCargo().getNombre()+" exitosamente, en reemplado de "
                +persona.getNombre()+" "+persona.getApellido());
        }

        for (DesignacionValidation validacion : validaciones()) {
            if (validacion.validate(Designacion) != null) {
                return validacion.validate(Designacion);
            }
        }
        
        if (tipoDelMapa(Designacion.getCargo().getTipo()) != null) {
            return tipoDelMapa(Designacion.getCargo().getTipo()).process(Designacion);
        }else{
            return Response.response(HttpStatus.CONFLICT, "la Designacion ya existe", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        Designacion designacion = service.findById(id);
        return (designacion != null) ? Response.ok(service.delete(id), "designacion eliminada")
                : Response.notFound("no se puede eliminar");
    }
}
