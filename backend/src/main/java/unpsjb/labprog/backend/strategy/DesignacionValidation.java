package unpsjb.labprog.backend.strategy;

import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.model.Designacion;

public interface DesignacionValidation {
    ResponseEntity<Object> validate(Designacion designacion);
}
