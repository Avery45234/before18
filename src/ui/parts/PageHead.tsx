import type { ReactNode } from "react";

// The top of every inner page: title, one-line lead, and an optional action on
// the right (usually a print button). The small blue label above the title is
// added by the app shell from strings.labels, so screens do not repeat it.
//
//   <PageHead title={t.rights.title} lead={t.rights.intro} action={<Button ...>Print</Button>} />

export function PageHead({ title, lead, action }: { title: string; lead?: string; action?: ReactNode }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {action && <div className="page-head-action">{action}</div>}
    </div>
  );
}
