# Cakes by Ila

A lightweight, mobile-first single-page cake portfolio and inquiry website. Plain HTML, CSS, and JavaScript; no dependencies, build step, database, or server runtime.

## Preview

From this directory run `python3 -m http.server 8080`, then visit `http://localhost:8080`.

## Files

- `index.html`: page content, gallery, FAQs, and inquiry fields.
- `style.css`: responsive layout, brand palette, and typography.
- `script.js`: mobile navigation, gallery filtering, and Formspree submission states.
- `config.js`: public Formspree endpoint configuration.
- `assets/`: original SVG illustrations used as explicitly labeled temporary placeholders, plus the favicon.

The illustrations do not represent Ila’s actual work. The about introduction is marked as draft. No business address, service area, contact details, social account, pricing, or unconfirmed policy has been invented.

## Connect Formspree

Create a form in Ila’s Formspree account and verify her recipient email. Set `formspreeEndpoint` in `config.js` to the form’s endpoint, such as `https://formspree.io/f/EXAMPLEID`. This public endpoint is not a secret; never put account credentials here.

Until an endpoint is configured, the submit button remains disabled with an explicit requests-not-open message. With JavaScript disabled, submission stays disabled. Configured submissions use FormData and request a JSON response. The form includes a `_gotcha` honeypot; enable the appropriate spam protection in Formspree as well.

Successful submissions clear the form and explain that the cake is not booked. Errors retain all entered details. A 20-second timeout explains that delivery could not be confirmed. Verify receipt in Ila’s inbox and review the success, failure, and offline states before publishing. Formspree account configuration and live email delivery have not been verified in this project.

## Photography

Replace the three illustrated gallery examples with approximately 10–15 selected photographs supplied by Ila. Duplicate a `.cake-card` and set `data-category` to `wedding`, `birthday`, or `celebration`. Write factual alt text for each actual cake.

Export photos as AVIF or WebP at useful widths (for example 480, 800, and 1200 pixels), then add `srcset` and `sizes` to each image. Keep explicit dimensions, lazy loading below the fold, and eager loading for the hero. The current vector placeholders are small and resolution-independent. Replace the portrait placeholder with an approved photograph of Ila. Remove placeholder captions only after the corresponding real assets are in place.

## Before launch

- Approve the text wordmark or supply the final logo.
- Supply real cake photography, Ila’s portrait, and final about copy.
- Configure Formspree and verify delivery to Ila’s preferred email.
- Confirm flavors, budget ranges, lead time, deposit/payment and cancellation policies, pickup/service area, delivery, and dietary policy. Add only confirmed answers to the FAQ. The current FAQ covers only the request workflow described in the brief.
- Add confirmed budget ranges to the form if useful; currently a budget can be mentioned in the details field. Inspiration can be shared as a link; there is no upload dependency.
- Add verified social links and any approved public contact details.
- Set the final canonical URL, `og:url`, and an absolute `og:image` URL using an approved photograph. Add accurate local business structured data once the business details are confirmed.
- Check mobile and desktop layouts, keyboard navigation, color contrast, and actual submission states in a browser. Run a performance audit with the final photographs.

## Cloudflare Pages

Connect this GitHub repository to Cloudflare Pages, select the desired production branch, and use no framework preset or build command. Serve the repository root (`.`) as the output directory. This project is entirely static. After a successful preview deployment and content review, attach the final custom domain in Cloudflare and set its canonical/share URLs in the HTML.

No deployment has been performed by this implementation. Google Fonts provides Cormorant Garamond and Inter with swap loading; system serif/sans fallbacks remain usable if the font service is unavailable.
