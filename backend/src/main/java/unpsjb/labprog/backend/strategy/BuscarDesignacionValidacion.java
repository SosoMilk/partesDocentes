package unpsjb.labprog.backend.strategy;

import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;

public class BuscarDesignacionValidacion implements DesignacionValidation{

    private DesignacionService service;

    public void DesignacionExistenteValidationStrategy(DesignacionService service) {
        this.service = service;
    }
    
    @Override
    public ResponseEntity<Object> validate(Designacion designacion) {
        Persona persona = service.buscarDesig(designacion.getCargo(), designacion.getFechaInicio(),
                designacion.getFechaFin());
        if (persona != null) {
            return Response.ok(service.save(designacion),
                    designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido()
                            + " ha sido designado/a al cargo " + designacion.getCargo().getNombre()
                            + " exitosamente, en reemplado de "
                            + persona.getNombre() + " " + persona.getApellido());
        }

        return null;
    }
    
}
