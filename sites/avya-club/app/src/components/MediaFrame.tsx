import type { CSSProperties } from "react";

interface MediaFrameProps {
  readonly alt: string;
  readonly aspectRatio?: string;
  readonly className?: string;
  readonly objectPosition?: string;
  readonly src: string;
}

export function MediaFrame({
  alt,
  aspectRatio = "4 / 3",
  className = "",
  objectPosition = "center",
  src
}: MediaFrameProps) {
  const frameStyle: CSSProperties = { aspectRatio };
  const imageStyle: CSSProperties = { objectPosition };

  return (
    <figure className={`mediaFrame ${className}`.trim()} style={frameStyle}>
      <img src={src} alt={alt} style={imageStyle} />
      <span className="mediaFrameScrim" aria-hidden="true" />
    </figure>
  );
}
