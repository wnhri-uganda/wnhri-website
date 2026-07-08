# WNHRI Launch Checklist

## 1. Deploy on Vercel

1. Log in to Vercel.
2. Import the GitHub repo: `wnhri-uganda/wnhri-website`.
3. Use these settings:
   - Framework Preset: `Other`
   - Build Command: leave empty
   - Output Directory: leave empty
4. Deploy.
5. Add the custom domain: `wnhri.org`.

## 2. Connect the Domain

In the domain/DNS provider, follow the DNS records Vercel gives you. After DNS is active, make sure these URLs work:

- `https://wnhri.org/`
- `https://wnhri.org/sitemap.xml`
- `https://wnhri.org/robots.txt`
- `https://wnhri.org/donate.html`

## 3. Set Up the Free CMS

Use Pages CMS because it works well with GitHub and Vercel.

1. Open `https://app.pagescms.org/`.
2. Sign in with GitHub.
3. Connect/install it for `wnhri-uganda/wnhri-website`.
4. Open the repository in Pages CMS.
5. Edit `Site Settings`.
6. Save changes. Pages CMS will commit updates back to GitHub, and Vercel will redeploy automatically.

The editable content is configured in `.pages.yml`.

## 4. Google Search Setup

1. Open Google Search Console.
2. Add the property for `wnhri.org`.
3. Verify ownership using the DNS TXT record Google provides.
4. Submit this sitemap:

```text
https://wnhri.org/sitemap.xml
```

5. Use URL Inspection for `https://wnhri.org/` and request indexing.

## 5. About Ranking and Extra Google Links

The extra links under a Google result are called sitelinks. Google chooses them automatically. We cannot force them, but this website is prepared for them with:

- Clear page titles
- Clear navigation
- Sitemap
- Robots file
- Structured data
- Separate pages for About, Programs, Founder, Donate, Gallery, and Contact

For best results, keep the domain active, share the website link publicly, add it to official social profiles, and keep content consistent with the full organization name: West Nile Hope & Resilience Initiative.

## 6. Mobile Check

Before announcing the site, check these pages on a phone:

- Home
- About
- Programs
- Donate
- Gallery
- Contact
