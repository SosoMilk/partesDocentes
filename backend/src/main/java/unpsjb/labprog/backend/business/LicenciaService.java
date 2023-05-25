package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

@Service
public class LicenciaService {
    
    @Autowired
    LicenciaRepository repository;

    public List<Licencia> findAll() {
        List<Licencia> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Licencia findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Licencia save(Licencia licencia) {
        return repository.save(licencia);
    }

    public Boolean mismosDiasLicencia(Persona persona, Date pedidoHasta, Date pedidoDesde){
        return repository.mismosDiasLicencia(persona, pedidoDesde, pedidoHasta);
    }
}
