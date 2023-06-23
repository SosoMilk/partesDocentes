package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesPorArticulo;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;

public class Validacion36A implements ValidadorLicencia {
    

    private static LicenciaRepository repository;

    private String response = "";

    private static Validacion36A instance = null;

    private Validacion36A(){}

    public static Validacion36A getInstance(LicenciaRepository aRepository) {
        if (instance == null){
            instance = new Validacion36A();
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

        if (mismosDiasLicencia(licencia) != null) {
            return mismosDiasLicencia(licencia);
        }

        if (cantLicenciasXMes(licencia) != null) {
            return cantLicenciasXMes(licencia);
        }
        
        if (cantLicenciasXAño(licencia) != null) {
            return cantLicenciasXAño(licencia);
        }
        
        return response;
    }
    
    private String cantLicenciasXMes(Licencia licencia) {
        Integer result = repository.cantLicenciasMes(licencia.getPersona(), licencia.getPedidoDesde().toString().substring(5, 7),
                    licencia.getPedidoHasta().toString().substring(0, 4));
        int cantLicencias = result != null ? result : 0;
        LocalDate localDateDesde = licencia.getPedidoDesde().toLocalDate();
        LocalDate localDateHasta = licencia.getPedidoHasta().toLocalDate();
        int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
        if(!(totalDias <= 2)){
            return ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 2 dias de licencias por mes");
        }
        return null;
    }
    
        private String cantLicenciasXAño(Licencia licencia) {
            Integer result = repository.cantLicenciasAño(licencia.getPersona(), licencia.getPedidoDesde().toString().substring(0, 4));
            int cantLicencias = result != null ? result : 0;
            LocalDate localDateDesde = licencia.getPedidoDesde().toLocalDate();
            LocalDate localDateHasta = licencia.getPedidoHasta().toLocalDate();
            int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
            if(!( totalDias <= 6)){
                return ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 6 dias de licencias por año");
            }

            return null;
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
