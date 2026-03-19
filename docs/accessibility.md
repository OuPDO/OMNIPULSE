# OMNIPULSE — Barrierefreiheit (BFSG / WCAG 2.1 AA)

> BFSG seit 28.06.2025 durchsetzbar. Bis 100.000 € Strafe + Abmahnrisiko.

## Testing-Pipeline

1. **ESLint** (`jsx-a11y` als Error) — Beim Coden
2. **Storybook** (`addon-a11y`) — Komponenten-Entwicklung
3. **Jest** (`jest-axe`) + **Playwright** (`axe-core`) — Unit/E2E
4. **Pa11y CI** — Produktions-Scans
5. **Manuell** — NVDA, VoiceOver, TalkBack

## Mindest-Anforderungen

- Kontrast: 4,5:1 (Text), 3:1 (UI-Elemente)
- Keyboard-Navigation: Alle interaktiven Elemente erreichbar
- Screen Reader: Semantisches HTML, ARIA wo nötig
- Fokus-Management: Sichtbarer Fokus-Indikator, korrekte Tab-Reihenfolge
- Bilder: Alt-Texte, dekorative Bilder mit `alt=""`
- Formulare: Labels, Fehlermeldungen, Pflichtfeld-Kennzeichnung

## shadcn/ui + Radix

Radix UI Primitives bringen WAI-ARIA-Patterns mit. Trotzdem prüfen:
- Farb-Kontraste (TweakCN hat eingebaute Checks)
- Custom-Komponenten brauchen eigene ARIA-Attribute
