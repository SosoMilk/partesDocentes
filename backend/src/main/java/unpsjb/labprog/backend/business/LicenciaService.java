package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidacionLicenciaFactory;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.ArticuloLicencia;
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

    @Transactional
    public Licencia delete(int id) {
        Licencia licencia = findById(id);
        
        if (licencia != null)
            repository.delete(licencia);

        return licencia;
    }
    
    public Optional<Licencia> findByPADH(Persona persona, ArticuloLicencia articulo, Date desde, Date hasta) {
        return repository.findAllByPADH(persona, articulo, desde, hasta);
    }

    public List<Licencia> parteDiario(String fecha) throws ParseException{
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return repository.parteDiario(dateFormat.parse(fecha));
    }

    public String validacion(Licencia licencia) {
        String response = "";
        ValidacionLicenciaFactory factory = ValidacionLicenciaFactory.getInstance(repository);
        ValidadorLicencia command; // Ahora es una instancia de Command

        command = factory.get(licencia.getArticulo().getArticulo());

        response = command.validador(licencia, repository);

        if (response.isEmpty() || response == null) {
            Response.ok(save(licencia), "Se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                    + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido());
            return "Se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                    + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido();
        } else {
            return response;
        }
    }

}
