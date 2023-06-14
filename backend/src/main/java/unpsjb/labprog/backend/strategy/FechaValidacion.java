package unpsjb.labprog.backend.strategy;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.model.Designacion;

public class FechaValidacion implements DesignacionValidation{

    @Override
    public ResponseEntity<Object> validate(Designacion designacion) {
        if (designacion.getFechaFin() != null && designacion.getFechaFin().before(designacion.getFechaInicio())) {
            return Response.response(HttpStatus.CONFLICT, "Existe un error en la selección de fechas", null);
        }
        return null;
    }
    
}
