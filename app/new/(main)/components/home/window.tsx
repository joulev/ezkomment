import { HomeWindowProps } from "~/types/client/components.type";

export default function Window({ title, children }: HomeWindowProps) {
  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-900 flex flex-col rounded border divide-y border-card divide-card">
      <div className="relative">
        {title ? (
          <div className="w-fit mx-auto text-sm text-muted py-1.5">{title}</div>
        ) : (
          <div className="h-8" />
        )}
        <div className="absolute inset-y-0 left-3 flex flex-row gap-2 items-center">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <svg className="w-3 h-3 fill-neutral-300 dark:fill-neutral-700" key={i}>
                <circle cx="50%" cy="50%" r="50%" />
              </svg>
            ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
