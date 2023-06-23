package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public class PoseeCargoMensaje {

    private String response = "";

    // Singleton
    private static PoseeCargoMensaje instance = null;

    private PoseeCargoMensaje(){}

    public static PoseeCargoMensaje getInstance() {
        if (instance == null)
            instance = new PoseeCargoMensaje();
        return instance;
    }

    public String validador(Licencia licencia, LicenciaService service) {

        // if (!service.poseeCargo(licencia.getPersona())) { 
        //     response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
        //             + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
        //             + " debido a que el agente no posee ningún cargo en la institución");
        // }

        return response;
    }
    
}
