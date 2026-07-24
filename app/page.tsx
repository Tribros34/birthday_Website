import { ExperiencePage } from "@/components/experience-page";
import { getSiteConfig } from "@/lib/config";
import { getAssets } from "@/lib/assets";

export default async function Home() {
  const [config, assets] = await Promise.all([getSiteConfig(), getAssets()]);

  return <ExperiencePage config={config} assets={assets} />;
}
