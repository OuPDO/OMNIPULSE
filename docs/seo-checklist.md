# OMNIPULSE — SEO-Checkliste

## Technisches SEO

- [ ] `sitemap.ts` generiert und aktuell
- [ ] `robots.ts` korrekt konfiguriert
- [ ] Metadata API für alle öffentlichen Seiten
- [ ] Canonical URLs gesetzt
- [ ] hreflang für de-DE/de-AT/de-CH (via `next-intl`)
- [ ] JSON-LD Structured Data (via `next-seo`)
- [ ] Open Graph + Twitter Cards

## Performance (Core Web Vitals)

- [ ] LCP < 2,5s (SSG, priority-Bilder, Font-Preloading)
- [ ] INP < 200ms (RSC, `useTransition`, Code-Splitting)
- [ ] CLS < 0,1 (explizite Bildgrößen, `next/font`, Skeletons)

## Rendering-Strategien

- Landing Pages: SSG
- Blog/Content: ISR (60–300s)
- SaaS-Dashboard: CSR (hinter Auth)
- Funnel-Einstieg: SSG
- Funnel-Schritte: CSR + `noindex`

## Deutscher Markt

- [ ] `locale: 'de_DE'`
- [ ] Analytics erst nach Cookie-Consent
- [ ] Impressum + Datenschutz als SSG
