package unpsjb.labprog.backend.factory;

import unpsjb.labprog.backend.business.LicenciaService;
import unpsjb.labprog.backend.model.Licencia;

public interface validadorInterface {
    public String validador(Licencia licencia, LicenciaService service);
}
