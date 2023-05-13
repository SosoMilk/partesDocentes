package unpsjb.labprog.backend.business;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Division;

@Repository
public interface DivisionRepository extends CrudRepository<Division, Integer> {

    @Query("SELECT e FROM Division e WHERE e.anio = ?1 and e.numero = ?2") // convierte fila en objetos
    Optional<Division> findByCode(String anio, String numero);
    
}
