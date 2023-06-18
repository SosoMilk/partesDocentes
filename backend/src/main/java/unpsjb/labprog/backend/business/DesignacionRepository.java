package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.List;

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

    @Query("SELECT e.persona FROM Designacion e WHERE e.cargo = ?1 AND e.fechaInicio <= ?2 AND (e.fechaFin IS NULL OR e.fechaFin >= ?3) "+
            "AND EXISTS (SELECT l FROM Licencia l WHERE l.persona = e.persona AND l.pedidoDesde <= ?2 AND l.pedidoHasta >= ?3)")
    Persona busquedaDesig(Cargo cargo, Date inicio, Date fin);

    @Query("SELECT d.persona FROM Designacion d WHERE EXISTS (SELECT l FROM Licencia l WHERE l.persona = d.persona AND l.articulo = 3)")
    List<Persona> findReporte();

//     @Query("SELECT e.persona, COUNT(l) FROM Designacion e JOIN e.licencias l " +
//                 "GROUP BY e.persona ORDER BY COUNT(l) DESC")
//         List<Object[]> findReporte();

}