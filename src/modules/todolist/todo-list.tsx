import { useQuery } from '@tanstack/react-query';
import { todoListApi } from './api';
import { useState } from 'react';

export function TodoList() {
  const [page, setPage] = useState(1);

  const { data, error, isPending } = useQuery({
    queryKey: ['tasks', 'list'],
    queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
  });

  if (isPending) {
    return <div> Loading...</div>;
  }

  if (error) {
    return <div>error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="text-3xl font-bold underline mb-5">Todo List</h1>

      <div className="flex flex-col gap-4">
        {data.map((todo) => (
          <div
            className="border border-slate-300 rounded p-3 flex justify-between"
            key={todo.id}
          >
            {todo.text}
          </div>
        ))}
      </div>

      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="p-3 rounded border border-teal-500"
      >
        prev
      </button>
      <button
        onClick={() => setPage((p) => p + 1)}
        className="p-3 rounded border border-teal-500"
      >
        next
      </button>
    </div>
  );
}
