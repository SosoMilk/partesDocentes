package unpsjb.labprog.backend.business;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
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
    
    public Optional<Licencia> findByPADH(Persona persona, ArticuloLicencia articulo, Date desde, Date hasta) {
        return repository.findAllByPADH(persona, articulo, desde, hasta);
    }

    public Boolean mismosDiasLicencia(Persona persona, Date pedidoHasta, Date pedidoDesde){
        return repository.mismosDiasLicencia(persona, pedidoDesde, pedidoHasta);
    }

    public Boolean poseeCargo(Persona persona){
        return repository.poseeCargo(persona);
    }

    public Boolean cantLicenciasXMes(Persona persona, Date pedidoDesde){
       return (repository.cantLicenciasMes(persona, pedidoDesde.toString().substring(5, 7))) < 2;
    }

    public Boolean cantLicenciasXAño(Persona persona, Date pedidoDesde) {
        return (repository.cantLicenciasAño(persona, pedidoDesde.toString().substring(0, 4)) < 6);
    }

    public Boolean desigXDia(Persona persona, Date desde){
        return repository.desigXDia(persona, desde);
    }

    public Boolean validarTopeDiasLicencia(Date desde, Date hasta) {
        LocalDate localDateDesde = desde.toLocalDate();
        LocalDate localDateHasta = hasta.toLocalDate();
        long diasLicencia = ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
        return diasLicencia < 30;
    }
}
