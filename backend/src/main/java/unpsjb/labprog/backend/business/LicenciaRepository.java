package unpsjb.labprog.backend.business;

import java.sql.Date;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

@Repository
public interface LicenciaRepository extends CrudRepository<Licencia, Integer>{
    
    @Query("SELECT (EXTRACT(DAY FROM l.pedidoHasta) - EXTRACT(DAY FROM l.pedidoDesde) + 1) + "
    +"(EXTRACT(DAY FROM ?3) - EXTRACT(DAY FROM ?2) + 1) FROM Licencia l "
    +"WHERE l.persona = ?1")
    Integer cantDiasLic(Persona persona, Date desde, Date hasta);

    @Query("SELECT COUNT(c) > 0 FROM Licencia c WHERE c.persona = ?1 AND (c.pedidoDesde <= ?3 AND c.pedidoHasta >= ?2)")
    Boolean mismosDiasLicencia(Persona persona, Date desde, Date hasta);

    @Query("SELECT COUNT(d) > 0 FROM Designacion d WHERE d.persona = ?1")
    Boolean poseeCargo(Persona persona);

    @Query("SELECT COUNT(l) FROM Licencia l WHERE l.persona = ?1 AND TO_CHAR(l.pedidoDesde, 'MM') = ?2")
    Integer cantLicenciasMes(Persona persona, String mes);

    @Query("SELECT COUNT(l) FROM Licencia l WHERE l.persona = ?1 AND TO_CHAR(l.pedidoDesde, 'yyyy') = ?2")
    Integer cantLicenciasAño(Persona persona, String año);

    @Query("SELECT COUNT(d) > 0 FROM Designacion d WHERE d.persona = ?1 AND ?2 >= d.fechaInicio AND (d.fechaFin IS NULL OR ?2 <= d.fechaFin)")
    Boolean desigXDia(Persona persona, Date fechaLicencia);
}