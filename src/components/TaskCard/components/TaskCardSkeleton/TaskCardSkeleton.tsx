export function TaskCardSkeleton() {
  return (
    <article className="cursor-grab rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow mt-3">
      <div className="flex justify-between items-start min-h-[24px]">
        <div className="h-4 w-3/4 rounded bg-gray-200 mb-3"></div>
      </div>

      <div className="mt-1 line-clamp-2 text-slate-600">
        <div className="h-3 w-full rounded bg-gray-200"></div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="h-3 w-16 rounded bg-gray-200"></div>
        <div className="h-3 w-12 rounded bg-gray-200"></div>
      </div>
    </article>
  );
}

export default TaskCardSkeleton;
