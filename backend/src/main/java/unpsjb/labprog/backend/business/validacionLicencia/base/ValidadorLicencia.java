package unpsjb.labprog.backend.business.validacionLicencia.base;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.model.Licencia;

public interface ValidadorLicencia {
    
    public String validador(Licencia licencia, LicenciaRepository repository);
}
