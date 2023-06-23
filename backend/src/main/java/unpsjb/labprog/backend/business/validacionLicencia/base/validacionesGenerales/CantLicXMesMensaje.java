package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public class CantLicXMesMensaje {

    private String response = "";

    // Singleton
    private static CantLicXMesMensaje instance = null;

    private CantLicXMesMensaje(){}

    public static CantLicXMesMensaje getInstance() {
        if (instance == null)
            instance = new CantLicXMesMensaje();
        return instance;
    }

    public String validador(Licencia licencia, LicenciaService service) {
        // if (licencia.getArticulo().getId() == 3) { 
        //     if (!service.cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta())) {
        //         response = ("NO se otorga Licencia artículo "
        //                 + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
        //                 + licencia.getPersona().getApellido()
        //                 + " debido a que supera el tope de 2 dias de licencias por mes");
        //     }
        // }
        return response;
    }
    
}
