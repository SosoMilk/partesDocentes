package unpsjb.labprog.backend.factory;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public class Validador {

    public static String validacion(Licencia licencia, LicenciaService service){ //posiblemente esta clase se vaya

        String response = "";
        Boolean valido = true;

        if (licencia.getArticulo().getId() == 3) { //httpsStatus.ok
            if (!service.cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde()) && valido) {
                valido = false;
                response = ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 2 dias de licencias por mes");
            }

            if (!service.cantLicenciasXAño(licencia.getPersona(), licencia.getPedidoDesde())) { // httpsStatus.ok
                response = ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 6 dias de licencias por año");
            }
        }

        if (service.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoHasta(), licencia.getPedidoDesde()) && valido) { // httpsStatus.BAD:REQUEST
            valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                            + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que ya posee una licencia en el mismo período");
        }

        if (!service.poseeCargo(licencia.getPersona()) && valido) { //// httpsStatus.BAD_REQUEST
            valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que el agente no posee ningún cargo en la institución");
        }

        if (!service.desigXDia(licencia.getPersona(), licencia.getPedidoDesde()) && valido) { // httpsStatus.BAD_REQUEST
            valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que el agente no tiene designación ese día en la institución");
        }

        if (!service.validarTopeDiasLicencia(licencia.getPedidoDesde(), licencia.getPedidoHasta()) && valido) { // httpsStatus.BAD_REQUEST
            valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que supera el tope de 30 días de licencia");
        }

        return response;
    }
}
