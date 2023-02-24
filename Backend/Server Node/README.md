# MANUAL PARA LEVANTAR BACKEND NODEJS

## Prerrequisitos

- NodeJs
- NPM

## INSTALAR DEPENDENCIAS

```bash
npm install 
```

## LEVANTAR ENTORNO DE DESARROLLO

```bash
npm run start-dev
```

## LEVANTAR ENTORNO DE PRODUCCIÓN

```bash
npm run start-prod
```

## NOTA IMPORTANTE PARA ARCHIVOS .ENV

En estos archivos se configuran las variables de entorno a utilizar, la estructura es la siguiente

```bash
HOST=<HOST_DE_BASE>
DATABASE_NAME=<NOMBRE DEL SCHEMA>
USER=<USUARIO_DE_CONEXION_MYSQL>
PASSWORD=<CONTRASENIA_DE_CONEXION_MYSQL>
PORT=<PUERTO>
```

El puerto normalmente en MYSQL es el ***3306***

## ENDPOINTS DISPONIBLES

```bash
[POST]
http://localhost:3010/api/user
Ejemplo de body:
{
    "username": "user-postmane",
    "password": "user-postmane123",
    "picture": "https://cdn-icons-png.flaticon.com/512/9002/9002438.png"
}
posibles respuestas:
EXITO
- [
    {
        "successStatus": 1,
        "errorMessage": null
    }
]

ERROR
- Intentar duplicar un usuario
{
    "sucessStatus": false,
    "errorMessage": "Hubo un error en la creación de usuario revise el servidor de Node",
    "error": {
        "code": "ER_DUP_ENTRY",
        "errno": 1062,
        "sqlState": "23000",
        "sqlMessage": "Duplicate entry 'user-postmane' for key 'user.PRIMARY'",
        "sql": "CALL new_user('user-postmane','user-postmane123','https://cdn-icons-png.flaticon.com/512/9002/9002438.png')"
    }
}

[GET]
http://localhost:3010/api/user/login
Ejemplo de body:
{
    "username": "user-postmane",
    "password": "user-postmane123"
}
posibles respuestas:
EXITO
{
    "successStatus": true,
    "existUser": true,
    "errorMessage": null
}

ERROR
{
    "successStatus": false,
    "existUser": false,
    "errorMessage": "El usuario no existe"
}
----
{
    "successStatus": false,
    "existUser": true,
    "errorMessage": "contraseña incorrecta"
}
```
