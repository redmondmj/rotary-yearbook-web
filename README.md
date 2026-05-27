# Rotary Club Yearbook Web Application

A modern React and Vite application for browsing the digital yearbook archives, viewing the sponsors directory, and submitting contact inquiries for the Rotary Club of Truro.

## Development

To start a local development server:
```bash
npm install
npm run dev
```

To run linter checks:
```bash
npm run lint
```

To compile production assets:
```bash
npm run build
```
This builds static assets into the `dist/` directory.

---

## Deployment

The application is deployed as a static site served via Nginx on a Bitnami stack instance.

### Prerequisites
Make sure your SSH config (`~/.ssh/config`) contains the alias for the target server:
```text
Host nginx
  HostName 99.79.153.223
  User bitnami
  IdentityFile ~/.ssh/NGINX-General.pem
```

### Deploy Steps

1. **Verify code quality:**
   ```bash
   npm run lint
   ```
2. **Build the production assets:**
   ```bash
   npm run build
   ```
3. **Upload the static assets to the Nginx server:**
   ```bash
   scp -r dist/assets dist/favicon.svg dist/icons.svg dist/index.html dist/yearbooks nginx:/opt/bitnami/apps/rotary-yearbook-wp/htdocs/
   ```
4. **Fix permissions on the server:**
   Ensure Nginx has read and execute access to the newly uploaded directories:
   ```bash
   ssh nginx "chmod 755 /opt/bitnami/apps/rotary-yearbook-wp/htdocs/assets /opt/bitnami/apps/rotary-yearbook-wp/htdocs/yearbooks"
   ```

*Note: Changes to static assets take effect immediately on Nginx; no server reload or service restart is required.*
