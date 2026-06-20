# talocode-github-sponsors

Add GitHub Sponsors support to Talocode, Abdulmuiz44, and ClientPadHQ repositories.

## When to Use

Use this skill when:
- Setting up Sponsor buttons on new repositories
- Adding sponsor links to README files
- Configuring FUNDING.yml files
- Adding sponsor badges to documentation

## Sponsor Configuration

### Primary Sponsor Target
- **Account**: Abdulmuiz44
- **URL**: https://github.com/sponsors/Abdulmuiz44

### FUNDING.yml Content
```yaml
github: [Abdulmuiz44]
```

### Sponsor Badge (for GitHub READMEs)
```markdown
[![Sponsor Abdulmuiz44](https://img.shields.io/badge/Sponsor-Abdulmuiz44-ea4aaa?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Abdulmuiz44)
```

### Sponsor Widget (for websites)
```html
<iframe
  src="https://github.com/sponsors/Abdulmuiz44/button"
  title="Sponsor Abdulmuiz44"
  height="32"
  width="114"
  style="border: 0; border-radius: 6px;"
></iframe>
```

For React/Next.js:
```jsx
<iframe
  src="https://github.com/sponsors/Abdulmuiz44/button"
  title="Sponsor Abdulmuiz44"
  height="32"
  width="114"
  style={{ border: 0, borderRadius: 6 }}
/>
```

## Setup Checklist

### 1. Organization-Level Funding
Add FUNDING.yml to org `.github` repos:
- `talocode/.github/FUNDING.yml`
- `clientpadhq/.github/FUNDING.yml`
- `Abdulmuiz44/.github/FUNDING.yml` (if exists)

### 2. Repo-Level Funding
Add `.github/FUNDING.yml` to important repos:
- `talocode/codra`
- `talocode/tera`
- `talocode/skills`
- `talocode/worklane`
- `clientpadhq/*` repos

### 3. Profile READMEs
Add sponsor section to profile READMEs:
- `talocode/.github/profile/README.md`
- `clientpadhq/.github/profile/README.md`
- `Abdulmuiz44/Abdulmuiz44/README.md` (if exists)

### 4. Repo READMEs
Add sponsor badge to repo READMEs:
```markdown
## Support

If this project helps you, you can support the work here:

[![Sponsor Abdulmuiz44](https://img.shields.io/badge/Sponsor-Abdulmuiz44-ea4aaa?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Abdulmuiz44)
```

### 5. Website Widgets
Add iframe widget to website landing pages (not GitHub READMEs):
```html
<iframe
  src="https://github.com/sponsors/Abdulmuiz44/button"
  title="Sponsor Abdulmuiz44"
  height="32"
  width="114"
  style="border: 0; border-radius: 6px;"
></iframe>
```

### 6. Package.json Funding
Add to npm packages:
```json
"funding": {
  "type": "github",
  "url": "https://github.com/sponsors/Abdulmuiz44"
}
```

## Important Notes

- GitHub README files do NOT support iframe embeds
- Use Markdown badges for GitHub READMEs
- Use iframe widgets for websites and docs
- Do not add fake payment links
- Do not claim sponsorship is active until GitHub shows it
- Keep sponsor copy professional and humble

## Validation

After setup, verify:
1. FUNDING.yml has valid YAML syntax
2. Sponsor button appears in repo sidebar
3. Badge links work in GitHub README
4. iframe widgets work on websites
5. package.json funding field is valid

## Example Repositories

### Talocode
- `talocode/codra`
- `talocode/tera`
- `talocode/skills`
- `talocode/worklane`

### ClientPadHQ
- All public repos under `clientpadhq`

### Personal
- `Abdulmuiz44/*` repos
