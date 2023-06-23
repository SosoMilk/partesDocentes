package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;

public class TopeDiasValidacion implements ValidadorLicencia{

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        LocalDate localDateDesde = licencia.getPedidoDesde().toLocalDate();
        LocalDate localDateHasta = licencia.getPedidoHasta().toLocalDate();
        long diasLicencia = ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;

        if (!(diasLicencia <= 30))
            return ("NO se otorga Licencia artículo " + licencia.getArticulo().getArticulo()
                    + " a " + licencia.getPersona().getNombre() + " " + licencia.getPersona().getApellido()
                    + " debido a que supera el tope de 30 días de licencia");

        return null;
    }
    
}
