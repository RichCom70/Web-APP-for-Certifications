export interface IsoRequirement {
  id: string;          // ex : "5.2" ou "A.5.7"
  title: string;
  description: string;
  category: "clause" | "annexeA";
}
