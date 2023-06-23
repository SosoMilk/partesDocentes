package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public class MismosDiasMensaje {

    private String response = "";

    // Singleton
    private static MismosDiasMensaje instance = null;

    private MismosDiasMensaje(){}

    public static MismosDiasMensaje getInstance() {
        if (instance == null)
            instance = new MismosDiasMensaje();
        return instance;
    }

    public String validador(Licencia licencia, LicenciaService service) {
        // if (service.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoHasta(), licencia.getPedidoDesde())) { 
        //     response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
        //             + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
        //             + " debido a que ya posee una licencia en el mismo período");
        // }
        return response;
    }
    
}
