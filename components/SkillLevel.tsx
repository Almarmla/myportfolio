type SkillLevelProps = {
  name: string;
  level: number;
};

export default function SkillLevel({ name, level }: SkillLevelProps) {
  return (
    <div
      role="progressbar"
      aria-label={`${name} proficiency`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={level}
      className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800"
    >
      <div
        className="h-full origin-left rounded-full bg-emerald-500 dark:bg-emerald-400"
        style={{ width: `${level}%` }}
      />
    </div>
  );
}
