package unpsjb.labprog.backend.factory.base;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public interface ValidadorLicencia {
    
    public String validador(Licencia licencia);
}
