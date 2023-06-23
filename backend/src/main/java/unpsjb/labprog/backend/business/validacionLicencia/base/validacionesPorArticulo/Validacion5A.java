package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesPorArticulo;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;


public class Validacion5A implements ValidadorLicencia{

    private static LicenciaRepository repository;

    private String response = "";

    private static Validacion5A instance = null;

    private Validacion5A(){}

    public static Validacion5A getInstance(LicenciaRepository aRepository) {
        if (instance == null){
            instance = new Validacion5A();
        }

        return instance;
    }

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        repository = aRepository;

        if (poseeCargo(licencia) != null) {
            return poseeCargo(licencia);
        }

        if (desigXDia(licencia) != null) {
            return desigXDia(licencia);
        }

        if (validarTopeDiasLicencia(licencia) != null) {
            return validarTopeDiasLicencia(licencia);
        }

        if (mismosDiasLicencia(licencia) != null) {
            return mismosDiasLicencia(licencia);
        }

        return response;
    }

    private String desigXDia(Licencia licencia) {
        if (!repository.desigXDia(licencia.getPersona(), licencia.getPedidoDesde()))
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que el agente no tiene designación ese día en la institución");

        return null;
    }

    private String poseeCargo(Licencia licencia) {
        if (!repository.poseeCargo(licencia.getPersona())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que el agente no posee ningún cargo en la institución");
        }
        return null;
    }

    private String validarTopeDiasLicencia(Licencia licencia) {
        LocalDate localDateDesde = licencia.getPedidoDesde().toLocalDate();
        LocalDate localDateHasta = licencia.getPedidoHasta().toLocalDate();
        long diasLicencia = ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;

        if (!(diasLicencia <= 30))
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que supera el tope de 30 días de licencia");

        return null;
    }

    private String mismosDiasLicencia(Licencia licencia) {
        if (repository.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoDesde(),
                licencia.getPedidoHasta())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                    + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que ya posee una licencia en el mismo período");
        }
        return null;
    }
    
}
