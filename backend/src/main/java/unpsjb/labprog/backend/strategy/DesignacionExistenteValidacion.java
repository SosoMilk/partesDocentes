package unpsjb.labprog.backend.strategy;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.TipoDesignacion;

public class DesignacionExistenteValidacion implements DesignacionValidationStrategy {

    private DesignacionService service;

    public DesignacionExistenteValidacion(DesignacionService service2) {
        this.service = service2;
    }

    @Override
    public ResponseEntity<Object> validate(Designacion designacion) {
        List<Designacion> designacionExistente = service.consultaFechaCargo(
                designacion.getCargo(), designacion.getFechaInicio(), designacion.getFechaFin());

        if (!designacionExistente.isEmpty()) {
            Designacion designacionEncontrada = designacionExistente.get(0);

            if (designacion.getCargo().getTipo() == TipoDesignacion.CARGO) {
                return Response.response(HttpStatus.BAD_REQUEST,
                        designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido()
                                + " NO ha sido designado/a como " + designacion.getCargo().getNombre()
                                + ". pues el cargo solicitado lo ocupa "
                                + designacionEncontrada.getPersona().getNombre() + " "
                                + designacionEncontrada.getPersona().getApellido() +
                                " para el periodo",
                        null);
            } else {
                return Response.response(HttpStatus.BAD_REQUEST,
                        designacion.getPersona().getNombre() + " " + designacion.getPersona().getApellido()
                                + " NO ha sido designado/a debido a que la asignatura "
                                + designacion.getCargo().getNombre() + " de la división "
                                + designacion.getCargo().getDivision().getAnio() + "º "
                                + designacion.getCargo().getDivision().getNumero() + "º turno "
                                + designacion.getCargo().getDivision().getTurno() + " lo ocupa "
                                + designacionEncontrada.getPersona().getNombre() + " "
                                + designacionEncontrada.getPersona().getApellido() + " para el periodo",
                        null);
            }
        }
        return null;
    }
    
}
