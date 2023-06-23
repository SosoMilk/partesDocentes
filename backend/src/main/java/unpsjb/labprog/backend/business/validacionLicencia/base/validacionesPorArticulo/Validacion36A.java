package unpsjb.labprog.backend.business.validacionLicencia.base.validacionesPorArticulo;

import java.util.ArrayList;
import java.util.List;

import unpsjb.labprog.backend.business.LicenciaRepository;
import unpsjb.labprog.backend.business.validacionLicencia.base.ValidadorLicencia;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.CantLicXAnioValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.CantLicXMesValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.DesigXDiaValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.MismosDiasValidacion;
import unpsjb.labprog.backend.business.validacionLicencia.base.validacionesGenerales.PoseeCargoValidacion;
import unpsjb.labprog.backend.model.Licencia;

public class Validacion36A implements ValidadorLicencia {
    

    private static LicenciaRepository repository;

    private String response = "";
    private static Validacion36A instance = null;
    private List<ValidadorLicencia> validaciones;

    private Validacion36A() {
        validaciones = new ArrayList<>();
        validaciones.add(new PoseeCargoValidacion());
        validaciones.add(new DesigXDiaValidacion());
        validaciones.add(new MismosDiasValidacion());
        validaciones.add(new CantLicXMesValidacion());
        validaciones.add(new CantLicXAnioValidacion());
    }

    public static Validacion36A getInstance(LicenciaRepository aRepository) {
        if (instance == null){
            instance = new Validacion36A();
        }
        
        return instance;
    }
    
    @Override
    public String validador(Licencia licencia, LicenciaRepository aRepository) {
        repository = aRepository;

        for(ValidadorLicencia v: validaciones){
            response = v.validador(licencia, repository);
            if(response != null){
                return response;
            }
        }

        if (response != null && !response.isEmpty()) { // Agregar esta verificación
            return response;
        }

        return ""; // Devolver una cadena vacía como valor predeterminado
    }
    
}
