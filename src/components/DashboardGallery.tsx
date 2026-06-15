import { dashboardImages } from '../data/features';

export function DashboardGallery() {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {dashboardImages.map((image) => (
        <figure key={image.src} className="card lift-card overflow-hidden bg-[#f3f6f8] p-3">
          <div className="overflow-hidden rounded-md border border-line bg-white">
            <img
              src={image.src}
              alt={image.title}
              className="aspect-[16/10] w-full border-b border-line object-cover object-top"
              loading="lazy"
            />
          </div>
          <figcaption className="p-5">
            <h3 className="font-semibold text-ink">{image.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{image.body}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
