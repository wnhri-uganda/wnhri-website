# WNHRI Website

Static website for West Nile Hope & Resilience Initiative (WNHRI), prepared for `https://wnhri.org` and deployment on Vercel.

## Deployment

Deploy this repository on Vercel as a static site:

- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: leave empty
- Domain: `wnhri.org`

The project includes `vercel.json` for static asset caching and basic security headers.

If the domain is registered at Namecheap but uses Cloudflare nameservers, DNS must be edited in Cloudflare, not Namecheap. Keep the Cloudflare Email Routing `MX`/`TXT` records for `info@wnhri.org`, and add only the Vercel website `A`/`CNAME` records in Cloudflare.

## CMS

The website uses the free, open-source Pages CMS with the existing GitHub and Vercel deployment.

- Website editor shortcut: `https://wnhri.org/admin/`
- CMS app: `https://app.pagescms.org/`
- Config file: `.pages.yml`
- General text and programs: `content/site.json`
- Page, collage, background, logo, donation, and footer images: `content/images.json`
- Addable gallery images and captions: `content/gallery.json`
- Image media library and uploads: `assets`

Install/connect Pages CMS to the GitHub repository `wnhri-uganda/wnhri-website`, then sign in with a GitHub account that has access to the repo.

In Pages CMS:

1. Open **Website Images** to replace the logo, page headers, home-page images, collages, mission/vision backgrounds, donation images, or footer icons.
2. Open **Gallery Images and Captions** to add, remove, reorder, or caption photos. The first five Main Gallery images also appear on the home page.
3. Save the entry. Pages CMS commits the change to GitHub and Vercel deploys the updated site automatically.

Uploads receive unique filenames, and website images are revalidated by browsers so replacements do not remain stuck behind an old cache.

## SEO

- `index.html` includes canonical URL, Open Graph tags, and JSON-LD structured data.
- `sitemap.xml` lists the homepage and crawlable sitelink pages.
- `robots.txt` points search engines to the sitemap.
- Navigation and sitemap include About, Programs, Donate, Gallery, and Contact.

Google ranking and sitelinks cannot be forced. The site is prepared correctly, but Google decides when to rank it and which extra links to show.

After deployment, add the domain to Google Search Console and submit:

```text
https://wnhri.org/sitemap.xml
```

## Local Preview

Serve the folder with any static server, for example:

```bash
python -m http.server 4173
```
