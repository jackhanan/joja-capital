interface PlaceholderImageProps {
  src?: string;
  alt: string;
  className?: string;
  label?: string;
}

export default function PlaceholderImage({
  src,
  alt,
  className = "",
  label = "Image Placeholder",
}: PlaceholderImageProps) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} />;
  }

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 ${className}`}
    >
      <span className="text-slate-400 text-xs uppercase tracking-widest text-center px-4">
        {label}
      </span>
    </div>
  );
}
