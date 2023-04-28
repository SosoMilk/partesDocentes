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

Esquema del escenario: Borrar a una persona que ya existe
   Dado que existe la persona con cuil "<CUIL>"
   Cuando solicito borrar a la persona con cuil "<CUIL>"
   Entonces se espera el siguiente <status> con la "<respuesta>"
   
   Ejemplos:
   | CUIL        | status | respuesta                                               |
   | 27101001009 | 200    | Persona eliminada correctamente                       |
   | 20202002009 | 200    | Persona eliminada correctamente                       |
   | 27303003009 | 200    | Persona eliminada correctamente                       |
   | 20404004009 | 200    | Persona eliminada correctamente                       | 
   | 27505005009 | 200    | Persona eliminada correctamente                       | 
   | 20606006009 | 200    | Persona eliminada correctamente                       | 
   | 27707007009 | 200    | Persona eliminada correctamente                       | 
   | 20200000009 | 200    | Persona eliminada correctamente                       | 
   | 20808008009 | 200    | Persona eliminada correctamente                       |       