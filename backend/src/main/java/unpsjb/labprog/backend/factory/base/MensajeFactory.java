package unpsjb.labprog.backend.factory.base;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Collection;
import java.util.Enumeration;

public class MensajeFactory {
    
    private final String filename = "/home/soso/labprog/partesDocentes/tp/backend/src/main/java/unpsjb/labprog/backend/factory/commands.config";

    // Mapa donde almacena cada comando.
    // Lo carga en base a un archivo de configuración.
    private Map<String, Mensaje> mensajeMap;

    // Singleton
    private static MensajeFactory instance = null;

    private MensajeFactory(){
        mensajeMap = new HashMap<>();
        //loadConfig();
        Properties config = new Properties();

        try {
            config.load(new FileInputStream(filename));
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
                mensajeMap.put(name, (Mensaje) t.getMethod("getInstance").invoke(null));
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

   
    public Collection<Mensaje> getComandos(){
        Collection<Mensaje> comandos = mensajeMap.values();
        return comandos;
    }
}
