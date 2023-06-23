package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;

public class CantLicXMesValidacion implements ValidadorLicencia {

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        Integer result = aRepository.cantLicenciasMes(licencia.getPersona(),
                licencia.getPedidoDesde().toString().substring(5, 7),
                licencia.getPedidoHasta().toString().substring(0, 4));
        int cantLicencias = result != null ? result : 0;
        LocalDate localDateDesde = licencia.getPedidoDesde().toLocalDate();
        LocalDate localDateHasta = licencia.getPedidoHasta().toLocalDate();
        int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
        if (!(totalDias <= 2)) {
            return ("NO se otorga Licencia artículo "
                    + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
                    + licencia.getPersona().getApellido()
                    + " debido a que supera el tope de 2 dias de licencias por mes");
        }
        return null;
    }
    
}
