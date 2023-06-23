package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesPorArticulo;

import java.util.ArrayList;
import java.util.List;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.DesigXDiaValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.MismosDiasValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.PoseeCargoValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.TopeDiasValidacion;
import unpsjb.labprog.backend.model.Licencia;


public class Validacion23A implements ValidadorLicencia{

    private static LicenciaRepository repository;

    private String response = "";
    private static Validacion23A instance = null;
    private List<ValidadorLicencia> validaciones;

    private Validacion23A(){
        validaciones = new ArrayList<>();
        validaciones.add(new PoseeCargoValidacion());
        validaciones.add(new DesigXDiaValidacion());
        validaciones.add(new TopeDiasValidacion());
        validaciones.add(new MismosDiasValidacion());
    }

    public static Validacion23A getInstance(LicenciaRepository aRepository) {
        if (instance == null){
            instance = new Validacion23A();
        }

        return instance;
    }

    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        repository = aRepository;

        for (ValidadorLicencia v : validaciones) {
            response = v.validador(licencia, repository);
            if (response != null) {
                return response;
            }
        }

        if (response != null && !response.isEmpty()) { // Agregar esta verificación
            return response;
        }

        return ""; // Devolver una cadena vacía como valor predeterminado
    }

}
