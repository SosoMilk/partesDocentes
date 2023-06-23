package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;

public class MismosDiasValidacion implements ValidadorLicencia {

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        if (aRepository.mismosDiasLicencia(licencia.getPersona(), licencia.getPedidoDesde(),
                licencia.getPedidoHasta())) {
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo() + " a "
                    + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que ya posee una licencia en el mismo período");
        }
        return null;
    }
    
}
