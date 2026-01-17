# pressware.co

Static site for Pressware, LLC – hosted on GitHub Pages.

## DNS Configuration

To point `pressware.co` to GitHub Pages, configure the following DNS records:

### A Records (Root Domain)

Point the apex domain to GitHub Pages IP addresses:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### CNAME Record (www subdomain, optional)

| Type | Name | Value |
|------|------|-------|
| CNAME | www | tommcfarlin.github.io |

## GitHub Pages Setup

1. Push this repo to `github.com/tommcfarlin/pressware.co`
2. Go to Settings > Pages
3. Set source to "Deploy from a branch" > `main` > `/ (root)`
4. Custom domain should auto-populate from the `CNAME` file
5. Enable "Enforce HTTPS" once DNS propagates

## Structure

```
/
├── index.html                    # Homepage
├── apps/
│   └── shelflife/
│       ├── privacy.html          # Privacy Policy
│       └── terms.html            # Terms of Service
├── CNAME                         # GitHub Pages custom domain
└── README.md
```

## Links

- **Homepage:** https://pressware.co
- **Shelf Life Privacy:** https://pressware.co/apps/shelflife/privacy.html
- **Shelf Life Terms:** https://pressware.co/apps/shelflife/terms.html
