package unpsjb.labprog.backend.business;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.ArticuloLicencia;
import unpsjb.labprog.backend.model.Designacion;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

@Repository
public interface LicenciaRepository extends CrudRepository<Licencia, Integer>{

    @Query("SELECT COUNT(c) > 0 FROM Licencia c WHERE c.persona = ?1 AND (c.pedidoDesde <= ?3 AND c.pedidoHasta >= ?2)")
    Boolean mismosDiasLicencia(Persona persona, Date desde, Date hasta);

    @Query("SELECT COUNT(d) > 0 FROM Designacion d WHERE d.persona = ?1")
    Boolean poseeCargo(Persona persona);

    @Query("SELECT COUNT(l) FROM Licencia l WHERE l.persona = ?1 AND TO_CHAR(l.pedidoDesde, 'MM') = ?2")
    Integer cantLicenciasMes(Persona persona, String mes);

    @Query("SELECT COUNT(l) FROM Licencia l WHERE l.persona = ?1 AND TO_CHAR(l.pedidoDesde, 'YYYY') = ?2")
    Integer cantLicenciasAño(Persona persona, String año);

    @Query("SELECT COUNT(d) > 0 FROM Designacion d WHERE d.persona = ?1 AND ?2 >= d.fechaInicio AND (d.fechaFin IS NULL OR ?2 <= d.fechaFin)")
    Boolean desigXDia(Persona persona, Date fechaLicencia);

    @Query("SELECT l FROM Licencia l where l.persona = ?1 AND l.articulo = ?2 AND l.pedidoDesde = ?3 AND l.pedidoHasta = ?4")
    Optional<Licencia> findAllByPADH(Persona persona, ArticuloLicencia articulo, Date desde, Date hasta);

    @Query("UPDATE Designacion set fechaFin = ?2 where persona = ?1")
    Optional<Designacion> editFecha(Persona persona, Date desde);

    @Query("SELECT l FROM Licencia l WHERE (?1 >= l.pedidoDesde AND ?1 <= l.pedidoHasta)")
    List<Licencia> parteDiario(Date fecha);

}