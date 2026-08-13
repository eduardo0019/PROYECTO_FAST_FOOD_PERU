#!/bin/sh
set -e

php artisan config:clear
php artisan migrate --force
exec supervisord -c /etc/supervisord.conf

