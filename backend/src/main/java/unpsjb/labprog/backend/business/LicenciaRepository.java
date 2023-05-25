package unpsjb.labprog.backend.business;

import java.sql.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

@Repository
public interface LicenciaRepository extends CrudRepository<Licencia, Integer>{
    

    // @Query("SELECT SUM(DATEDIFF(pedidoHasta, pedidoDesde) + 1) FROM Licencia "+
    //         "WHERE persona = ?1")
    // int cantDiasLic(Persona persona);

    @Query("SELECT COUNT(c) > 0 FROM Licencia c WHERE c.persona = ?1 AND ((c.pedidoDesde <= ?2 AND c.pedidoHasta >= ?2) OR (c.pedidoDesde <= ?3 AND c.pedidoHasta >= ?3) OR (?2 <= c.pedidoDesde AND ?3 >= c.pedidoDesde) OR (?2 <= c.pedidoHasta AND ?3 >= c.pedidoHasta))")
    Boolean mismosDiasLicencia(Persona persona, Date desde, Date hasta);
}