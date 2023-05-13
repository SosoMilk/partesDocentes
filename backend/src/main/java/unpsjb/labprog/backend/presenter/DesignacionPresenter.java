package unpsjb.labprog.backend.presenter;

import java.time.LocalDate;
import java.time.ZoneId;

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
import unpsjb.labprog.backend.business.DesignacionService;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.TipoDesignacion;

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

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Designacion Designacion) {
        try {
            // LocalDate fechaInicio = Designacion.getFechaInicio().toInstant().atZone(ZoneId.systemDefault())
            //         .toLocalDate();
            // LocalDate fechaFin = Designacion.getFechaFin().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if(Designacion.getFechaFin() != null)
            if (Designacion.getFechaFin().before(Designacion.getFechaInicio())){
                return Response.response(HttpStatus.CONFLICT, "Existe un error en la seleccion de fechas",null);
            }

            boolean pasa = false;

            if(Designacion.getCargo().getTipo() == TipoDesignacion.CARGO){
                pasa = service.consultaFechaCargo(Designacion.getCargo().getNombre()
                    , Designacion.getFechaInicio(), Designacion.getFechaFin());
                if(pasa){
                    return Response.response(HttpStatus.BAD_REQUEST, Designacion.getPersona().getNombre()+" "
                    +Designacion.getPersona().getApellido()+" NO ha sido designado/a como "+Designacion.getCargo().getNombre()
                    +". ya existe este cargo para estas fechas", null);
                }
            }else{
                pasa = service.consultaFechaEspacio(Designacion.getCargo().getNombre(), Designacion.getCargo().getDivision().getAnio()
                , Designacion.getCargo().getDivision().getNumero(), Designacion.getFechaInicio(), Designacion.getFechaFin());
                if(pasa){// María Rosa Gallo NO ha sido designado/a debido a que ya existe este espacio
                           // curricular para estas fechas
                    return Response.response(HttpStatus.BAD_REQUEST, Designacion.getPersona().getNombre()+" "+Designacion.getPersona().getApellido()
                    +" NO ha sido designado/a debido a que ya existe este espacio curricular para estas fechas",
                            null);
                }
            }

            if (Designacion.getCargo().getTipo() == TipoDesignacion.CARGO) {
                return Response.ok(service.save(Designacion),
                        Designacion.getPersona().getNombre() +" "+ Designacion.getPersona().getApellido()+
                        " ha sido designado/a como "+Designacion.getCargo().getNombre()+" exitosamente");
            } else {
                return Response.ok(service.save(Designacion), Designacion.getPersona().getNombre()+" "+
                Designacion.getPersona().getApellido()+" ha sido designado/a a la asignatura "+Designacion.getCargo().getNombre()
                +" a la división "+Designacion.getCargo().getDivision().getAnio()+"º "+Designacion.getCargo().getDivision().getNumero()+
                "º turno "+Designacion.getCargo().getDivision().getTurno()+" exitosamente");
            }

        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "la Designacion ya existe", null);
        }
    }
}
