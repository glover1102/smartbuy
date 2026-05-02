interface StoreBadgeProps {
  store: string;
}

const storeConfig: Record<string, { label: string; className: string }> = {
  COSTCO: { label: "Costco", className: "bg-blue-100 text-blue-800" },
  SAMS_CLUB: { label: "Sam's Club", className: "bg-purple-100 text-purple-800" },
  BJS: { label: "BJ's", className: "bg-red-100 text-red-800" },
  OTHER: { label: "Other", className: "bg-gray-100 text-gray-700" },
};

export function StoreBadge({ store }: StoreBadgeProps) {
  const config = storeConfig[store] ?? storeConfig.OTHER;
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
