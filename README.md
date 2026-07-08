# WNHRI Website

Static website for West Nile Hope & Resilience Initiative (WNHRI), prepared for `https://wnhri.org`.

## SEO

- `index.html` includes canonical URL, Open Graph tags, and JSON-LD structured data.
- `sitemap.xml` lists the homepage and crawlable sitelink pages.
- `robots.txt` points search engines to the sitemap.
- Google sitelinks cannot be forced, but the page structure gives Google clear links to show: About, Programs, Founder, Gallery, and Contact.

After deployment, add the domain to Google Search Console and submit:

```text
https://wnhri.org/sitemap.xml
```

## CMS

Decap CMS is available at:

```text
https://wnhri.org/admin/
```

The CMS currently edits:

- `content/site.json` for homepage text, founder name, contact details, mission, vision, and program summaries.
- `content/updates/` for future news/update posts.

The current CMS config uses Netlify Git Gateway. If the site is hosted somewhere else, change `admin/config.yml` to the correct Decap CMS backend.

## Local Preview

Serve the folder with any static server, for example:

```bash
python -m http.server 4173
```
