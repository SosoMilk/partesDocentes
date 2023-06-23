package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public class DesigXDiaMensaje {
    
    private String response = "";

    // Singleton
    private static DesigXDiaMensaje instance = null;

    private DesigXDiaMensaje(){}

    public static DesigXDiaMensaje getInstance() {
        if (instance == null)
            instance = new DesigXDiaMensaje();
        return instance;
    }

    public String validador(Licencia licencia, LicenciaService service) {

        // if (!service.desigXDia(licencia.getPersona(), licencia.getPedidoDesde())) { 
        //     response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
        //             + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
        //             + " debido a que el agente no tiene designación ese día en la institución");
        // }

        return response;
    }

}
