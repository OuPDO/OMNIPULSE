import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der ObladenMedia GmbH.",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
        Impressum
      </h1>
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>
          Angaben gem&auml;&szlig; &sect; 5 TMG werden hier erg&auml;nzt.
        </p>
        <p>
          <strong className="text-foreground">ObladenMedia</strong>
          <br />
          Adresse folgt
          <br />
          E-Mail: info@obladen.media
        </p>
      </div>
    </main>
  );
}
