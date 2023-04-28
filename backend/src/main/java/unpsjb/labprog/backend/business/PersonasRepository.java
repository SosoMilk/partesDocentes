package unpsjb.labprog.backend.business;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Persona;

@Repository
public interface PersonasRepository extends CrudRepository<Persona, Integer>{
    
    @Query("SELECT e FROM Persona e WHERE e.cuit = ?1") // convierte fila en objetos
    Optional<Persona> findByCuit(String cuit);
    //Solo los metodos por defecto.
}
