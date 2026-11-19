import { redirect } from "next/navigation";
import { CATALOG_TIERS, findHierarchyForCategory } from "@/lib/catalog";

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
  const res = findHierarchyForCategory(slug);

  if (res.mainCollection && res.subcategory && res.productCategory) {
    redirect(
      `/collections/${res.mainCollection.slug}/${res.subcategory.slug}/${res.productCategory.slug}`
    );
  }
  if (res.mainCollection && res.subcategory) {
    redirect(`/collections/${res.mainCollection.slug}/${res.subcategory.slug}`);
  }
  if (res.mainCollection) {
    redirect(`/collections/${res.mainCollection.slug}`);
  }

  // Fallback to collections
  redirect("/collections");
}
