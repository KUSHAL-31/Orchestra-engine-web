import { useState } from 'react';
import { CodeBlock } from './CodeBlock';

type CodeTab = {
  id: string;
  label: string;
  title: string;
  body: string;
  code: string;
  language?: 'typescript' | 'bash' | 'json' | 'text';
};

export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const active = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="card overflow-hidden">
      <div className="flex gap-1 overflow-x-auto border-b border-line bg-panel p-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveId(tab.id)}
            className={[
              'whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition',
              active.id === tab.id ? 'bg-white text-ink shadow-sm' : 'text-muted hover:bg-white hover:text-ink',
            ].join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-0 lg:grid-cols-[360px_1fr]">
        <div className="min-h-[220px] border-b border-line p-6 lg:min-h-[510px] lg:border-b-0 lg:border-r">
          <p className="eyebrow">Example</p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">{active.title}</h3>
          <p className="mt-4 text-sm leading-6 text-muted">{active.body}</p>
        </div>
        <div className="min-h-[510px] min-w-0 p-4 sm:p-5">
          <CodeBlock label={active.label} code={active.code} language={active.language ?? 'typescript'} panel />
        </div>
      </div>
    </div>
  );
}
