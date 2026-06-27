export default function FooterNote({
  text,
  wittyTagline,
  author,
  authorUrl,
}: {
  text: string;
  wittyTagline?: string | string[];
  author?: string;
  authorUrl?: string;
}) {
  // Handle both string and array formats
  const taglineText = Array.isArray(wittyTagline) ? wittyTagline[0] : wittyTagline;

  return (
    <footer className="mt-10 text-[11.5px] text-text-muted text-center font-mono leading-relaxed">
      {taglineText && <div className="italic">{taglineText}</div>}
      <div>{text}</div>
      {author && (
        <div>
          by{" "}
          {authorUrl ? (
            <a
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors underline underline-offset-2 decoration-border"
            >
              {author}
            </a>
          ) : (
            author
          )}
        </div>
      )}
    </footer>
  );
}
