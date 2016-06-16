# mahjong

WEBS6 eindopdracht.

## NGINX

```nginx
server {
  listen 80;
  listen [::]:80;

  server_name localhost;
  root /path/to/majong;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```
