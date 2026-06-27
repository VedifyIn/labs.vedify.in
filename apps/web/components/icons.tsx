import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number; title?: string };

function s(size = 20): { width: number; height: number } {
  return { width: size, height: size };
}

export function IconSparkles(props: Props) {
  const { size = 20, title, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6" />
    </svg>
  );
}

export function IconReceipt(props: Props) {
  const { size = 20, title, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title}
      {...rest}
    >
      {title && <title>{title}</title>}
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2" />
    </svg>
  );
}

export function IconVectorTriangle(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M10 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" />
      <path d="M3 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" />
      <path d="M17 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" />
      <path d="M6.5 17.1l5 -9.1" />
      <path d="M17.5 17.1l-5 -9.1" />
      <path d="M7 19l10 0" />
    </svg>
  );
}

export function IconChartDots3(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M3 7a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M14 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M3 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M9 17l5 -1.5" />
      <path d="M6.5 8.5l7.81 5.37" />
      <path d="M7 7l8 -1" />
    </svg>
  );
}

export function IconMessage2(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M8 9h8" />
      <path d="M8 13h6" />
      <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3" />
    </svg>
  );
}

export function IconServer2(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M13.45 11.55l2.05 -2.05" />
      <path d="M6.4 20a9 9 0 1 1 11.2 0l-11.2 0" />
    </svg>
  );
}

export function IconFlask(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M3 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M14 15a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M3 18l3 -15" />
      <path d="M18 6l-1 9" />
      <path d="M6 3l3 3" />
    </svg>
  );
}

export function IconDatabase(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
    </svg>
  );
}

export function IconBraces(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M7 4a2 2 0 0 0 -2 2v3a2 3 0 0 1 -2 3a2 3 0 0 1 2 3v3a2 2 0 0 0 2 2" />
      <path d="M17 4a2 2 0 0 1 2 2v3a2 3 0 0 0 2 3a2 3 0 0 0 -2 3v3a2 2 0 0 1 -2 2" />
    </svg>
  );
}

export function IconApi(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M4 13h5" />
      <path d="M12 16v-8h3a2 2 0 0 1 2 2v1a2 2 0 0 1 -2 2h-3" />
      <path d="M20 8v8" />
      <path d="M9 16v-5.5a2.5 2.5 0 0 0 -5 0v5.5" />
    </svg>
  );
}

export function IconChecklist(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <path d="M9 9l1 1l3 -3" />
      <path d="M9 15l1 1l3 -3" />
    </svg>
  );
}

export function IconTerminal2(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

export function IconDatabaseExport(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3" />
      <path d="M4 6v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
      <path d="M4 12v6c0 1.657 3.582 3 8 3s8 -1.343 8 -3v-6" />
      <path d="M16 12h-4" />
      <path d="M14 10l-2 2l2 2" />
    </svg>
  );
}

export function IconCode(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

export function IconDashboard(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M10 13a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M13.45 11.55l2.05 -2.05" />
      <path d="M6.4 20a9 9 0 1 1 11.2 0l-11.2 0" />
    </svg>
  );
}

export function IconShieldLock(props: Props) {
  const { size = 20, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12l0 2.5" />
    </svg>
  );
}

// Fallback icon for missing icons
export function IconFallback(props: Props) {
  const { size = 20, title, ...rest } = props;
  return (
    <svg
      {...s(size)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : "presentation"}
      aria-label={title || "Unknown icon"}
      {...rest}
    >
      {title && <title>{title}</title>}
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  );
}

export const iconComponents: Record<
  string,
  React.ComponentType<SVGProps<SVGSVGElement> & { size?: number }>
> = {
  sparkles: IconSparkles,
  receipt: IconReceipt,
  "vector-triangle": IconVectorTriangle,
  "chart-dots-3": IconChartDots3,
  "message-2": IconMessage2,
  "server-2": IconServer2,
  flask: IconFlask,
  database: IconDatabase,
  braces: IconBraces,
  api: IconApi,
  checklist: IconChecklist,
  "terminal-2": IconTerminal2,
  "database-export": IconDatabaseExport,
  code: IconCode,
  dashboard: IconDashboard,
  "shield-lock": IconShieldLock,
};

// Helper function to get icon by name with fallback
export function getIcon(
  name: string
): React.ComponentType<SVGProps<SVGSVGElement> & { size?: number }> {
  const icon = iconComponents[name];
  if (!icon) {
    console.warn(`Icon "${name}" not found. Using fallback icon.`);
    return IconFallback;
  }
  return icon;
}
