# language: es

Característica: Gestión de personas
Módulo responsable de administrar a las personas del sistema

Esquema del escenario: ingresar nuevas personas
   Dada la persona con "<Nombre>", "<Apellido>", <DNI>, "<CUIL>", "<sexo>", "<título>", "<domicilio>", "<teléfono>"
   Cuando se presiona el botón de guardar
   Entonces se espera el siguiente <status> con la "<respuesta>"

   Ejemplos:
   | DNI       | Nombre    | Apellido     | CUIL        | sexo | título                  | domicilio   | teléfono           | status | respuesta                                               |
   | 10100100  | Alberto   | Lopez        | 27101001009 | M    | Profesor de Biología    | Charcas 54  | +54 (280) 411-1111 | 200    | La persona: Alberto Lopez con DNI 10100100 ingresado/a correctamente  |
   | 20200200  | Susana    | Álvarez      | 20202002009 | F    | Profesora de historia   | Mitre 154   | +54 (280) 422-2222 | 200    | La persona: Susana Álvarez con DNI 20200200 ingresado/a correctamente |
   | 30300300  | Pedro     | Benítez      | 27303003009 | M    |                         | Jujuy 255   | +54 (280) 433-3333 | 200    | La persona: Pedro Benítez con DNI 30300300 ingresado/a correctamente |
   | 40400400  | Marisa    | Amuchástegui | 20404004009 | F    | Profesora de historia   | Zar 555     | +54 (280) 444-4444 | 200    | La persona: Marisa Amuchástegui con DNI 40400400 ingresado/a correctamente | 
   | 50500500  | Raúl      | Gómez        | 27505005009 | M    | Profesor de Geografía   | Roca 2458   | +54 (280) 455-5555 | 200    | La persona: Raúl Gómez con DNI 50500500 ingresado/a correctamente | 
   | 60600600  | Inés      | Torres       | 20606006009 | F    | Licenciada en Geografía | La Pampa 322| +54 (280) 466-6666 | 200    | La persona: Inés Torres con DNI 60600600 ingresado/a correctamente | 
   | 70700700  | Jorge     | Dismal       | 27707007009 | M    |                         | Mitre 1855  | +54 (280) 477-7777 | 200    | La persona: Jorge Dismal con DNI 70700700 ingresado/a correctamente | 
   | 20000000  | Rosalía   | Fernandez    | 20200000009 | F    | Maestra de grado        | Maiz 356    | +54 (280) 420-0000 | 200    | La persona: Rosalía Fernandez con DNI 20000000 ingresado/a correctamente | 
   | 80800800  | Analía    | Rojas        | 20808008009 | F    | Técnica superior        | Rosa 556    | +54 (280) 488-8888 | 200    | La persona: Analía Rojas con DNI 80800800 ingresado/a correctamente |       
   | 99100000  | Ermenegildo | Sábat      | 90991000000 | M    | Licenciado en Matematicas | Muzzio 21 | +54 (280) 411-7788 | 200    | La persona: Ermenegildo Sábat con DNI 99100000 ingresado/a correctamente   |
   | 99200000  | María Rosa  | Gallo      | 11992000000 | F    |                         | Peru 233    | +54 (280) 777-7777 | 200    | La persona: María Rosa Gallo con DNI 99200000 ingresado/a correctamente   |
   | 99300000  | Homero      | Manzi      | 22993000000 | M    |                         | Fontana 199 | +54 (280) 999-9999 | 200    | La persona: Homero Manzi con DNI 99300000 ingresado/a correctamente      |

Esquema del escenario: ingresar nueva división
   Dada el espacio físico división con <año> <número> "<orientación>" "<turno>" 
   Cuando se presiona el botón de guardar
   Entonces se espera el siguiente <status> con la "<respuesta>"

   Ejemplos:
   | año | número | orientación | turno  | status | respuesta                                            |
   | 5   | 2      | Biológicas  | Mañana | 200    | División 5º 2º turno Mañana ingresada correctamente  |
   | 3   | 1      | Sociales    | Tarde  | 200    | División 3º 1º turno Tarde ingresada correctamente   |
   | 3   | 1      | Sociales    | Tarde  | 200    | La division ya existe                                |
   | 2   | 3      | Física      | Mañana | 200    | División 2º 3º turno Mañana ingresada correctamente  |
   | 1   | 1      | Matemática  | Tarde  | 200    | División 1º 1º turno Tarde ingresada correctamente   |
   | 4   | 3      | Tecnología  | Mañana | 200    | División 4º 3º turno Mañana ingresada correctamente  |

Esquema del escenario: ingresar nuevo cargo institucional
   Dado el cargo institucional cuyo "<nombre>" que da título al mismo
   Y que es del "<tipoDesignación>" 
   Y que tiene una <cargaHoraria> con la vigencia "<fechaDesde>" "<fechaHasta>" 
   Y que si el tipo es espacio curricular, opcionalmente se asigna a la división <año>, <número>, "<turno>"
   Cuando se presiona el botón de guardar cargo
   Entonces se espera el siguiente <status> con la "<respuesta>"

   Ejemplos:
   | nombre         | tipoDesignación    | cargaHoraria | fechaDesde | fechaHasta | año | número | turno  | status | respuesta                                                                               |
   | Vicedirector-a | CARGO              | 36           | 2020-03-01 |            |     |        |        | 200    | Cargo de Vicedirector-a ingresado correctamente                                         |
   | Preceptor-a    | CARGO              | 36           | 2020-03-01 |            |     |        |        | 200    | Cargo de Preceptor-a ingresado correctamente                                            |
   | Historia       | ESPACIO_CURRICULAR | 4            | 2020-03-01 |            | 5   | 2      | Mañana | 200    | Espacio Curricular Historia para la division 5º 2º Turno Mañana ingresado correctamente |
   | Geografia      | ESPACIO_CURRICULAR | 3            | 2020-03-01 |            | 3   | 1      | Tarde  | 200    | Espacio Curricular Geografia para la division 3º 1º Turno Tarde ingresado correctamente |
   | Auxiliar ADM   | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Auxiliar ADM ingresado correctamente                                           |
   | Auxiliar ACAD  | CARGO              | 30           | 2020-03-01 |            | 3   | 1      | Tarde  | 501    | Cargo de Auxiliar ACAD es CARGO y no corresponde asignar división                       |
   | Matematica     | ESPACIO_CURRICULAR | 6            | 2020-03-01 |            |     |        |        | 501    | Espacio Curricular Matematica falta asignar división                                    |
   | Matematica     | ESPACIO_CURRICULAR | 6            | 2020-03-01 |            | 1   | 1      | Tarde  | 200    | Espacio Curricular Matematica para la division 1º 1º Turno Tarde ingresado correctamente |
   | Física         | ESPACIO_CURRICULAR | 6            | 2020-03-01 |            | 2   | 3      | Mañana | 200    | Espacio Curricular Física para la division 2º 3º Turno Mañana ingresado correctamente   |
   | Tecnología     | ESPACIO_CURRICULAR | 8            | 2020-03-01 |            | 4   | 3      | Mañana | 200    | Espacio Curricular Tecnología para la division 4º 3º Turno Mañana ingresado correctamente   |



Esquema del escenario: Designación de persona en cargos NO cubiertos aún en el perído indicado de forma existosa
   Dada la persona con <DNI> "<nombre>" y "<apellido>"
   Y que se asigna al cargo  con tipo de designación "<tipo>" y "<nombreDesignacion>" 
   Y si es espacio curricular asignada a la división <año> <número> "<turno>"
   Y se designa por el período "<fechadesde>" "<fechaHasta>"
   Cuando se presiona el botón de guardar designacion
   Entonces se espera el siguiente <status> con la "<respuesta>"

   Ejemplos:
   | DNI       | nombre      | apellido     | tipo               | nombreDesignacion | año | número | turno | fechadesde | fechaHasta | status | respuesta                                                                                                      |
   | 10100100  | Alberto     | Lopez        | CARGO              | Vicedirector-a    |     |        |       | 2023-03-01 |            | 200    | Alberto Lopez ha sido designado/a como Vicedirector-a exitosamente                                             |
   | 20200200  | Susana      | Álvarez      | CARGO              | Preceptor-a       |     |        |       | 2023-03-01 | 2023-12-31 | 200    | Susana Álvarez ha sido designado/a como Preceptor-a exitosamente                                               |
   | 40400400  | Marisa      | Amuchástegui | ESPACIO_CURRICULAR | Historia          | 5   | 2      | Mañana| 2023-03-01 |            | 200    | Marisa Amuchástegui ha sido designado/a a la asignatura Historia a la división 5º 2º turno Mañana exitosamente |
   | 50500500  | Raúl        | Gómez        | ESPACIO_CURRICULAR | Geografia         | 3   | 1      | Tarde | 2023-03-01 | 2025-12-31 | 200    | Raúl Gómez ha sido designado/a a la asignatura Geografia a la división 3º 1º turno Tarde exitosamente          |
   | 20000000  | Rosalía     | Fernandez    | CARGO              | Preceptor-a       |     |        |       | 2023-03-01 | 2023-12-31 | 409    | Rosalía Fernandez NO ha sido designado/a como preceptor-a. pues el cargo solicitado lo ocupa Susana Álvarez para el período           |
   | 99100000  | Ermenegildo | Sábat        | ESPACIO_CURRICULAR | Física            | 2   | 3      | Mañana| 2023-03-01 |            | 200    | Ermenegildo Sábat ha sido designado/a a la asignatura Física a la división 2º 3º turno Mañana exitosamente     |
   | 99200000  | María Rosa  | Gallo        | ESPACIO_CURRICULAR | Matematica        | 1   | 1      | Tarde | 2023-03-01 |            | 200    | María Rosa Gallo ha sido designado/a a la asignatura Matematica a la división 1º 1º turno Tarde exitosamente   |
   | 99300000  | Homero      | Manzi        | ESPACIO_CURRICULAR | Tecnología        | 4   | 3      | Mañana| 2023-03-01 |            | 200    | Homero Manzi ha sido designado/a a la asignatura Tecnología a la división 4º 3º turno Mañana exitosamente      |

   Esquema del escenario: Designación de persona en una instancia de designación de cargo que YA cuenta con una designación para el mismo período. Informar el error respectivo y abortar la transacción
   Dada la persona con "<CUIL>" "<nombre>" y "<apellido>"
   Y que se asigna al cargo  con tipo de designación "<tipo>" y "<nombreDesignación>" 
   Y si es espacio curricular asignada a la división <año> <número> "<turno>"
   Y se designa por el período "<fechadesde>" a "<fechaHasta>"
   Cuando se presiona el botón de guardar designacion
   Entonces se espera el siguiente <status> con la "<respuesta>"

   Ejemplos:
   | CUIL         | nombre     | apellido     | tipo               | nombreDesignación | año | número | turno | fechadesde | fechaHasta | status | respuesta                                                                                                                       |
   | 22993000000  | Homero     | Manzi        | CARGO              | Preceptor-a       |     |        |       | 2023-05-01 | 2024-12-31 | 200    | Homero Manzi NO ha sido designado/a como preceptor-a. pues el cargo solicitado lo ocupa Susana Álvarez para el período          |
   | 11992000000  | María Rosa | Gallo        | ESPACIO CURRICULAR | Geografia         | 3   | 1      | Tarde | 2023-07-01 | 2023-10-15 | 200    | María Rosa Gallo NO ha sido designado/a debido a que la asignatura Geografía de la división 3º 1º turno Tarde lo ocupa Raúl Gómez para el período   |
   | 20808008009  | Analía     | Rojas        | CARGO              | Vicedirector-a    |     |        |       | 2023-09-08 | 2020-11-12 | 200    | Existe un error en la seleccion de fechas                                                                  |


Esquema del escenario: Otorgar Distintas licencias según las reglas de los distintos artículos
   Dado el docente con CUIL "<CUIL>", nombre "<Nombre>" y apellido "<Apellido>"
   Cuando solicita una licencia artículo "<Artículo>" con descripción "<Descripción>" para el período "<Desde>" "<Hasta>"
   Y se presiona el botón de guardar licencia
   Entonces debería obtener la siguiente resultado de <status> y "<Respuesta>"

   Ejemplos:
   | CUIL         | Nombre       | Apellido  | Artículo  | Descripción                    | Desde        | Hasta        | status | Respuesta                                                                                 |
   | 90991000000  | Ermenegildo  | Sábat     | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-05-07   | 2023-05-17   | 200    | Se otorga Licencia artículo 5A a Ermenegildo Sábat  |
   | 90991000000  | Ermenegildo  | Sábat     | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-05-18   | 2023-05-31   | 200    | Se otorga Licencia artículo 5A a Ermenegildo Sábat  |
   | 90991000000  | Ermenegildo  | Sábat     | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-06-01   | 2023-06-12   | 500    | NO se otorga Licencia artículo 5A a Ermenegildo Sábat debido a que supera el tope de 30 días de licencia  |
   | 90991000000  | Ermenegildo  | Sábat     | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-10-01   | 2023-10-03   | 200    | Se otorga Licencia artículo 5A a Ermenegildo Sábat  |
   | 90991000000  | Ermenegildo  | Sábat     | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-10-04   | 2023-10-10   | 500    | NO se otorga Licencia artículo 5A a Ermenegildo Sábat debido a que supera el tope de 30 días de licencia  |
   | 11992000000  | María Rosa   | Gallo     | 23A       | ATENCIÓN DE UN MIEMBRO DEL GF  | 2023-02-15   | 2023-03-01   | 200    | Se otorga Licencia artículo 23A a María Rosa Gallo  |
   | 11992000000  | María Rosa   | Gallo     | 23A       | ATENCIÓN DE UN MIEMBRO DEL GF  | 2023-04-01   | 2023-04-16   | 200    | Se otorga Licencia artículo 23A a María Rosa Gallo  |
   | 11992000000  | María Rosa   | Gallo     | 23A       | ATENCIÓN DE UN MIEMBRO DEL GF  | 2023-04-12   | 2023-04-20   | 500    | NO se otorga Licencia artículo 23A a María Rosa Gallo debido a que ya posee una licencia en el mismo período |
   | 11992000000  | María Rosa   | Gallo     | 23A       | ATENCIÓN DE UN MIEMBRO DEL GF  | 2023-04-17   | 2023-04-20   | 500    | NO se otorga Licencia artículo 23A a María Rosa Gallo debido a que supera el tope de 30 días de licencia  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-05-08   | 2023-05-08   | 200    | Se otorga Licencia artículo 36A a Homero Manzi  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-05-11   | 2023-05-11   | 200    | Se otorga Licencia artículo 36A a Homero Manzi  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-05-20   | 2023-05-20   | 500    | NO se otorga Licencia artículo 36A a Homero Manzi debido a que supera el tope de 2 licencias por mes  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-08-13   | 2023-08-14   | 200    | Se otorga Licencia artículo 36A a Homero Manzi  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-09-24   | 2023-08-25   | 200    | Se otorga Licencia artículo 36A a Homero Manzi  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-10-24   | 2023-10-25   | 200    | Se otorga Licencia artículo 36A a Homero Manzi  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-10-04   | 2023-10-05   | 200    | Se otorga Licencia artículo 36A a Homero Manzi  |
   | 22993000000  | Homero       | Manzi     | 36A       | ASUNTOS PARTICULARES           | 2023-11-04   | 2023-11-04   | 500    | NO se otorga Licencia artículo 36A a Homero Manzi debido a que supera el tope de 6 licencias por año  |
   | 27303003009  | Pedro        | Benítez   | 36A       | ASUNTOS PARTICULARES           | 2023-03-04   | 2023-03-04   | 500    | NO se otorga Licencia artículo 36A a Pedro Benítez debido a que el agente no posee ningún cargo en la institución  |
   | 20404004009  | Marisa       | Balaguer  | 36A       | ASUNTOS PARTICULARES           | 2023-03-04   | 2023-03-04   | 500    | NO se otorga Licencia artículo 36A a Marisa balaguer debido a que el agente no tiene designación ese día en la institución  |
   | 20202002009  | Susana       | Álvarez   | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-05-12   | 2023-06-30   | 200    | Se otorga Licencia artículo 5A a Susana Álvarez  |
   | 20200000009  | Rosalía      | Fernandez | 5A        | ENFERMEDAD DE CORTA EVOLUCIÓN  | 2023-07-05   | 2023-09-15   | 200    | Se otorga Licencia artículo 5A a Rosalía Fernandez  |


Escenario: 1 persona en instancias de designación de cargo que cubre una licencia de otra persona en la misma designación. Infomar que está correcto y que reemplaza al docente que solicitó licencia.
   Dado que existe la persona
      | CUIL       | Nombre    | Apellido     |
      | 27707007009  | Jorge     | Dismal       |
   Y que existen las siguientes instancias de designación asignada
      | TipoDesignacion | NombreTipoDesignacion | CargaHoraria |
      | cargo           | Preceptor/a             | 36           |
   Y que la instancia de designación está asignada a la persona con licencia "5A" comprendida en el período desde "2020-05-12" hasta "2020-06-30"
      | CUIL       | Nombre    | Apellido     | Desde        | Hasta        |
      | 20202002009  | Susana    | Álvarez      | 2020-03-01   | 2020-12-31   |
   Cuando se solicita el servicio de designación de la persona al cargo en el período comprendido desde "2020-05-17" hasta "2020-06-29"
   Entonces se recupera el mensaje
      """
      {
         "StatusCode": 200,
         "StatusText": "Jorge Dismal ha sido designado/a al cargo prceptor/a exitosamente, en reemplado de Susana Álvarez"
      }
      """


Escenario: 1 persona en instancias de designación de cargo que cubre una licencia de otra persona en la misma designación, pero que no coincide el mismo período. Infomar el error respectivo y abortar la transacción.
   Dado que existe la persona
      | CUIL         | Nombre    | Apellido     |
      | 20808008009  | Analía    | Rojas        |
   Y que existen las siguientes instancias de designación asignada
      | TipoDesignacion | NombreTipoDesignacion | CargaHoraria |
      | cargo           | Auxiliar  ADM         | 30           |
   Y que la instancia de designación está asignada a la persona
      | CUIL         | Nombre    | Apellido     | Desde        | Hasta        |
      | 20200000009  | Rosalía   | Fernandez    | 2020-03-01   | 2020-12-31   |
   Y que la instancia de designación está asignada a la persona con licencia "5A" comprendida en el período desde "2020-07-05" hasta "2020-09-15"
   Cuando se solicita el servicio de designación de la persona al cargo en el período comprendido desde "2020-06-05" hasta "2020-09-15"
   Entonces se recupera el mensaje
      """
      {
         "StatusCode": 500,
         "StatusText": "Analía Rojas NO ha sido designado/a al cargo auxiliar ya cuenta con Rosalía Fernandez asignada al mismo en el período"
      }
      """