# What to install and howto



## Nginx

Security issue

```
sudo nano /etc/nginx/nginx.conf
server_tokens off;
sudo systemctl restart nginx.service
```

Commands

```
sudo apt-get install nginx
sudo systemctl status nginx
sudo systemctl reload nginx
```

Useful

```
/etc/nginx/nginx.conf - Location of global config file
/etc/nginx/sites-enabled/default - Location of default server block config file.
```

Config

```
    location /hello-world/ {
        proxy_pass http://localhost:5001/;
      proxy_http_version 1.1;
        proxy_set_header Upgrade            $http_upgrade;
        proxy_set_header Connection         'upgrade';

      # Added after the recording
        proxy_set_header Host                     $host;
        proxy_set_header X-Real-IP            $remote_addr;
        proxy_set_header X-Forwarded-For      $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_set_header X-Forwarded-Host     $host;
        proxy_set_header X-Forwarded-Port     $server_port;
    }
```



## https

Generate a self-signed certificate, for test.

```
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/server.key -out ssl/server.crt \
    -subj "/CN=localhost"
```