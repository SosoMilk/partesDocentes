package unpsjb.labprog.backend.business.validacionDesignacion;

import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.model.Designacion;

public class TipoEspacioStrategy implements TipoDesignacionStrategy{

    private DesignacionService service;

    public TipoEspacioStrategy(DesignacionService service) {
        this.service = service;
    }

    @Override
    public ResponseEntity<Object> process(Designacion designacion) {
        return Response.ok(service.save(designacion),
                designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido() +
                        " ha sido designado/a a la asignatura " + designacion.getCargo().getNombre() +
                        " a la división " + designacion.getCargo().getDivision().getAnio() + "º " +
                        designacion.getCargo().getDivision().getNumero() + "º turno " +
                        designacion.getCargo().getDivision().getTurno() + " exitosamente");
    }
    
}
