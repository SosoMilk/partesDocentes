package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Cargo;
import unpsjb.labprog.backend.model.Designacion;

@Repository
public interface DesignacionRepository extends CrudRepository<Designacion, Integer>{
    
    // @Query("SELECT e FROM Designacion e WHERE (e.cargo = ?3) " +
    //         "AND (e.fechaInicio <= COALESCE(?2, e.fechaInicio)) AND (?1 <= COALESCE(e.fechaFin, ?1))")
    @Query("SELECT e FROM Designacion e WHERE (e.cargo = ?1) " +
            "AND (e.fechaInicio <= COALESCE(?3, e.fechaInicio)) AND (?2 <= COALESCE(e.fechaFin, ?2))")
    Optional<Designacion> consultaFecha(Cargo cargo, Date fechaInicio, Date fechaFin);

//     @Query
// ("SELECT COUNT(c) > 0 FROM Designacion d join Cargo c on (d.cargo = c.id) join Division di on (c.division = di.id) WHERE di.anio = ?2 and di.numero= ?3 and c.nombre = ?1 AND d.fechaFin >= ?4 AND d.fechaInicio <= ?5")
//     boolean consultaFechaEspacio(String nombre, String anio, String numero, Date fechaInicio, Date fechaFin);

}
