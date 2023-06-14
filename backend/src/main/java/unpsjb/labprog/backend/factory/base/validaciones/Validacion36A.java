package unpsjb.labprog.backend.factory.base.validaciones;

import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.factory.base.ValidadorLicencia;
import unpsjb.labprog.backend.model.Licencia;
import unpsjb.labprog.backend.model.Persona;

public class Validacion36A implements ValidadorLicencia {

    @Autowired
    LicenciaRepository repository;
    
    boolean valido = true;
    String response = "";

    public Boolean cantLicenciasXMes(Persona persona, Date pedidoDesde, Date pedidoHasta) {
        Integer result = repository.cantLicenciasMes(persona, pedidoDesde.toString().substring(5, 7),
                pedidoDesde.toString().substring(0, 4));
        int cantLicencias = result != null ? result : 0;
        LocalDate localDateDesde = pedidoDesde.toLocalDate();
        LocalDate localDateHasta = pedidoHasta.toLocalDate();
        int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
        return totalDias <= 2;
    }

    public Boolean cantLicenciasXAño(Persona persona, Date pedidoDesde, Date pedidoHasta) {
        Integer result = repository.cantLicenciasAño(persona, pedidoDesde.toString().substring(0, 4));
        int cantLicencias = result != null ? result : 0;
        LocalDate localDateDesde = pedidoDesde.toLocalDate();
        LocalDate localDateHasta = pedidoHasta.toLocalDate();
        int totalDias = cantLicencias + (int) ChronoUnit.DAYS.between(localDateDesde, localDateHasta) + 1;
        return totalDias <= 6;
    }

    @Override
    public String validador(Licencia licencia) {
        // if (!cantLicenciasXMes(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta())
        //         && valido) {
        //     valido = false;
        //     response = ("NO se otorga Licencia artículo "
        //             + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
        //             + licencia.getPersona().getApellido()
        //             + " debido a que supera el tope de 2 dias de licencias por mes");
        // }

        // if (!cantLicenciasXAño(licencia.getPersona(), licencia.getPedidoDesde(), licencia.getPedidoHasta())) { // httpsStatus.ok
        //     response = ("NO se otorga Licencia artículo "
        //             + licencia.getArticulo().getArticulo() + " a " + licencia.getPersona().getNombre() + " "
        //             + licencia.getPersona().getApellido()
        //             + " debido a que supera el tope de 6 dias de licencias por año");
        // }

        return "soy 36A";
    }
    
}
