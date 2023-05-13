package unpsjb.labprog.backend.business;

import java.sql.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Designacion;

@Repository
public interface DesignacionRepository extends CrudRepository<Designacion, Integer>{
    
    @Query("SELECT COUNT(c) > 0 FROM Designacion d join Cargo c on (d.cargo = c.id) WHERE c.nombre = ?1 AND d.fechaFin >= ?2 AND d.fechaInicio <= ?3")
    boolean consultaFechaCargo(String nombre, Date fechaInicio, Date fechaFin);

    @Query
("SELECT COUNT(c) > 0 FROM Designacion d join Cargo c on (d.cargo = c.id) join Division di on (c.division = di.id) WHERE di.anio = ?2 and di.numero= ?3 and c.nombre = ?1 AND d.fechaFin >= ?4 AND d.fechaInicio <= ?5")
    boolean consultaFechaEspacio(String nombre, String anio, String numero, Date fechaInicio, Date fechaFin);

}
