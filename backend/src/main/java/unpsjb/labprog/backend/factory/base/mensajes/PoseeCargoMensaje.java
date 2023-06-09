package unpsjb.labprog.backend.factory.base.mensajes;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.factory.base.Mensaje;
import unpsjb.labprog.backend.model.Licencia;

public class PoseeCargoMensaje implements Mensaje{

    private String response = "";

    // Singleton
    private static PoseeCargoMensaje instance = null;

    private PoseeCargoMensaje(){}

    public static PoseeCargoMensaje getInstance() {
        if (instance == null)
            instance = new PoseeCargoMensaje();
        return instance;
    }

    @Override
    public String validador(Licencia licencia, LicenciaService service) {

        if (!service.poseeCargo(licencia.getPersona())) { 
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que el agente no posee ningún cargo en la institución");
        }

        return response;
    }
    
}
