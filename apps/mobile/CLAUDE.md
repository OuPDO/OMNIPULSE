# CLAUDE.md — Expo Mobile App

> App-spezifische Anweisungen für `apps/mobile/`. Ergänzt die Root-CLAUDE.md.

## Stack

Expo SDK 52+ + React Native + NativeWind v4.1 + Expo Router + TypeScript strict

## Architektur

- **Expo Router** mit File-Based Routing
- **NativeWind v4.1** für Tailwind-kompatibles Styling
- **Token-Auth** über Laravel Sanctum (kein Cookie-basiert)
- **API-Client** aus `packages/api-client/` mit Token-Interceptor

## Regeln

1. **Accessibility explizit:** `accessibilityLabel`, `accessibilityRole`, `accessibilityState`
2. **Typen** → Import aus `@omnipulse/types`
3. **Styling** → NativeWind Utilities, Design Tokens aus `packages/tokens/build/ts/`
4. **Navigation** → Expo Router, nie React Navigation direkt
5. **Secure Storage** → `expo-secure-store` für Auth-Tokens
6. **Platform-specific** → `.ios.tsx` / `.android.tsx` nur wenn wirklich nötig
