# Deployment Guide: Hosting voltnite.com on the Same VPS as app.vendops.in

This guide explains how to containerize and run `voltnite.com` on the same VPS hosting `app.vendops.in`.

---

## Architecture Overview

```
                      Internet
                         │
        ┌────────────────┴────────────────┐
        ▼                                 ▼
   voltnite.com                    app.vendops.in
        │                                 │
        └────────────────┬────────────────┘
                         ▼
               VPS Public IP Address
                         │
                 Nginx Reverse Proxy
                  (Ports 80 & 443)
                         │
            ┌────────────┴────────────┐
            ▼                         ▼
  Proxy to 127.0.0.1:3005   Proxy to Vendops Container/Port
 (voltnite-website Docker)
```

---

## 1. What to Change in GoDaddy DNS (Based on Your Screenshot)

From your GoDaddy DNS settings:

### What to UPDATE:
| Type | Name | Current Value | New Value | TTL | Action |
|------|------|---------------|-----------|-----|--------|
| **A** | `@` | `WebsiteBuilder Site` | **`<YOUR_VPS_PUBLIC_IP>`** | `1/2 Hour` or `1 Hour` | **Edit** (pencil icon) |

> **How to find `<YOUR_VPS_PUBLIC_IP>`:**
> It is the exact same IP address that `app.vendops.in` is using. You can check it on your terminal with:
> ```bash
> ping -c 1 app.vendops.in
> ```

### What to KEEP UNCHANGED:
- **`CNAME` `www` -> `voltnite.com.`**: Keep this as-is (it already directs `www.voltnite.com` to `voltnite.com`).
- **All `MX` records** (`aspmx.l.google.com`, etc.): **DO NOT TOUCH** (these power your Google Workspace business emails).
- **All `TXT` records** (SPF, DKIM `google._domainkey`, DMARC `_dmarc`): **DO NOT TOUCH** (these ensure your emails do not land in spam).
- **`NS` records**: **DO NOT TOUCH**.

---

## 2. Deploying the Docker Container on the VPS

### Step 2.1: Transfer or Clone the Code to the VPS
On your VPS, navigate to your web projects directory (e.g., `/opt` or `/home/ubuntu`):

```bash
git clone <YOUR_VOLTNITE_REPO_URL> /opt/voltnite-website
cd /opt/voltnite-website
```

### Step 2.2: Start the Container with Docker Compose
We set the host port to **`3005`** so it won't conflict with any other app (like `app.vendops.in`):

```bash
# Build and launch the container in the background
docker compose up -d --build
```

### Step 2.3: Verify the Container is Running
```bash
# Check running container
docker compose ps

# Test local response on port 3005
curl -I http://127.0.0.1:3005
```
You should see `HTTP/1.1 200 OK`.

---

## 3. Configuring Nginx on the VPS

Create a new Nginx virtual host for `voltnite.com`:

```bash
sudo nano /etc/nginx/sites-available/voltnite.com
```

Paste the following configuration:

```nginx
server {
    listen 80;
    server_name voltnite.com www.voltnite.com;

    location / {
        proxy_pass http://127.0.0.1:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and reload Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/voltnite.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 4. Install Free SSL Certificate (HTTPS)

Once your GoDaddy A record has propagated to your VPS IP, generate the SSL certificate using Certbot:

```bash
sudo certbot --nginx -d voltnite.com -d www.voltnite.com
```

Select the option to automatically redirect all HTTP traffic to HTTPS.
Certbot will auto-renew this certificate before expiration.

---

## 5. Summary of Useful Commands

| Task | Command |
|------|---------|
| View logs | `docker compose logs -f` |
| Restart website | `docker compose restart` |
| Rebuild after git pull | `git pull && docker compose up -d --build` |
| Stop container | `docker compose down` |
| Check Nginx status | `sudo systemctl status nginx` |
