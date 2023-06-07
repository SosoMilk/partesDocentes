package unpsjb.labprog.backend.business;

import unpsjb.labprog.backend.model.Licencia;

public class ValidadorService {

    public static String validacion(Licencia licencia, LicenciaService service){

        //LicenciaService service;
        
        // Boolean valido = true;
        String response = "";
        // String crear = "";

        if (licencia.getArticulo().getId() == 3) { //httpsStatus.ok
            if (!service.cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde())) {
                // valido = false;
                response = ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 2 dias de licencias por mes");
            }

            if (!service.cantLicenciasXAño(licencia.getPersona(), licencia.getPedidoDesde())) { // httpsStatus.ok
                // valido = false;
                response = ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 6 dias de licencias por año");
            }
        }

        if (service.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoHasta(), licencia.getPedidoDesde())) { // httpsStatus.BAD:REQUEST
            // valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                            + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que ya posee una licencia en el mismo período");
        }

        if (!service.poseeCargo(licencia.getPersona())) { //// httpsStatus.BAD_REQUEST
            // valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que el agente no posee ningún cargo en la institución");
        }

        if (!service.desigXDia(licencia.getPersona(), licencia.getPedidoDesde())) { // httpsStatus.BAD_REQUEST
            // valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que el agente no tiene designación ese día en la institución");
        }

        if (!service.validarTopeDiasLicencia(licencia.getPedidoDesde(), licencia.getPedidoHasta())) { // httpsStatus.BAD_REQUEST
            // valido = false;
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                            + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                            + " debido a que supera el tope de 30 días de licencia");
        }

        // crear = ("Se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
        //                 + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido());

        return response;
    }
}
