export const images = {
  hero: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2400&q=80",
  family: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
  couples: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80",
  groups: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
  mountain: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1000&q=80",
  solo: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80",
  kathmandu: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1200&q=80",
  forest: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  monastery: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
  stars: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1800&q=80",
  guide: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1400&q=80",
  lake: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
  ridge: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80",
  detailHero: "https://images.unsplash.com/photo-1486911278844-a81c5267e227?auto=format&fit=crop&w=2200&q=80",
  prayerFlags: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=1400&q=80"
};

export const treks = [
  {
    title: "Everest Base Camp",
    slug: "/signature-treks/everest-base-camp",
    days: "15 days",
    price: "From USD $3,950",
    season: "Mar-May, Oct-Nov",
    image: images.mountain,
    summary: "A measured route to Base Camp with extra acclimatization, private guide support, and contingency days held in Kathmandu."
  },
  {
    title: "Annapurna Sanctuary",
    slug: "/signature-treks",
    days: "12 days",
    price: "From USD $2,850",
    season: "Mar-May, Sep-Nov",
    image: images.forest,
    summary: "Forest, terrace, and amphitheater views with lodge stays chosen for warmth, food hygiene, and pacing."
  },
  {
    title: "Upper Mustang",
    slug: "/signature-treks",
    days: "13 days",
    price: "From USD $4,400",
    season: "Apr-Oct",
    image: images.monastery,
    summary: "High desert valleys, walled villages, and Tibetan Buddhist culture with permits handled before arrival."
  }
];

export const days = [
  ["Day 1-2", "Kathmandu arrival, gear check, permit review, and a private briefing with your lead guide."],
  ["Day 3-5", "Fly to Lukla, walk through Phakding and Namche, then pause for acclimatization and local context."],
  ["Day 6-9", "Move steadily through Tengboche, Dingboche, and Lobuche with conservative altitude pacing."],
  ["Day 10-11", "Reach Base Camp and Kala Patthar when conditions allow, then descend to Pheriche."],
  ["Day 12-15", "Return through Namche, fly to Kathmandu, and keep one contingency day for mountain weather."]
];
