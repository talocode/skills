# talocode-release

Guide agents through the full Talocode release discipline.

## When to Use

Use this skill when releasing a new version of an npm package. This covers the complete flow from build to GitHub Release.

## Release Checklist

### 1. Pre-Release Validation

```bash
# Build all packages
npm run build

# Run all tests
npm test

# Verify no secrets are exposed
grep -r "API_KEY\|SECRET\|TOKEN" --include="*.ts" --include="*.js" --exclude-dir=node_modules || echo "No secrets found"
```

### 2. Version Bump

Update version in all relevant files:

- `package.json` (root)
- `packages/*/package.json` (if monorepo)
- `apps/*/package.json` (if monorepo)
- Source code version constants (e.g., CLI `--version`)
- `CHANGELOG.md`

Follow semver:
- **patch** (0.1.0 → 0.1.1): Bug fixes, dependency fixes
- **minor** (0.1.0 → 0.2.0): New features, backwards compatible
- **major** (0.1.0 → 1.0.0): Breaking changes

### 3. Changelog

Add entry to `CHANGELOG.md`:

```markdown
## [version] - YYYY-MM-DD

### Added
- New features

### Fixed
- Bug fixes

### Changed
- Changes to existing functionality

### Removed
- Removed features
```

### 4. Build & Pack

```bash
# Clean previous artifacts
rm -f *.tgz

# Build
npm run build

# Pack
npm pack

# Inspect tarball
tar -tzf <package>-<version>.tgz | head -50
tar -tzf <package>-<version>.tgz | grep package.json

# Verify package.json in tarball
tar -xzf <package>-<version>.tgz -O package/package.json | grep version
```

### 5. Global Install Test

```bash
# Install from tarball
npm install -g ./<package>-<version>.tgz

# Verify CLI works
<command> --version
<command> --help

# Uninstall
npm uninstall -g <package-name>
```

### 6. npm Publish

```bash
# Publish (requires npm auth)
npm publish --access public

# Verify publication
npm view <package-name> version
```

### 7. npx Verification

```bash
# Clean cache first
npm cache clean --force

# Test with specific version
npx --yes <package-name>@<version> --version

# Test with latest
npx --yes <package-name> --version
```

### 8. Git

```bash
# Commit changes
git add .
git commit -m "release: <package-name> v<version>"

# Tag
git tag -a <tag-name> -m "<package-name> v<version>"

# Push
git push origin main --tags
```

### 9. GitHub Release

```bash
gh release create <tag-name> \
  --title "<package-name> v<version> — <description>" \
  --notes "## What's New

- Feature 1
- Feature 2

## Install

\`\`\`bash
npm install -g <package-name>
\`\`\`

## Links

- [npm](https://www.npmjs.com/package/<package-name>)
- [GitHub](https://github.com/<org>/<repo>)" \
  <tarball>.tgz
```

### 10. Demo Video (**Required**)

Create a **60-second** demo video with **interesting multi-layer background audio** and attach it to the GitHub Release.

**Hard rules** (see `talocode-video` skill):

- Duration: **exactly ~60 seconds**
- Audio: **always** present — layered score (pad + pulse + melody), never silent
- Hook in first 1–3s; multi-scene realistic product shots (terminal/API/UI); CTA in last 10s
- Captions / high-contrast on-screen text

```bash
# After generating with talocode-video workflow:
gh release upload <tag-name> release-assets/<product>-demo.mp4 --clobber
```

Do **not** ship a static 6-second title card as a “demo.”

### 11. Announcement Checklist

- [ ] npm package published
- [ ] GitHub Release created
- [ ] Demo video attached (if applicable)
- [ ] README updated with install instructions
- [ ] CHANGELOG updated
- [ ] Version tag pushed
- [ ] Social announcement prepared (optional)

## Common Issues

### "Cannot find module" after npm install

The package is missing runtime dependencies. Fix by:
1. Adding missing dependencies to `package.json`
2. Or bundling the CLI into a single file with esbuild

### npm publish requires OTP

Use `--auth-type=web` or have the maintainer publish manually from their terminal.

### Tarball includes too many files

Create `.npmignore` to exclude dev files:

```
node_modules/
src/
*.test.ts
tsconfig*.json
jest.config.js
```

## Notes

- Never republish a version that's already on npm
- Always verify `npx --yes <package>@<version>` works before announcing
- Keep demo videos honest - no fake claims
- Tag format: `<package>-v<version>` (e.g., `worklane-v0.1.1`)
