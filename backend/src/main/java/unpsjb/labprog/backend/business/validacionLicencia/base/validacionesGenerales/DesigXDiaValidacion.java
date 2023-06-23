package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;

public class DesigXDiaValidacion implements ValidadorLicencia {

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        if (!aRepository.desigXDia(licencia.getPersona(), licencia.getPedidoDesde()))
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que el agente no tiene designación ese día en la institución");

        return null;
    }

}
