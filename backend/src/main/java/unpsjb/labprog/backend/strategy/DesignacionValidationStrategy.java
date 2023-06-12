package unpsjb.labprog.backend.strategy;

import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.model.Designacion;

public interface DesignacionValidationStrategy {
    ResponseEntity<Object> validate(Designacion designacion);
}
