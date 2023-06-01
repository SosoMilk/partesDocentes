package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
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

    public Boolean mismosDiasLicencia(Persona persona, Date pedidoHasta, Date pedidoDesde){
        return repository.mismosDiasLicencia(persona, pedidoDesde, pedidoHasta);
    }

    public Boolean poseeCargo(Persona persona){
        return repository.poseeCargo(persona);
    }

    public Integer cantLicenciasMes(Persona persona, Date pedidoDesde){
        String mes = pedidoDesde.toString().substring(5, 7);
        return repository.cantLicenciasMes(persona, mes);
    }
    // String anio = desde.toString().substring(0, 4);
    public Integer cantLicenciasAño(Persona persona, Date pedidoDesde) {
        String anio = pedidoDesde.toString().substring(0, 4);
        return repository.cantLicenciasAño(persona, anio);
    }

    public Boolean desigXDia(Persona persona, Date desde){
        return repository.desigXDia(persona, desde);
    }

    public Optional<Licencia> findByPADH(Persona persona, ArticuloLicencia articulo, Date desde, Date hasta) {
        return repository.findAllByPADH(persona, articulo, desde, hasta);
    }
}
