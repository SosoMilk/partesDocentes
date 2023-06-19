package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import unpsjb.labprog.backend.model.Division;

@Service
public class DivisionService {
    
    @Autowired
    DivisionRepository repository;

    public List<Division> findAll() {
        List<Division> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Division findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Division findByCode(String anio, String numero) {
        return repository.findByCode(anio, numero).orElse(null);
    }

    @Transactional
    public Division save(Division division) {
        return repository.save(division);
    }

    @Transactional
    public Division delete(int id) {
        Division division = findById(id);
        if (division != null)
            repository.delete(division);

        return division;
    }
}
