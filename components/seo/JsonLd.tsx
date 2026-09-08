type JsonLdValue = Record<string, unknown>;

export default function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  const entries = Array.isArray(data) ? data : [data];

  return entries.map((entry, index) => (
    <script
      key={`${String(entry["@type"] || "json-ld")}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
