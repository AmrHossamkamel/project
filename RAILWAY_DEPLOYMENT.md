# Railway Deployment Configuration

This project is configured to deploy as a Node.js application on Railway.

## Deployment Setup

1. **Nixpacks Configuration**: The `nixpacks.toml` file forces Railway to use Node.js provider instead of auto-detecting PHP/Laravel.

2. **Build Process**: Railway will:
   - Use Node.js 20
   - Install npm dependencies
   - Build frontend assets using Laravel Mix
   - Serve the application

3. **Environment Variables**: Make sure to set these in Railway dashboard:
   - `APP_KEY` - Generate with `php artisan key:generate`
   - `APP_ENV` - Set to `production`
   - `APP_DEBUG` - Set to `false`
   - Database credentials
   - Any other Laravel-specific variables

4. **Post-Deploy Commands**: You may need to run:
   - `php artisan migrate` - For database migrations
   - `php artisan config:cache` - For performance
   - `php artisan route:cache` - For performance

## Local Development

For Windows development, use:
```bash
npm run dev
```

This uses cross-env to properly set environment variables on Windows.