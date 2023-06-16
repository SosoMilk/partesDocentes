package unpsjb.labprog.backend.factory.base.validaciones;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.factory.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

public class Validacion36A implements ValidadorLicencia {
    

    private LicenciaRepository repository;

    private String response = "";
    private Boolean valido = true;

    private static Validacion36A instance = null;

    private Validacion36A(){}

    public static Validacion36A getInstance() {
        if (instance == null)
            instance = new Validacion36A();
        return instance;
    }
    
    @Override
    public String validador(Licencia licencia, LicenciaRepository repository) {
        this.repository = repository;

        if (!poseeCargo(licencia.getPersona()) && valido) {
            valido = false; 
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que el agente no posee ningún cargo en la institución");
        }

        if (!desigXDia(licencia.getPersona(), licencia.getPedidoDesde()) && valido) {
            valido = false; 
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que el agente no tiene designación ese día en la institución");
        }

        if (!validarTopeDiasLicencia(licencia.getPedidoDesde(), licencia.getPedidoHasta()) && valido) { 
            valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que supera el tope de 30 días de licencia");
        }

        if (mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoHasta(), licencia.getPedidoDesde()) && valido) { 
            valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                            + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que ya posee una licencia en el mismo período");
        }

        if (!cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta()) && valido) {
            valido = false;
            response = ("NO se otorga Licencia artículo "
            + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
            + licencia.getPersona().getApellido()
            + " debido a que supera el tope de 2 dias de licencias por mes");
        }
        
        if (!cantLicenciasXAño(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta()) && valido) {
            valido = false;
            response = ("NO se otorga Licencia artículo "
            + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
            + licencia.getPersona().getApellido()
            + " debido a que supera el tope de 6 dias de licencias por año");
        }
        
        //return "soy 36A";
        return response;
    }
    
        private Boolean cantLicenciasXMes(Persona persona, Date pedidoDesde, Date pedidoHasta) {
            if (repository == null) {
                System.err.println("fallo en el mes");
                return false;
            }
            Integer result = repository.cantLicenciasMes(persona, pedidoDesde.toString().substring(5, 7),
                    pedidoDesde.toString().substring(0, 4));
            int cantLicencias = result != null ? result : 0;
            LocalDate localDateDesde = pedidoDesde.toLocalDate();
            LocalDate localDateHasta = pedidoHasta.toLocalDate();
            int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
            return totalDias <= 2;
        }
    
        private Boolean cantLicenciasXAño(Persona persona, Date pedidoDesde, Date pedidoHasta) {
            if (repository == null) {
                System.err.println("fallo en el año");
                return false;
            }

            Integer result = repository.cantLicenciasAño(persona, pedidoDesde.toString().substring(0, 4));
            int cantLicencias = result != null ? result : 0;
            LocalDate localDateDesde = pedidoDesde.toLocalDate();
            LocalDate localDateHasta = pedidoHasta.toLocalDate();
            int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
            return totalDias <= 6;
        }
    
        private Boolean desigXDia(Persona persona, Date desde) {
            if(repository == null){
                System.err.println("fallo en el dia");
                return false;
            }
            return repository.desigXDia(persona, desde);
        }

        private Boolean poseeCargo(Persona persona) {
            if(repository == null){
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
