package unpsjb.labprog.backend.business.validacionDesignacion;

import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.model.Designacion;

public interface DesignacionValidation {
    ResponseEntity<Object> validate(Designacion designacion);
}
