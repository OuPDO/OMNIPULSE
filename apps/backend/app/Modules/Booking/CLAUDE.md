# Booking-Modul (Terminbuchung)

## Kontext
Online-Terminbuchung für Erstgespräche und Beratungstermine. Kalender-Integration mit Google Calendar.

## Datenmodell
- BookingType → hasMany TimeSlots, hasMany Bookings
- TimeSlot → belongsTo BookingType (verfügbare Zeitfenster)
- Booking → belongsTo BookingType, belongsTo Contact

## Business Rules
- Zeitzone: Europe/Berlin als Default, Client-Timezone unterstützen
- Buffer zwischen Terminen: konfigurierbar (Default 15 Min)
- Maximale Vorausbuchung: 30 Tage
- Stornierung: bis 24h vorher kostenfrei
- Doppelbuchungen verhindern: DB-Lock auf Zeitfenster
- Bestätigungs-E-Mail + Reminder (24h + 1h vorher)

## Google Calendar Integration
- OAuth2 über Socialite
- Bidirektional: Buchung → GCal Event, GCal Block → Slot gesperrt
- Webhook für Echtzeit-Updates

## API-Endpunkte
- `GET /api/v1/booking-types` — Verfügbare Buchungsarten
- `GET /api/v1/booking-types/{id}/slots?date=` — Freie Slots
- `POST /api/v1/bookings` — Buchung erstellen
- `DELETE /api/v1/bookings/{id}` — Stornierung
