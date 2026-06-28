import { companyProfile } from "@/data/company";

export function ConciergeAvatarIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/ask-pemba-avatar.jpg"
      alt={`Portrait icon for the ${companyProfile.shortName} trip desk`}
      className="h-full w-full object-cover"
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
}
