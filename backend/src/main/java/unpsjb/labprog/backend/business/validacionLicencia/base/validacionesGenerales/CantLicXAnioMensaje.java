package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public class CantLicXAnioMensaje{
 
    private String response = "";

    // Singleton
    private static CantLicXAnioMensaje instance = null;

    private CantLicXAnioMensaje(){}

    public static CantLicXAnioMensaje getInstance() {
        if (instance == null)
            instance = new CantLicXAnioMensaje();
        return instance;
    }

    public String validador(Licencia licencia) {
        // if (licencia.getArticulo().getId() == 3) {
        //     if (!cantLicenciasXAño(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta())) { // httpsStatus.ok
        //         response = ("NO se otorga Licencia artículo "
        //                 + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
        //                 + licencia.getPersona().getApellido()
        //                 + " debido a que supera el tope de 6 dias de licencias por año");
        //     }
        // }
        return response;
    }
}
