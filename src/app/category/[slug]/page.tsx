import { redirect, notFound } from "next/navigation";
import { CATALOG_TIERS, findTierForCategory } from "@/lib/catalog";

export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  for (const tier of CATALOG_TIERS) {
    for (const cat of tier.categories) {
      params.push({ slug: cat.slug });
    }
  }
  return params;
}

export default async function LegacyCategoryRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tier = findTierForCategory(slug);

  if (tier) {
    const cat = tier.categories.find(
      (c) =>
        c.slug.toLowerCase() === slug.toLowerCase() ||
        c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug.toLowerCase()
    );
    if (cat) {
      redirect(`/collections/${tier.slug}/${cat.slug}`);
    }
    redirect(`/collections/${tier.slug}`);
  }

  // Fallback to collections
  redirect("/collections");
}
