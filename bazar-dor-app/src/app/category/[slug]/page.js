import CategoryContent from "@/components/CategoryContent";

export const instant = false;

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  return <CategoryContent slug={slug} />;
}