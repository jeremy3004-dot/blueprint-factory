"use client";

interface CategoryFilterProps {
  labels: string[];
  active: string;
  onChange: (label: string) => void;
}

export function CategoryFilter({ labels, active, onChange }: CategoryFilterProps) {
  return (
    <div className="categoryFilter" aria-label="Filter products">
      {labels.map((label) => (
        <button key={label} type="button" aria-pressed={active === label} onClick={() => onChange(label)}>{label}</button>
      ))}
    </div>
  );
}

