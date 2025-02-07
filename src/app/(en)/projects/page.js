export const dynamic = 'force-dynamic'

import ProjectsPage from "@/components/ProjectsPage/ProjectsPage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_PROJECTS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";

export const generateMetadata = async () => generatePagesMetadata(URL_PROJECTS);

export default async function page() {
  const preparedData = await getFetchData(URL_PROJECTS);
  const data = useLanguageContent(preparedData, "en");
  
  return (
    <ProjectsPage data={data} />
  );
}