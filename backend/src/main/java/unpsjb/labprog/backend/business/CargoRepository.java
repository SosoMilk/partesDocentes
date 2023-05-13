package unpsjb.labprog.backend.business;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Cargo;

@Repository
public interface CargoRepository extends CrudRepository<Cargo, Integer>{

    @Query("SELECT e FROM Cargo e WHERE e.nombre = ?1") //ver si agregarle el tipo
    Optional<Cargo> findAllByNomTip(String nombre);

    
}
