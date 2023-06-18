package unpsjb.labprog.backend.presenter;

import java.util.List;

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
import unpsjb.labprog.backend.business.CargoService;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.TipoDesignacion;

@RestController
@RequestMapping("cargo")
public class CargoPresenter {
    
    @Autowired
    CargoService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }{}

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Cargo cargoOrNull = service.findById(id);
        return (cargoOrNull != null) ? Response.ok(cargoOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/{nombre}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByNom(@PathVariable("nombre") String nombre) {
        Cargo cargoOrNull = service.findByNom(nombre);
        return (cargoOrNull != null) ? Response.ok(cargoOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/tipo/{tipo}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByTip(@PathVariable("tipo") String tipo) {
        List<Cargo> cargoOrNull = service.findByTip(tipo);
        return Response.ok(cargoOrNull);
    }

    @RequestMapping(value = "/calendario/{horario}/{dia}", method = RequestMethod.GET)
    public ResponseEntity<Object> cargosEnHorarioDia(@PathVariable("horario")String horario, @PathVariable("dia")String dia) {
        List<Cargo> cargoOrNull = service.cargosEnHorarioDia(horario, dia);
        return Response.ok(cargoOrNull);
    }

    @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(service.search(term));
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Cargo cargo) {

        if (cargo.getId() == 0) {
            return Response.error("el cargo no existe, imposible modificar");
        }
        return Response.ok(service.save(cargo), "Datos del cargo actualizado correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Cargo cargo) {
        try { 

            if( cargo.getTipo() ==TipoDesignacion.CARGO && cargo.getDivision() != null){
                return Response.response(HttpStatus.NOT_IMPLEMENTED, "Cargo de " + cargo.getNombre()
                        + " es " + cargo.getTipo() + " y no corresponde asignar división", null);
            }

            if( cargo.getTipo() == TipoDesignacion.ESPACIO_CURRICULAR && cargo.getDivision() == null){
                return Response.response(HttpStatus.NOT_IMPLEMENTED, "Espacio Curricular "+cargo.getNombre()+
                " falta asignar división", null);
            }

            if(cargo.getTipo() == TipoDesignacion.CARGO && cargo.getDivision() == null){
                return Response.ok(service.save(cargo),
                        "Cargo de " + cargo.getNombre() + " ingresado correctamente");
            } else{ //Cargo de Auxiliar ACAD es CARGO y no corresponde asignar división
             return Response.ok(service.save(cargo),"Espacio Curricular " + cargo.getNombre() + " para la division "
                + cargo.getDivision().getAnio() + "º "+ cargo.getDivision().getNumero() + "º Turno "+
                cargo.getDivision().getTurno() +" ingresado correctamente");
            }   


        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "el cargo ya existe", null);
        }
    }
}
