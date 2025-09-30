interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
}

export default function WebPageSchema({ name, description, url }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LeanUp",
      "url": "https://leanup.kr"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}