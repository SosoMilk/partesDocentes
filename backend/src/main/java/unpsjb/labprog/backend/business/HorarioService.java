package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import unpsjb.labprog.backend.model.Horario;

@Service
public class HorarioService {
    
    @Autowired
    HorarioRepository repository;

    public List<Horario> findAll() {
        List<Horario> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Horario findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Horario save(Horario horario) {
        return repository.save(horario);
    }
}
