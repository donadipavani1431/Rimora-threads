# Rimora Threads Frontend

The frontend is designed to work either:

1. Through the backend server at `http://localhost:5050` (recommended), or
2. As a static site with a separately reachable API.

## Recommended

Run from repository root:

```bash
node backend/server.js
```

Open `http://localhost:5050`.

## Static-only mode

```bash
python3 -m http.server 4173
```

If API is not on the same origin, configure this before loading `app.js` in `index.html`:

```html
<script>
  window.RIMORA_API_BASE = 'http://localhost:5050/api';
</script>
```
