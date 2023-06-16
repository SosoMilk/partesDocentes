package unpsjb.labprog.backend.business;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Cargo;

@Repository
public interface CargoRepository extends CrudRepository<Cargo, Integer>{

    @Query("SELECT e FROM Cargo e WHERE e.nombre = ?1") //ver si agregarle el tipo
    Optional<Cargo> findAllByNom(String nombre);

    @Query("SELECT e FROM Cargo e WHERE UPPER(e.nombre) LIKE ?1 OR UPPER(e.tipo) LIKE ?1")
    List<Cargo> search(String string); 

    @Query("SELECT e from Cargo e WHERE e.tipo = ?1")
    List<Cargo> findAllByTip(String tipo);

    @Query("SELECT e FROM Cargo e JOIN e.horarios h WHERE h.horaInicio <= ?1 AND h.horaFin >= ?1 AND h.dia = ?2")
    List<Cargo> cargosEnHorarioDia(LocalTime horario, String dia);
    
}
