# Despliegue en Railway

Este proyecto se despliega como un servicio Docker. Railway detecta el
`Dockerfile` automáticamente.

## Servicios requeridos

En un proyecto de Railway crea:

1. Un servicio desde este repositorio para la API Laravel.
2. Una base de datos **MySQL** con el nombre `MySQL`.

## Variables de entorno de la API

Configura estas variables en el servicio Laravel. No subas un archivo `.env`.

```text
APP_NAME=Fast Food Peru API
APP_ENV=production
APP_DEBUG=false
APP_KEY=<resultado de php artisan key:generate --show>
APP_URL=<dominio HTTPS generado por Railway>
FRONTEND_URL=https://eduardo0019.github.io
LOG_CHANNEL=stderr
DB_CONNECTION=mysql
DB_HOST=${{MySQL.MYSQLHOST}}
DB_PORT=${{MySQL.MYSQLPORT}}
DB_DATABASE=${{MySQL.MYSQLDATABASE}}
DB_USERNAME=${{MySQL.MYSQLUSER}}
DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
SESSION_DRIVER=database
CACHE_STORE=database
QUEUE_CONNECTION=database
```

La imagen ejecuta `php artisan migrate --force` al iniciarse. Una vez que el
servicio termine de desplegarse, genera un dominio público desde **Settings >
Networking**.

## Conexión del frontend

En el frontend React define la URL del servicio, sin la barra final:

```text
REACT_APP_API_URL=https://<tu-dominio>.up.railway.app
```

Después vuelve a compilar y publicar GitHub Pages. La API quedará disponible,
por ejemplo, en `https://<tu-dominio>.up.railway.app/api/test`.
