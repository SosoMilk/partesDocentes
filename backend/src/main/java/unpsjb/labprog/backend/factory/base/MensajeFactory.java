package unpsjb.labprog.backend.factory.base;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Properties;

import java.util.Map;
import java.util.HashMap;

public class MensajeFactory {
    
    private final String filename = "commands.config";

    // Mapa donde almacena cada comando.
    // Lo carga en base a un archivo de configuración.
    private Map<String, Mensaje> mensajeMap;

    // Singleton
    private static MensajeFactory instance = null;

    private MensajeFactory(){
        mensajeMap = new HashMap<>();

        Properties config = new Properties();

        try {
            config.load(getClass().getClassLoader().getResourceAsStream(filename));
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
                mensajeMap.put(name, (Mensaje)t.getMethod("getInstance").invoke(null));
            } catch (ClassNotFoundException cnfe) {
                System.err.println("No se encontró la clase: "+config.getProperty(name));
            } catch (NoSuchMethodException nsme){
                System.err.println("La clase "+config.getProperty(name)+" no implementa el metodo get instance.");
            } catch (Exception iae){
                System.err.println("Ocurrio un error invocando el metodo getInstance de la clase "+config.getProperty(name)+" "+iae.getMessage());
            }
        }
    }

    public static MensajeFactory getInstance() {
        if (instance == null)
            instance = new MensajeFactory();
        return instance;
    }

    public Mensaje getCommand(String mensaje) {
        return mensajeMap.get(mensaje);
    }

}
