export async function generatePagesMetadata(endpoint) {
  const preparedData = await fetch(endpoint, {
    next: { revalidate: 120 },
  }).then((response) => response.json());

  const data = preparedData.seo

  return {
    title: data.documentTitle,
    keywords: data.documentKeywords,
    description: data.documentDescription,
    openGraph: {
      title: data.documentTitle,
      keywords: data.documentKeywords,
      description: data.documentDescription,
      url: "",
      images: [
        {
          url: data.documentImage,
          width: 720,
          height: 405,
          alt: "OpenGraph",
        },
      ],
    },
  };
}