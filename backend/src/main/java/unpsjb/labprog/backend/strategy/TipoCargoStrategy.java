package unpsjb.labprog.backend.strategy;

import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.model.Designacion;

public class TipoCargoStrategy implements TipoDesignacionStrategy{

    private DesignacionService service;

    public TipoCargoStrategy(DesignacionService service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<Object> process(Designacion designacion) {
        return Response.ok(service.save(designacion),
                designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() +
                        " ha sido designado/a como " + designacion.getCargo().getNombre() + " exitosamente");
    }
    
}
