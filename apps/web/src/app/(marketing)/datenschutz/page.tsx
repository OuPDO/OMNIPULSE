import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der ObladenMedia GmbH.",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">
        Datenschutzerkl&auml;rung
      </h1>
      <div className="mt-8 space-y-4 text-muted-foreground">
        <p>
          Die vollst&auml;ndige Datenschutzerkl&auml;rung gem&auml;&szlig;
          DSGVO wird hier erg&auml;nzt.
        </p>
        <p>
          <strong className="text-foreground">Verantwortlicher:</strong>
          <br />
          ObladenMedia
          <br />
          E-Mail: datenschutz@obladen.media
        </p>
      </div>
    </main>
  );
}
