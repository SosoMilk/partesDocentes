package unpsjb.labprog.backend.business;

import java.util.List;
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

    @Query("SELECT e FROM Persona e WHERE e.dni = ?1 and e.nombre = ?2 and e.apellido= ?3")
    Optional<Persona> findByDna(String dni, String nombre, String apellido);

    @Query("SELECT e FROM Persona e WHERE UPPER(e.nombre) LIKE ?1 OR e.cuit LIKE ?1 OR UPPER(e.apellido) LIKE ?1")
    List<Persona> search(String string);
}
