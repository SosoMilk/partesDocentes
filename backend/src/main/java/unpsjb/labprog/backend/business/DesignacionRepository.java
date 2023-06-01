package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Persona;

@Repository
public interface DesignacionRepository extends CrudRepository<Designacion, Integer>{
    
    @Query("SELECT e FROM Designacion e WHERE (e.cargo = ?1) " +
            "AND (e.fechaInicio <= COALESCE(?3, e.fechaInicio)) AND (?2 <= COALESCE(e.fechaFin, ?2))")
    List<Designacion> consultaFecha(Cargo cargo, Date fechaInicio, Date fechaFin);

    @Query("SELECT e.persona FROM Designacion e WHERE e.cargo = ?1 AND e.fechaInicio >= ?2 AND e.fechaFin >= ?3")
    Persona busquedaDesig(Cargo cargo, Date inicio, Date fin);

}