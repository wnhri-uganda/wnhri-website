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

## 2. Connect the Domain with Namecheap + Cloudflare + Vercel

Your Namecheap setup is already correct for Cloudflare: keep the nameservers set to:

- `kenneth.ns.cloudflare.com`
- `serena.ns.cloudflare.com`

Because the nameservers point to Cloudflare, do not add Vercel DNS records inside Namecheap. Add them inside Cloudflare instead.

1. In Vercel, open the project.
2. Go to `Settings` -> `Domains`.
3. Add `wnhri.org`.
4. Also add `www.wnhri.org` if Vercel prompts for it.
5. Vercel will show the DNS records it needs.
6. In Cloudflare, open `wnhri.org` -> `DNS` -> `Records`.
7. Add or update the website records:
   - Apex/root domain: add the `A` record Vercel shows for `@`. Vercel commonly uses `76.76.21.21`, but use the exact value shown in your Vercel dashboard.
   - `www`: add the `CNAME` record Vercel shows. Vercel commonly uses `cname.vercel-dns.com`, but use the exact value shown in your Vercel dashboard.
8. Set the Vercel website records to `DNS only` in Cloudflare while Vercel verifies the domain.
9. Do not delete Cloudflare Email Routing records. Keep the `MX`, `TXT` SPF, and `TXT` DKIM records that Cloudflare created for email.
10. If Cloudflare says a record already exists for `@` or `www`, replace only the old website `A`, `AAAA`, or `CNAME` record. Do not touch mail records.
11. Wait 5-15 minutes, then return to Vercel and click verify/refresh. DNS can sometimes take up to 24 hours.

After DNS is active, make sure these URLs work:

- `https://wnhri.org/`
- `https://wnhri.org/sitemap.xml`
- `https://wnhri.org/robots.txt`
- `https://wnhri.org/donate.html`

### Cloudflare Email Routing

Keep Cloudflare Email Routing enabled for `info@wnhri.org`.

- Cloudflare should have `MX` records for the root domain.
- Cloudflare should have a `TXT` SPF record that includes `_spf.mx.cloudflare.net`.
- Cloudflare should have a DKIM `TXT` record.
- If another SPF record already exists, merge the SPF values into one TXT record. Do not create two separate SPF records.
- Create or confirm the route from `info@wnhri.org` to the owner's destination inbox.

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
- Separate pages for About, Programs, Donate, Gallery, and Contact

For best results, keep the domain active, share the website link publicly, add it to official social profiles, and keep content consistent with the full organization name: West Nile Hope & Resilience Initiative.

## 6. Mobile Check

Before announcing the site, check these pages on a phone:

- Home
- About
- Programs
- Donate
- Gallery
- Contact
