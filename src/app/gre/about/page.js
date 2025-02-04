export const dynamic = 'force-dynamic'

import AboutPage from "@/components/AboutPage/AboutPage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_ABOUT } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";

export const generateMetadata = async () => generatePagesMetadata(URL_ABOUT);

export default async function Home() {
  const preparedData = await getFetchData(URL_ABOUT);
  const data = useLanguageContent(preparedData, "en");
  
  return (
    <AboutPage data={data}/>
  );
}