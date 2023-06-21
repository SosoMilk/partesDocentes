package unpsjb.labprog.backend.business.validacionLicencia.base.validaciones;


import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;


public class Validacion5A implements ValidadorLicencia{

    private static LicenciaRepository repository;

    private String response = "";

    private static Validacion5A instance = null;

    private Validacion5A(){}

    public static Validacion5A getInstance(LicenciaRepository aRepository) {
        if (instance == null){
            instance = new Validacion5A();
        }

        instance.repository = aRepository;
        return instance;
    }

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        repository = aRepository;

        if (!poseeCargo(licencia.getPersona())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que el agente no posee ningún cargo en la institución");
        }

        if (!desigXDia(licencia.getPersona(), licencia.getPedidoDesde())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que el agente no tiene designación ese día en la institución");
        }

        if (!validarTopeDiasLicencia(licencia.getPedidoDesde(), licencia.getPedidoHasta())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que supera el tope de 30 días de licencia");
        }

        if (mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoHasta(), licencia.getPedidoDesde())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                    + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que ya posee una licencia en el mismo período");
        }
        // return "soy 36A";
        return response;
    }

    private Boolean desigXDia(Persona persona, Date desde) {
        if (repository == null) {
            System.err.println("fallo en el dia");
            return false;
        }
        return repository.desigXDia(persona, desde);
    }

    private Boolean poseeCargo(Persona persona) {
        if (repository == null) {
            System.err.println("fallo en el cargo");
        }
        return repository.poseeCargo(persona);
    }

    private Boolean validarTopeDiasLicencia(Date desde, Date hasta) {
        if (repository == null) {
            System.err.println("fallo en el tope");
        }
        LocalDate localDateDesde = desde.toLocalDate();
        LocalDate localDateHasta = hasta.toLocalDate();
        long diasLicencia = ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
        return diasLicencia <= 30;
    }

    private Boolean mismosDiasLicencia(Persona persona, Date pedidoHasta, Date pedidoDesde) {
        if (repository == null) {
            System.err.println("fallo en los mismos dias");
        }
        return repository.mismosDiasLicencia(persona, pedidoDesde, pedidoHasta);
    }
    
}
