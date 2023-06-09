package unpsjb.labprog.backend.factory.base.mensajes;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.factory.base.Mensaje;
import unpsjb.labprog.backend.model.Licencia;

public class CantLicXMesMensaje implements Mensaje{

    private String response = "";

    // Singleton
    private static CantLicXMesMensaje instance = null;

    private CantLicXMesMensaje(){}

    public static CantLicXMesMensaje getInstance() {
        if (instance == null)
            instance = new CantLicXMesMensaje();
        return instance;
    }

    @Override
    public String validador(Licencia licencia, LicenciaService service) {
        if (licencia.getArticulo().getId() == 3) { 
            if (!service.cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde())) {
                response = ("NO se otorga Licencia artículo "
                        + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                        + licencia.getPersona().getApellido()
                        + " debido a que supera el tope de 2 dias de licencias por mes");
            }
        }
        return response;
    }
    
}
