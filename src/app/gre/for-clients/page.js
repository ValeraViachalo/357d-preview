export const dynamic = 'force-dynamic'

import ForClients from "@/components/ForClients/ForClients";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_FOR_CLIENTS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";

export const generateMetadata = async () => generatePagesMetadata(URL_FOR_CLIENTS, "gre");

export default async function page() {
  const preparedData = await getFetchData(URL_FOR_CLIENTS);
  const data = useLanguageContent(preparedData, "gre");
  
  return (
    <ForClients data={data} />
  );
}