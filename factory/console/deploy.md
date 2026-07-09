# Deploy: Blueprint Factory Operator Console

Profile: Vercel
Production URL:
Preview URL:

## Notes

Operator console — snapshot mode on Vercel, live mode on local `blueprint.local`.

### Password protection

1. **Vercel Deployment Protection** (recommended): Project → Settings → Deployment Protection → enable password for previews.
2. **Basic auth env var**: set `CONSOLE_PASSWORD` in Vercel project env. Browser will prompt on load.

### Local permanent URL

```bash
pnpm blueprint:console:install
```

Bookmark: **http://blueprint.local:4177** (runs in background, survives terminal close)
