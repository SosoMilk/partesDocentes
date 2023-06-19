package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Persona;

@Service
public class PersonaService {

    @Autowired
    PersonasRepository repository;

    public List<Persona> findAll() {
        List<Persona> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Persona findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Persona findByCuit(String cuit) {
        return repository.findByCuit(cuit).orElse(null);
    }
 
    @Transactional
    public Persona save(Persona Persona) {
        return repository.save(Persona);
    }

    @Transactional
    public Persona delete(int id) {
        Persona Persona = findById(id);
        if (Persona != null)
            repository.delete(Persona);

        return Persona;
    }

    public Persona findByDna(String dni, String nombre, String apellido) {
        return repository.findByDna(dni,nombre,apellido).orElse(null);
    }

    public List<Persona> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }

    
    
}
