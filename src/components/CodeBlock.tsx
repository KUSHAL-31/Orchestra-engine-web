type CodeBlockProps = {
  code: string;
  label?: string;
  language?: 'typescript' | 'bash' | 'json' | 'text';
  panel?: boolean;
};

const keywordPattern =
  /^(await|async|const|let|var|return|import|from|export|function|new|class|type|interface|if|else|throw|try|catch|process|true|false|null|undefined)$/;

function tokenClass(token: string, nextChar: string, previousChar: string): string {
  if (token.startsWith('//')) return 'text-[#6a9955]';
  if (/^['"`]/.test(token)) return previousChar === ':' ? 'text-[#ce9178]' : 'text-[#ce9178]';
  if (/^\d/.test(token)) return 'text-[#b5cea8]';
  if (keywordPattern.test(token)) return 'text-[#569cd6]';
  if (nextChar === '(') return 'text-[#dcdcaa]';
  if (previousChar === '.' || token.startsWith('.')) return 'text-[#9cdcfe]';
  if (/^[{}()[\],.:;]+$/.test(token)) return 'text-[#d4d4d4]';
  if (/^[A-Z][A-Za-z0-9_]*$/.test(token)) return 'text-[#4ec9b0]';
  return 'text-[#c8d2dc]';
}

function highlightLine(line: string) {
  const parts = line.match(/\/\/.*|`(?:\\.|[^`])*`|"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\b[A-Za-z_$][\w$]*\b|\b\d+(?:\.\d+)?\b|[{}()[\],.:;]|\s+|./g) ?? [];

  return parts.map((part, index) => {
    if (/^\s+$/.test(part)) return part;
    const next = parts.slice(index + 1).find((item) => !/^\s+$/.test(item)) ?? '';
    const previous = [...parts.slice(0, index)].reverse().find((item) => !/^\s+$/.test(item)) ?? '';
    return (
      <span key={`${part}-${index}`} className={tokenClass(part, next, previous)}>
        {part}
      </span>
    );
  });
}

export function CodeBlock({ code, label, language = 'typescript', panel = false }: CodeBlockProps) {
  const langLabel = language === 'typescript' ? 'TypeScript' : language === 'bash' ? 'Shell' : language.toUpperCase();

  return (
    <div className={['overflow-hidden rounded-lg border border-[#1f2937] bg-[#0d1117] shadow-soft', panel ? 'h-full' : ''].join(' ')}>
      {label ? (
        <div className="flex items-center justify-between border-b border-[#263244] bg-[#111827] px-4 py-2">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#c8d2dc]">
            {label}
          </span>
          <span className="text-xs text-[#768390]">{langLabel}</span>
        </div>
      ) : null}
      <pre className={[panel ? 'h-[430px]' : 'max-h-[520px]', 'overflow-auto p-4 text-sm leading-6'].join(' ')}>
        <code>
          {code.split('\n').map((line, index) => (
            <span key={index} className="block min-h-6">
              <span className="mr-4 inline-block w-7 select-none text-right text-[#53606d]">
                {index + 1}
              </span>
              {highlightLine(line)}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
