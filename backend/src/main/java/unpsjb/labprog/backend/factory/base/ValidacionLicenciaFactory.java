package unpsjb.labprog.backend.factory.base;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import unpsjb.labprog.backend.business.LicenciaRepository;

import java.util.Enumeration;

public class ValidacionLicenciaFactory {
    
    private final String filename = "commands.config";

    // Mapa donde almacena cada comando.
    // Lo carga en base a un archivo de configuración.
    private Map<String, ValidadorLicencia> mensajeMap;

    // Singleton
    private static ValidacionLicenciaFactory instance = null;

    private static LicenciaRepository repository;

    private ValidacionLicenciaFactory(){
        mensajeMap = new HashMap<>();
        //loadConfig();
        Properties config = new Properties();

        try {
            config.load(getClass().getResourceAsStream(filename));
            //config.load(getClass().getClassLoader().getResourceAsStream(filename));
        } catch (IOException ioe) {
            System.err.println("No se encontró el archivo de configuración: "+filename);
        }

        Enumeration<?> e = config.propertyNames(); 
        String name;
        Class t;
        while(e.hasMoreElements()){
            name = (String) e.nextElement();
            try {
                t = Class.forName(config.getProperty(name));               
                mensajeMap.put(name, (ValidadorLicencia) t.getMethod("getInstance").invoke(repository));
            } catch (ClassNotFoundException cnfe) {
                System.err.println("No se encontró la clase: "+config.getProperty(name));
            } catch (NoSuchMethodException nsme){
                System.err.println("La clase "+config.getProperty(name)+" no implementa el metodo get instance.");
            } catch (Exception iae){
                System.err.println("Ocurrio un error invocando el metodo getInstance de la clase "+config.getProperty(name)+" "+iae.getMessage());
            }
        }
    }

    public static ValidacionLicenciaFactory getInstance(LicenciaRepository aRepository) {
        repository = aRepository;
        if (instance == null)
            instance = new ValidacionLicenciaFactory();
        return instance;
    }

    public ValidadorLicencia get(String articulo) {
        return mensajeMap.get(articulo);
    }

}
