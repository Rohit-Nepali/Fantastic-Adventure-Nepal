export type TravelStyle = {
  label: string;
  href: string;
  teaser: string;
  image: string;
};

export const travelStyles: TravelStyle[] = [
  {
    label: "Wellness Retreat",
    href: "/wellness",
    teaser: "Mindful stays, healing routines, and mountain calm.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=85",
  },
  {
    label: "Cultural Tour",
    href: "/culture-tour",
    teaser: "Heritage squares, artisan lanes, and local rituals.",
    image:
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=85",
  },
  {
    label: "Trekking the Trails",
    href: "/trekking",
    teaser: "Legendary routes through high passes and villages.",
    image:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200&q=85",
  },
  {
    label: "Rafting on Rivers",
    href: "/rafting",
    teaser: "Whitewater runs with dramatic canyon scenery.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&q=85",
  },
  {
    label: "Festival Focus",
    href: "/festivals",
    teaser: "Celebrate color, music, and sacred community moments.",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=85",
  },
  {
    label: "Wildlife Safari",
    href: "/wildlife",
    teaser: "Jungle safaris and close encounters with rare species.",
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=1200&q=85",
  },
];