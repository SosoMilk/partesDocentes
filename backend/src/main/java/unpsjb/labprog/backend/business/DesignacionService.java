package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.Designacion;

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

    public Optional<Designacion> consultaFechaCargo(Cargo nombre, Date fechaInicio, Date fechaFin) {
        return repository.consultaFecha(nombre, fechaInicio, fechaFin);
    }

    // public boolean consultaFechaEspacio(String nombre, String anio, String numero, Date fechaInicio, Date fechaFin){
    //     return repository.consultaFechaEspacio(nombre, anio, numero, fechaInicio, fechaFin);
    // }
}