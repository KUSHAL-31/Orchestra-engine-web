type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  body: string;
  align?: 'left' | 'center';
};

export function SectionHeader({ eyebrow, title, body, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="h2 mt-3">{title}</h2>
      <p className="lead mt-4">{body}</p>
    </div>
  );
}
