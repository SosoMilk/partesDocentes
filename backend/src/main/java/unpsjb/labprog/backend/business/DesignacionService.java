package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;

@Service
public class DesignacionService {
    
    @Autowired
    DesignacionRepository repository;

    public List<Designacion> findAll() {
        List<Designacion> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Designacion findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Designacion save(Designacion Designacion) {
        return repository.save(Designacion);
    }

    public List<Designacion> consultaFechaCargo(Cargo nombre, Date fechaInicio, Date fechaFin) {
        return repository.consultaFecha(nombre, fechaInicio, fechaFin);
    }

    public Persona buscarDesig(Cargo cargo, Date inicio, Date fin){
        return repository.busquedaDesig(cargo, inicio, fin);
    }
    // public boolean consultaFechaEspacio(String nombre, String anio, String numero, Date fechaInicio, Date fechaFin){
    //     return repository.consultaFechaEspacio(nombre, anio, numero, fechaInicio, fechaFin);
    // }
}