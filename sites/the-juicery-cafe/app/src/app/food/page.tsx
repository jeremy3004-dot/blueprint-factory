import type { Metadata } from "next";
import Image from "next/image";
import { EditorialIntro, FramedImage, ImageStory, InnerHero, InquiryBand } from "../../components/page-sections";
import { facts, menuHighlights } from "../../data/site";

export const metadata: Metadata = {
  title: "Food & drink",
  description: "Cold-pressed juices, smoothies, vegan bowls, brunch, and cleansing programmes in Pokhara.",
};

export default function FoodPage() {
  return (
    <>
      <InnerHero
        eyebrow="Food & drink"
        title="Brunch without borders."
        lede="Cold-pressed, blended, baked, and plated around the season."
        image="/images/juicery/food-wide.jpg"
        imageAlt="A colorful open sandwich served at The Juicery Cafe"
        imagePosition="center 55%"
      />
      <EditorialIntro label="The menu" title="Fresh food, made to feel good.">
        <p>{facts.food}</p>
        <p>{facts.menuRange}</p>
        <p>{facts.dietary}</p>
        <p>Specials change with the season, so the best menu is the one on the board when you arrive.</p>
      </EditorialIntro>

      <section className="menu-glimpse">
        <div className="menu-glimpse-heading" data-reveal>
          <p className="section-label">From the current listing</p>
          <h2>A glimpse, not a fixed menu.</h2>
          <p>Prices and full availability need a fresh cafe-supplied menu before publication.</p>
        </div>
        <div className="menu-glimpse-list">
          {menuHighlights.map((item, index) => (
            <div key={item.name} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.name}</strong>
              <em>{item.note}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="food-gallery pattern-field">
        <FramedImage src="/images/juicery/bowl-tall.jpg" alt="Freshly baked bread from The Juicery Cafe" />
        <div className="food-gallery-stack">
          <div className="stack-image stack-image-a" data-reveal>
            <Image
              src="/images/juicery/cafe-portrait.jpg"
              alt="Two bottled smoothies at The Juicery Cafe"
              fill
              sizes="(max-width: 760px) 82vw, 34vw"
            />
          </div>
          <div className="stack-image stack-image-b" data-reveal>
            <Image
              src="/images/juicery/food-tall.jpg"
              alt="A layered fruit smoothie served at The Juicery Cafe"
              fill
              sizes="(max-width: 760px) 62vw, 24vw"
            />
          </div>
        </div>
      </section>

      <ImageStory
        image="/images/juicery/brunch-wide.jpg"
        imageAlt="A Juicery Cafe team member holding fresh herbs"
        label="From farm to table"
        title="Produce leads. The plate follows."
        reverse
      >
        <p>
          The cafe describes its menu as farm-to-table: inventive brunch and drinks guided by what is fresh and
          in season.
        </p>
      </ImageStory>

      <InquiryBand label="Three-day programme" title="Juice detox & cleansing">
        <p>{facts.cleansing}</p>
        <p>Contact the cafe for current availability, inclusions, and guidance before making plans.</p>
      </InquiryBand>
    </>
  );
}
