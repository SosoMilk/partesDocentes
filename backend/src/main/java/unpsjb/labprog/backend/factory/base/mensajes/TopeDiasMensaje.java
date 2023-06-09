package unpsjb.labprog.backend.factory.base.mensajes;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.factory.base.Mensaje;
import unpsjb.labprog.backend.model.Licencia;

public class TopeDiasMensaje implements Mensaje{

    private String response = "";

    // Singleton
    private static TopeDiasMensaje instance = null;

    private TopeDiasMensaje(){}

    public static TopeDiasMensaje getInstance() {
        if (instance == null)
            instance = new TopeDiasMensaje();
        return instance;
    }

    @Override
    public String validador(Licencia licencia, LicenciaService service) {

        if (!service.validarTopeDiasLicencia(licencia.getPedidoDesde(), licencia.getPedidoHasta())) {
            response = ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que supera el tope de 30 días de licencia");
        }

        return response;
    }
    
}
