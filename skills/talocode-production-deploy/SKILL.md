# talocode-production-deploy

Guide agents through Talocode production deployment and build verification.

## When to Use

Use this skill when:
- Deploying Talocode projects to production (Netlify, Vercel, etc.)
- Fixing build errors in production
- Verifying builds before deployment
- Troubleshooting CI/CD issues

## Pre-Deployment Checklist

### 1. Local Build Verification

```bash
# Install dependencies
npm install  # or pnpm install

# Run build
npm run build  # or pnpm build

# Check for errors
# If build succeeds, proceed
# If build fails, fix errors first
```

### 2. Common Build Errors

#### Syntax Errors
- Check for duplicate code blocks
- Look for missing closing braces
- Verify JSX/TSX syntax is correct
- Check for TypeScript errors

#### Dependency Issues
- Clear node_modules: `rm -rf node_modules`
- Clear package lock: `rm package-lock.json pnpm-lock.yaml`
- Reinstall: `npm install` or `pnpm install`

#### Network Issues
- Use `npm install --legacy-peer-deps` if peer dependency conflicts
- Use `pnpm install --prefer-offline` if network is slow
- Check proxy settings if behind a firewall

### 3. Build Command

```bash
# For Next.js projects
npm run build  # or pnpm build

# For other frameworks
npm run build
```

### 4. Verify Build Output

```bash
# Check build output exists
ls -la .next/  # Next.js
ls -la dist/   # Other frameworks

# Check for errors in build log
# If no errors, proceed to deployment
```

## Deployment to Netlify

### 1. Push to Main Branch

```bash
git add .
git commit -m "fix: resolve build errors"
git push origin main
```

### 2. Monitor Deployment

```bash
# Check deployment status
curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  "https://api.netlify.com/api/v1/sites/$SITE_ID/deploys?per_page=1" | grep -o '"state":"[^"]*"'
```

### 3. Verify Deployment

```bash
# Check site is live
curl -s https://your-site.netlify.app | head -20
```

## Common Netlify Issues

### Build Fails with Syntax Error
1. Check the error message for file and line number
2. Fix the syntax error in the source file
3. Commit and push
4. Wait for Netlify to rebuild

### Build Fails with Dependency Error
1. Clear node_modules locally
2. Reinstall dependencies
3. Commit package-lock.json
4. Push to trigger rebuild

### Build Fails with TypeScript Error
1. Run `npx tsc --noEmit` locally
2. Fix any TypeScript errors
3. Commit and push

## Environment Variables

Ensure these are set in Netlify:
- `NODE_VERSION` - Node.js version (e.g., 22)
- `NPM_FLAGS` - npm flags (e.g., --no-frozen-lockfile)
- `DISABLE_WEBPACK_CACHE` - Disable cache (optional)
- `AUTH_SECRET` - NextAuth secret (if using auth)
- `SUPABASE_URL` - Supabase URL (if using Supabase)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

## Rollback

If deployment fails:
1. Check Netlify dashboard for error details
2. Fix the issue locally
3. Push to trigger a new deployment
4. Or rollback to previous commit:
   ```bash
   git revert HEAD
   git push origin main
   ```

## Monitoring

After deployment:
1. Check site loads correctly
2. Test key functionality
3. Check for console errors
4. Verify API endpoints work
5. Test authentication flows

## Notes

- Always test builds locally before pushing
- Use feature branches for experimental changes
- Keep dependencies up to date
- Monitor Netlify build logs for issues
- Set up build notifications for failures
