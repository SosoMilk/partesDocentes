package unpsjb.labprog.backend.business;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import unpsjb.labprog.backend.model.Horario;

@Repository
public interface HorarioRepository extends CrudRepository<Horario, Integer>{
    
}
