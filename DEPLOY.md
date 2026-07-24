# Docker + Cloudflare Tunnel Deployment

## 1. VM'e dosyalari kopyala

```bash
scp -r ./dogum-gunu-borsaci user@VM_IP:/opt/simay-birthday
ssh user@VM_IP
cd /opt/simay-birthday
```

## 2. Cloudflare token dosyasini hazirla

```bash
cp .env.example .env
nano .env
```

`.env` icine Cloudflare'in verdigi tokeni yaz:

```bash
TUNNEL_TOKEN=TOKEN_BURAYA
```

## 3. Containerlari baslat

```bash
docker compose up -d --build
docker compose logs -f
```

Local test:

```bash
curl -I http://localhost:3000
```

## 4. Cloudflare dashboard ayarlari

Zero Trust Dashboard -> Networks -> Tunnels:

1. Create a tunnel
2. Connector type: Cloudflared
3. Tunnel name: `simay-birthday`
4. Environment: Docker
5. Tokeni kopyala ve `.env` icindeki `TUNNEL_TOKEN` degerine yapistir
6. Public Hostname ekle:
   - Subdomain: istedigin ad, ornek `simay`
   - Domain: Cloudflare'daki domainin, ornek `example.com`
   - Type: `HTTP`
   - URL: `app:3000`

Sonuc URL ornegi:

```text
https://simay.example.com
```

## Yararlı komutlar

```bash
docker compose ps
docker compose logs -f app
docker compose logs -f cloudflared
docker compose restart
docker compose down
```
