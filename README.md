# Guía tutorial

## 00.1 - Bajar el repositorio
Hacer fork del repo `restful-uix`.

Conar el repo `git clone --recursive ssh://git@git.fi.mdn.unp.edu.ar:25000/<USUARIO>/restful-uix.git` (Reemplazar el usuario con el correspondiente).

Ir al directorio `cd restful-uix`

Actualizar el submodulo, `git submodule update --remote base`

## 00.2 - Ponerse en línea

Levantar los servidores, hacer el createdb, compile y deploy.
Verificar el funcionamiento.
Conectarse al servidor de bases de datos con dbeaver y crear la db.

## 01 - Ejecutar el test
Ejecutar `./labprog test` y ver como todo falla por todos lados.
Ir a los stepdefs.js y poner todo como pending.
Hacer `./labprog test` y ver 7 escenarios como pending.

## 02 - Ejecutar server status de postman
Crear la request en postman.

GET - http://localhost:8080/labprog-server/rest/serverStatus

## 03 - Crear el presenter en Bigco
feature: `Dado que existe la empresa teatral <"BigCo">`

step: `Given('que existe la empresa teatral <{string}>'`

Crear el archivo:
`src/server/servlet/CustomerServlet.java`

```java
package servlet;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import servlet.ResponseMessage;

@Path("/customers")
public class CustomerServlet {

  @GET
  @Path("/{name}")
  @Produces(MediaType.APPLICATION_JSON)
  public String getByName(@PathParam("name") String name) {
    return ResponseMessage.message(
      200,
      "Server Online",
      "{\"name\":\"BigCo\"}"
    );
  }

}
```

Explicar código, ant compile, ant redeploy y test
Resultado esperado:
7 scenarios (1 failed, 6 pending)
24 steps (1 failed, 6 pending, 16 skipped, 1 passed)

## 04 - Crear el presenter de obras mock

feature: `Y que se cuenta con la lista de obras`
step: `Given('que se cuenta con la lista de obras'`
y
feature: `Entonces se obtiene la siguiente respuesta`
step: `Then('se obtiene la siguiente respuesta'`

Crear el archivo:
`src/server/servlet/PlayServlet.java`

```java
package servlet;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import servlet.ResponseMessage;

@Path("/plays")
public class PlayServlet {

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String getPlays() {

    String data = "["+
      "{\"code\":\"hamlet\",\"name\":\"Hamlet\",\"type\":\"tragedy\"},"+
      "{\"code\":\"as-like\",\"name\":\"As You Like It\",\"type\":\"comedy\"},"+
      "{\"code\":\"othello\",\"name\":\"Othello\",\"type\":\"tragedy\"}"+
      "]";

    return ResponseMessage.message(
      200,
      "Obras recuperadas con éxito",
      data
    );
  }
}
```

Explicar código, ant compile, ant redeploy y test
Resultado esperado:
7 scenarios (1 failed, 6 pending)
24 steps (1 failed, 6 pending, 15 skipped, 2 passed)

## 05 - EJERCICIO - Crear el presenter de borderó mock

feature: `Cuando se ingresa el borderó`
step: `When('se ingresa el borderó'`

Crear el archivo:
`src/server/servlet/BorderoServlet.java`

```java
package servlet;

import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import servlet.ResponseMessage;

@Path("/borderos")
public class BorderoServlet {

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String sendBordero(String json) {

    ???

  }
}
```

Respuesta:

```java
package servlet;

import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import servlet.ResponseMessage;

@Path("/borderos")
public class BorderoServlet {

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String sendBordero(String json) {

    String data = "{\"id\":1,"+
      "\"customer\": {\"id\": 1,\"name\":\"BigCo\"},"+
      "\"date\":\"2020-03-01\","+
      "\"performances\": ["+
         "{\"play\": {\"id\":1,\"code\":\"hamlet\",\"name\":\"Hamlet\",\"type\":\"tragedy\"} ,\"audience\": 55},"+
         "{\"play\": {\"id\":2,\"code\":\"as-like\",\"name\":\"As You Like It\",\"type\":\"comedy\"},\"audience\": 35},"+
         "{\"play\": {\"id\":3,\"code\":\"othello\",\"name\":\"Othello\",\"type\":\"tragedy\"},\"audience\": 40}"+
      "]}";

    return ResponseMessage.message(
      200,
      "Se cargó el borderó exitosamente",
      data
    );
  }
}
```

Resolver código, ant compile, ant redeploy y test
Resultado esperado:
7 scenarios (1 failed, 5 pending, 1 passed)
24 steps (1 failed, 5 pending, 14 skipped, 4 passed)
Primer escenario pasa!

> Aquí finaliza la primer clase !!!!!!

## Refactoring

Seguir los pasos para que efectivamente se conecte a la base de datos, cree las tablas y persista los datos de plays y customers.

* Crear el entity `model/Customer.java`

```java
package model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Customer {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(unique = true)
  private String name;
  
  public Customer() {  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
```

* Modificar `servlet/CustomerServlet.java`

Agregar a los imports

```java
import model.Customer;
```

Modificar el método `getByName` con el siguiente contenido.

```java
Customer customer = new Customer();
customer.setName(name);

return ResponseMessage.message(
  200,
  "Compañía recuperada con éxito",
  "{\"name\":\""+customer.getName()+"\"}"
);
```

NO IR A LA BASE DE DATOS AÚN! HASTA CREAR EL STATELESS

Modificar código, ant compile, ant redeploy y test
Resultado esperado:
7 scenarios (1 failed, 5 pending, 1 passed)
24 steps (1 failed, 5 pending, 11 skipped, 7 passed)

¿Por qué ahora hay más steps passed?
El getName() está tomando directamente el valor del parámetro.

Ejercicio, crear el model Play.java, modificar el presenter y correr los tests.

Solución:

* Crea `model/Play.java`

```java
package model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Entity
public class Play {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(unique = true)
  private String code;

  private String name;
  
  private String type;
  
  public Play() {  }

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getCode() {
    return code;
  }

  public String getType() {
    return type;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public void setName(String name) {
    this.name = name;
  }
  
  public void setType(String type) {
    this.type = type;
  }
}
```

* Modifica `servlet/PlayServlet.java`

```java
import model.Play;
//...
    Play hamlet = new Play();
    hamlet.setCode("hamlet");
    hamlet.setName("Hamlet");
    hamlet.setType("tragedy");

    Play aslike = new Play();
    aslike.setCode("as-like");
    aslike.setName("As You Like It");
    aslike.setType("comedy");

    Play othello = new Play();
    othello.setCode("othello");
    othello.setName("Othello");
    othello.setType("tragedy");

    String data = "["+
      "{\"code\":\""+hamlet.getCode()+"\",\"name\":\""+hamlet.getName()+"\",\"type\":\""+hamlet.getType()+"\"},"+
      "{\"code\":\""+aslike.getCode()+"\",\"name\":\""+aslike.getName()+"\",\"type\":\""+aslike.getType()+"\"},"+
      "{\"code\":\""+othello.getCode()+"\",\"name\":\""+othello.getName()+"\",\"type\":\""+othello.getType()+"\"}"+
      "]";

    return ResponseMessage.message(
      200,
      "Obras recuperadas con éxito",
      data
    );
//...
```

Resultado esperado:
7 scenarios (1 failed, 5 pending, 1 passed)
24 steps (1 failed, 5 pending, 11 skipped, 7 passed)
It's all good man!

### Crear la capa stateless

![diagrama01](diagrama01.png)


* Crear el archivo `stateless/CustomerService.java`

```java
package stateless;

import model.Customer;

public interface CustomerService {
    public Customer findByName(String name);
}
```

1. Crear el archivo `stateless/CustomerServiceBean.java`

```java
package stateless;

import javax.persistence.NoResultException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ejb.Stateless;
import model.Customer;

@Stateless
public class CustomerServiceBean implements CustomerService {

  @PersistenceContext(unitName = "print-the-bill")
  protected EntityManager em;

  public Customer findByName(String name) {
    try {
      return
      em.createQuery(
        "select c from Customer c where c.name = :name", Customer.class )
        .setParameter("name", name)
        .getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }
}
```

* Modificar en `servlet/CustomerServlet.java`

```java
//...
import javax.ejb.EJB;
import stateless.CustomerService;
//...
public class CustomerServlet {
  @EJB
  private CustomerService service;
//...
public String getByname(@PathParam("name") String name) {
  // REEMPLAZAR
  // Customer customer = new Customer();
  // customer.setName(name);
  Customer customer = service.findByName(name);
  
  if (customer == null)
    return ResponseMessage.message(502,"La companía " + name + " no existe.");
```

* Agregar en `etc/persistence.xml` la entity Customer.

```xml
  <class>model.Customer</class>
```

Explicación JPQL, compile, redeploy y test
Resultado esperado:
7 scenarios (2 failed, 5 pending)
24 steps (2 failed, 5 pending, 17 skipped)
Falla porque saca los datos de la BD pero todavía no hay nada.

### Realizar primer staging

Conectarse a la base de datos con DBeaver.
DerbyServer APP/APP (Sacar datos del persistence)
Abrir editor sql y ejecutar

```sql
INSERT INTO CUSTOMER (ID, NAME)
VALUES (1, 'BigCo')

INSERT INTO CUSTOMER (ID, NAME)
VALUES (2, 'TeatroCo')
```

Solo test
Resultado esperado:
7 scenarios (1 failed, 5 pending, 1 passed)
24 steps (1 failed, 5 pending, 11 skipped, 7 passed)

Éxito! ya conectamos la aplicación con la base de datos.

### Conectar plays a la base de datos

1. Crear el archivo `stateless/PlayService.java`

```java
package stateless;

import java.util.Collection;

import model.Play;

public interface PlayService {

    public Collection<Play> findAll();

}
```

1. Crear el archivo `stateless/PlayServiceBean.java`

```java
package stateless;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.NamedQuery;
import javax.persistence.NoResultException;

import java.util.Collection;

import model.Play;

@Stateless
public class PlayServiceBean implements PlayService {

  @PersistenceContext(unitName = "print-the-bill")
  protected EntityManager em;
  
  public Collection<Play> findAll() {

    try {
      return
      em.createQuery(
        "select e from Play e order by e.id", Play.class)
        .getResultList();
    } catch (NoResultException e) {
      return null;
    }

  }
}
```

1. Modificar en `servlet/PlayServlet.java` para que utilice el stateless

```java
package servlet;

import javax.ejb.EJB;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

import java.util.Collection; // Se agrega el import de Collection
import java.util.stream.Collectors; // Se agrega el import de Collectors

import stateless.PlayService; // Se agrega el import del service
import model.Play;

import servlet.ResponseMessage;

@Path("/plays")
public class PlayServlet {

  // Se agrega la inyección del servicio
  @EJB
  private PlayService service;

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String findAll() {

    // Se modifica este método para que utilice el servicio
    Collection<Play> plays = service.findAll();

    // Se contruye el resultado en base a lo recuperado desde la capa de negocio.
    String data = "[";

    data += plays.stream()
      .map(p -> "{\"code\":\"" + p.getCode() + "\",\"name\":\""+ p.getName() +"\",\"type\":\"" + p.getType() + "\"}")
      .collect(Collectors.joining(","));

    data += "]";

    return ResponseMessage.message(
      200,
      "Obras recuperadas con éxito",
      data
    );
  }
}
```

1. Agregar en `etc/persistence.xml` la entity Play.

```xml
  <class>model.Play</class>
```

1. Conectarse a la base de datos con DBeaver.
DerbyServer APP/APP (Sacar datos del persistence)
Agregar los datos a la base de datos.

```sql
INSERT INTO PLAY (ID, CODE, NAME, TYPE)
VALUES (1, 'hamlet', 'Hamlet','tragedy')

INSERT INTO PLAY (ID, CODE, NAME, TYPE)
VALUES (2, 'as-like', 'As You Like It','comedy')

INSERT INTO PLAY (ID, CODE, NAME, TYPE)
VALUES (3, 'othello', 'Othello','tragedy')
```

Compile, redeploy, test
Resultado esperado:
7 scenarios (1 failed, 5 pending, 1 passed)
24 steps (1 failed, 5 pending, 11 skipped, 7 passed)

## Comenzamos con el segundo escenario

¿Qué es necesario? Comparar lo que se envía con lo que vuelve.

  1. Recuperar los datos del cliente por nombre. Este servicio ya está implementado.
  2. Recuperar los datos completos de la obra por código. Este todavía no está disponible. Es el próximo paso a implementar.
  3. Hacer que el borderó devuelva el resultado esperado. (semi-mock)
  4. Hacer el refactoring para que persista el borderó en la base de datos.

### Agregar plays findByCode

1. Agregar un nuevo servicio a `PlayService.java`

```java
  public Play findByCode(String code);
```

1. Agrega la implementación del servicio en `PlayServiceBean.java`.

```java
  // ...
  public Play findByCode(String code) {

    try {
      return
      em.createQuery(
      "select e from Play e where e.code = :code", Play.class)
      .setParameter("code", code)
      .getSingleResult();

    } catch (NoResultException e) {
      return null;
    }

  }
  // ...
```

compile, redeploy, test.
Resultado esperado (Nada cambia) :
7 scenarios (1 failed, 5 pending, 1 passed)
24 steps (1 failed, 5 pending, 11 skipped, 7 passed)

> Aquí no necesito hacer más nada. Los tests no requieren que publique el servicio.

### Crear el model del borderó

> Aquí comenzamos a hablar de relaciones.

!['diagrama02'](diagrama02.png)

1. Crear `model/Bordero.java`

```java
package model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

// Agrega los tipos de datos para almacenar las fechas
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
// Agrega las facilidades para el mapeo de relaciones
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import java.util.Collection;
import java.util.Calendar;

import model.Customer;

@Entity
public class Bordero {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Temporal(TemporalType.DATE)
  private Calendar date;

  // Relaciona el borderó con el customer
  @ManyToOne
  private Customer customer;

  // Realciona el borderó con las performances
  // (Aún no implementadas)
  @OneToMany
  private Collection<Performance> performances;
  
  public Bordero() {  }

  public int getId() {
    return id;
  }

  public Calendar getDate() {
    return date;
  }

  public Customer getCustomer() {
    return customer;
  }

  public Collection<Performance> getPerformances() {
    return performances;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setDate(Calendar date) {
    this.date = date;
  }

  public void setCustomer(Customer customer) {
    this.customer = customer;
  }

  public void setPerformances(Collection<Performance> performances) {
    this.performances = performances;
  }
}
```

1. Crear `model/Performance.java`

```java
package model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

// Agrega las relaciones
import javax.persistence.ManyToOne;

import model.Play;

@Entity
public class Performance {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private int audience;

  // Hace referencia a la Play
  @ManyToOne
  private Play play;
  
  public Performance() {  }

  public int getAudience() {
    return audience;
  }

  public Play getPlay() {
    return play;
  }

  public void setAudience(int audience) {
    this.audience = audience;
  }

  public void setPlay(Play play) {
    this.play = play;
  }
}
```

compile

1. Crear `stateless/BorderoService.java`

```java
package stateless;

import model.Bordero;

import java.util.Collection;
import java.util.Calendar;

public interface BorderoService {

    public Bordero create(Bordero bordero);

}
```

1. Crear `stateless/BorderoServiceBean.java`

```java
package stateless;

import javax.ejb.EJB;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.NamedQuery;
import javax.persistence.NoResultException;

import java.util.stream.Collectors;

import java.util.Collection;
import java.util.Calendar;

import model.Bordero;
import model.Play;

import stateless.CustomerService;
import stateless.PlayService;

@Stateless
public class BorderoServiceBean implements BorderoService {

  @PersistenceContext(unitName = "print-the-bill")
  protected EntityManager em;

  // Inyecta el stateless de Customer
  @EJB
  private CustomerService customerService;

  // Inyecta el stateless de Play
  @EJB
  private PlayService playService;

  public Bordero create(Bordero bordero) {

      // Aquí completa los datos faltantes de Customer.
      bordero.setCustomer(
        customerService.findByName(bordero.getCustomer().getName())
        );

      // Aquí completa los datos faltantes de Play
      bordero.setPerformances(
        bordero.getPerformances()
             .stream()
             .map(perf -> {
               perf.setPlay(playService.findByCode(perf.getPlay().getCode()));
               return perf;
              })
             .collect(Collectors.toList())
      );

      // Aquí debe PERSISTIR en borderó en la base de datos

      return bordero;
  }
}
```

compile

1. Modificar `servlet/BorderoServlet.java`

Agregar imports

```java
import java.io.IOException;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;

import javax.ejb.EJB;

import stateless.BorderoService;
import model.Bordero;
```

Agregar atributos y constructor.

```java
  @EJB
  private BorderoService service;

  private ObjectMapper mapper; // Transforma JSON en Objetos y viceversa.

  public BorderoServlet() {
    mapper = new ObjectMapper();

    // Le provee el formateador de fechas.
    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    mapper.setDateFormat(df);
  }
```

Modificar el servicio que crea el bordero.

```java
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String sendBordero(String json) {

    Bordero bordero;
    String data;

    try {
      bordero = mapper.readValue(json, Bordero.class);

      bordero = service.create(bordero);

      data = mapper.writeValueAsString(bordero);

    } catch (JsonProcessingException e) {
      return ResponseMessage
        .message(502, "No se pudo dar formato a la salida", e.getMessage());
    } catch (IOException e) {
      return ResponseMessage
        .message(501, "Formato incorrecto en datos de entrada", e.getMessage());
    }

    return ResponseMessage.message(
      200,
      "Se cargó el borderó exitosamente",
      data
    );
  }
```

> El servicio puede ser renombrado a `create` que seria más adecuado.

compile, redeploy, test
Resultado esperado:
7 scenarios (5 pending, 2 passed)
24 steps (5 pending, 11 skipped, 8 passed)

Dos escenarios pasaron!

### Inicia implementación del escenario 3

Escenario: `Obtener la lista de borderós cargados`
Step: `Dada la existencia de la base de datos de borderós`

Step gratis! Sacar el 'pending' y solo test.

Resultado esperado:
7 scenarios (5 pending, 2 passed)
24 steps (5 pending, 8 skipped, 11 passed)

Escenario: `Obtener la lista de borderós cargados`
Step: `Cuando se solicita la lista de borderós`
Y
Step: `se obtiene la lista de borderós no vacía`

Sacar el 'pending' y solo test.

Resultado esperado:
7 scenarios (2 failed, 3 pending, 2 passed)
24 steps (2 failed, 3 pending, 8 skipped, 11 passed)

### Implementar el findAll de Bordero

1. Agregar el servicio en `servlet/BorderoServlet.java`

```java
import javax.ws.rs.GET;
import java.util.Collection;
```

```java
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public String findAll() {
    Collection<Bordero> borderos = service.findAll();
    String data;
    try {  

      data = mapper.writeValueAsString(borderos);

    } catch (JsonProcessingException e) {
      return ResponseMessage
        .message(502, "No se pudo dar formato a la salida", e.getMessage());
    }

    return ResponseMessage.message(
      200,
      "Borderós recuperados con éxito",
      data
    );
  }
```

1. Agregar el servicio `stateless/BorderoService.java`

```java
public Collection<Bordero> findAll();
```

1. Agregar el servicio `stateless/BorderoServiceBean.java`

```java
  public Collection<Bordero> findAll() {
    return
    em.createQuery(
      "select e from Bordero e", Bordero.class)
      .getResultList();
  }
```

¿Que pasa si hacemos el test ahora?
Compile, redeploy, test.
7 scenarios (1 failed, 3 pending, 3 passed)
24 steps (1 failed, 3 pending, 6 skipped, 14 passed)

Pasó el tercer escenario!
PERO!
Que hay en la base de datos en la tabla de Bordero? NADA!
¿De donde sacó los datos?
Respuesta: Del persistence context. Pero la aplicación debe enviar los datos a la base de datos.

1. Modificar el servicio `stateless/BorderoServiceBean.java`

```java
  // ...

  // Aquí debe PERSISTIR en borderó en la base de datos
  em.persist(bordero); // <-- Aquí es donde le decimos a JPA que persista el dato.

  return bordero;
  // ...
```

1. Modificar `model/Bordero.java` paar que haga el persist de su relación en cascada.

```java
  // ...
  import javax.persistence.CascadeType;
  // ...
  @OneToMany(cascade=CascadeType.PERSIST) // <-- Se agrega el metodo al cascade para la persistencia
  private Collection<Performance> performances;
  // ...
```

Compile, redeploy, test (Una sola vez)
7 scenarios (1 failed, 3 pending, 3 passed)
24 steps (1 failed, 3 pending, 6 skipped, 14 passed)

Y ADEMAS!
Si vamos a ver la base de datos, podemos ver que los borderos están cargados.

Si volvemos a ejecutar el test y volvemos a ver la base de datos, vamos a notar que los borderos se van multiplicando. Esto pasa porque en ningun momento los boderos son eliminados. De la misma forma todos sus detalles en las otras tablas.

> VAMOS POR ACÁ 16/04

### Eliminar un borderó

Escenario: Eliminar el borderó 1
Step: When('se solicita eliminar el borderó {int}'
Además de sacar el pending, habilitamos el AfterAll borrando el return.

Test.

Resultado esperado:
7 scenarios (2 failed, 2 pending, 3 passed)
24 steps (2 failed, 2 pending, 6 skipped, 14 passed)

> Esto solo si es necesario limpiar la base de datos.
```sql
-- Stage 3
DELETE FROM BORDERO_PERFORMANCE

DELETE FROM PERFORMANCE

DELETE FROM BORDERO
```

1. Modificar `servlet/BorderoServlet.java`

```java
  // ...
  import javax.ws.rs.DELETE;
  // ...
  @DELETE
  @Path("/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public String delete(@PathParam("id") int id) {
    Bordero bordero = service.delete(id);

    if (bordero == null)
      return ResponseMessage.message(
        503,
        "No se pudo eliminar el borderó " + id
      );

    return ResponseMessage.message(
      200,
      "borderó eliminado exitosamente",
      "{}"
    );
  }
```

1. Modificar `stateless/BorderoService.java`

```java
  public Bordero delete(int id);
```

1. Modificar `stateless/BorderoServiceBean.java`

```java
  public Bordero delete(int id) {

    Bordero bordero = em.find(Bordero.class, id);

    if (bordero != null)
      em.remove(bordero);

    return bordero;
  }
```

1. Modificar `model/Bordero.java`

> Esta modificación es solo a fines educativos, vamos a sacar la autogeneración de la PK de borderó

```java
@Entity
public class Bordero {

  @Id
  // @GeneratedValue(strategy = GenerationType.IDENTITY) // <-- Sacamos esta línea
  private int id;
```

Compile, test, redeploy
7 scenarios (1 failed, 2 pending, 4 passed)
24 steps (1 failed, 2 pending, 5 skipped, 16 passed)

PERO!
Al ir a la base de datos, vemos que no se eliminan las Performances y las relaciones.

### Hacer que Performance sea embedded

1. Modificar `model/Performance.java`

```java
// ...
// Ya no necesitamos estos imports
// import javax.persistence.Entity;
// import javax.persistence.Id;
// import javax.persistence.Column;
// import javax.persistence.GeneratedValue;
// import javax.persistence.GenerationType;
// ...
import javax.persistence.Embeddable;
// ...
// @Entity      <-- Se saca entity
@Embeddable //  <-- Se define embeddable
public class Performance {
// ...
// Se remueve el ID, ahora dependerá de a clase contenedora.
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private int id;
// ...
```

1. Modificar `model/Bordero.java`

```java
// ...
// import javax.persistence.CascadeType; <-- Ya no hace falta
import javax.persistence.ElementCollection;
// ...
  // @OneToMany(cascade=CascadeType.PERSIST) // <-- Se reemplaza la relacion OneToMany por ElementCollection
  @ElementCollection(targetClass=Performance.class)  
  private Collection<Performance> performances;
```

1. Sacar model.Performance de `persistence.xml`

1. Eliminar las tablas de borderó y performance de la base de datos por las dudas.

compile, redeploy, test.
Resultado esperado:
7 scenarios (1 failed, 2 pending, 4 passed)
24 steps (1 failed, 2 pending, 5 skipped, 16 passed)

Y ADEMAS!
La base de datos está limpia.
Ver como se mapean las tablas a los objetos.

> Esto solo si es necesario limpiar la base de datos.

```sql
-- Stage 3
DELETE FROM BORDERO_PERFORMANCE

DELETE FROM PERFORMANCE

DELETE FROM BORDERO
```

### Find de bordero

Escenario: Obtener el borderó 2 de TeatroCo para editar
Steps: Dada la existencia del borderó 2 de la compañía TeatroCo
Y
Cuando se solicta recuperar el borderó 2

Sacar `pending`

1. Agregar a `servlet/BorderoServlet.java`

```java
  @GET
  @Path("/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public String find(@PathParam("id") int id) {
    Bordero bordero = service.find(id);
    String data;
    try {  

      data = mapper.writeValueAsString(bordero);

    } catch (JsonProcessingException e) {
      return ResponseMessage
        .message(502, "No se pudo dar formato a la salida", e.getMessage());
    }

    if (bordero == null)
      return ResponseMessage.message(501, "No se encontró el borderó " + id);

    return ResponseMessage.message(
      200,
      "Borderó recuperado con éxito",
      data
    );
  }
```

1. Agregar a `stateless/BorderService.java`

```java
  public Bordero find(int id);
```

1. Agregar a `stateless/BorderServiceBean.java`

```java
  public Bordero find(int id){
    return em.find(Bordero.class, id);
  }  
```

Compile, redeploy, test.
Resultado esperado:
7 scenarios (1 failed, 1 pending, 5 passed)
24 steps (1 failed, 1 pending, 3 skipped, 19 passed)

### Actualización del borderó

Escenario: Modificar en el borderó 2 la audiencia de "as-like" de 63 a 67
Steps:  Dado el borderó 2 recuperado
        Y que se modifica la audiencia de "as-like" de 63 a 67
        Cuando se envía nuevamente el borderó modificado

Sacar `pending`

NO HAY MAS PENDING!

> Un pequeño ajuste al test!

1. Modificar el stepdef:

```javascript
// Corregir todo el given
Given('que se modifica la audiencia de {string} de {int} a {int}', function (code, audiencia, audienciaNew) {
  const idx = bordero.performances.findIndex(p => p.play.code === code);
  
  // Verifica que posea el valor original
  if (bordero.performances[idx].audience != audiencia)
  return false;
  
  // Asigna la nueva audiencia.
  bordero.performances[idx].audience = audienciaNew;

  return true;
});
//...
When('se envía nuevamente el borderó modificado', function () { // <-- Sacar el parámetro
  try {
    const res = request('PUT', `${url}/borderos`, {
      json: bordero // <-- sacar el JSON.parse
    });
//...
```

1. Modificar el feature:

```gherkin
# ...
Escenario: Modificar en el borderó 2 la audiencia de "as-like" de 63 a 67
  Dado el borderó 2 recuperado
  Y que se modifica la audiencia de "as-like" de 63 a 67
  Cuando se envía nuevamente el borderó modificado
  # Eliminar el bordero que le pasa
  Entonces se obtiene la siguiente respuesta
# ...
```

1. Agregar a `servlet/BorderoServlet.java`

```java
  // ...
  import javax.ws.rs.PUT;
  // ...
  @PUT
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public String update(String json) {

    Bordero bordero;
    String data;

    try {
      bordero = mapper.readValue(json, Bordero.class);

      bordero = service.update(bordero);

      data = mapper.writeValueAsString(bordero);

    } catch (JsonProcessingException e) {
      return ResponseMessage
        .message(502, "No se pudo dar formato a la salida", e.getMessage());
    } catch (IOException e) {
      return ResponseMessage
        .message(501, "Formato incorrecto en datos de entrada", e.getMessage());
    }

    return ResponseMessage.message(
      200,
      "Se cargó el borderó exitosamente",
      data
    );
  }
```

1. Agrego a `stateless/BorderoService.java`

```java
  public Bordero update(Bordero bordero);
```

1. Agrego a `stateless/BorderoServiceBean.java`

```java
  public Bordero update(Bordero bordero) {

    // Si tuvieramos un proceso de validación, iría aquí.
    em.merge(bordero);

    return bordero;
  }
```

Compile, redeploy, test.
Resultado esperado:
7 scenarios (7 passed)
24 steps (24 passed)

SE FINI!

### Una última verificación

Para que veamos el dato en la bd efectivamente modificado, deshabilitamos el AfterAll, corremos el test y vamos a ver que el valor es 67.

antes de finalizar lo habilitamos y corremos el test varias veces para garantizar que pasa.

### Revision final del ultimo escenario

## Post taller, entrega

### Publicar el servicio de obras por código de obra en el presenter

```java
  @GET
  @Path("/{code}")
  @Produces(MediaType.APPLICATION_JSON)
  public String findByCode(@PathParam("code") String code) {

    Play play = service.findByCode(code);

    if (play == null) return ResponseMessage.message(501, "No se encontró la obra con código " + code);

    String json = "{\"code\":\"" + play.getCode() + "\",\"name\":\""+ play.getName() +"\",\"type\":\"" + play.getType() + "\"}";

    return ResponseMessage.message(
      200,
      "Obras recuperada con éxito",
      json
    );
  }
```


# Cómo conectarse a Derby desde la línea de comandos
1. Conectarse a **server** con `./labprog server`
2. En **server** ejecutar `ln -s /usr/local/glassfish5/javadb/bin/ij ij`
3. Luego `chmod +x ij`
4. Abrir la terminal a la base de datos `./ij` (Esto les va a abrir un prompt con dos errores de ese script 'expr: syntax error', 'sh: out of range'. Ignórenlos) luego verán *ij>* donde pueden escribir comandos.
5. Conectarse a la DB `connect jdbc:derby://localhost:1527/labprog-db;` (IMPORTANTE el ; final)
6. Conectarse al esquema APP `set schema APP;`
7. A partir de aquí ya pueden ejecutar comandos SQL, cómo por ejemplo `select * from play;`
8. Finalmente para desconectarse `exit;`
> Los pasos 2 y 3 crean un enlace simbólico y dan los permisos para el script, mientras no bajen el servidor no hace falta volver a ejecutarlos, pero cuando lo bajan la imagen de docker se limpia y los elimina. Ya la actualizaremos con una solución más permanente.