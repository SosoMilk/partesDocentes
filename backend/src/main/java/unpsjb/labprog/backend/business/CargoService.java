package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import unpsjb.labprog.backend.model.Cargo;

@Service
public class CargoService {
    
    @Autowired
    CargoRepository repository;

    public List<Cargo> findAll() {
        List<Cargo> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Cargo findById(int id) {
        return repository.findById(id).orElse(null);
    }
    
    public Cargo findByNom(String nombre) {
        return repository.findAllByNom(nombre).orElse(null);
    }

    @Transactional
    public Cargo save(Cargo cargo) {
        return repository.save(cargo);
    }

    public List<Cargo> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }
    
    public List<Cargo> findByTip(String tipo) {
        return repository.findAllByTip(tipo);
    }
}
