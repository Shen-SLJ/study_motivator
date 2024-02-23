"use client";

import Image from "next/image";
import { Task } from "@/app/api/tasks/route";
import { useEffect, useState } from "react";

/**
 * Task table. Table frows to fill remaining available space of container.
 */
export default function TaskTable() {
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [search, setSearch] = useState<string>("");
  const filteredTasks: Array<Task> = [];

  const fetchTasks = async () => {
    const tasksResponse = await fetch("api/tasks");
    tasksResponse.json().then((tasks) => {
      setTasks(tasks);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Search: Filter tasks to render according to search input
  tasks.forEach((task) => {
    if (task.description.toLowerCase().search(`${search.toLowerCase()}`) !== -1) {
      filteredTasks.push(task);
    }
  });

  return (
    <div className="flex flex-col h-full">
      {/* SEARCH BAR */}
      <input
        className="px-5 py-2 mb-5 rounded-lg bg-[#2D3662] text-[#FFD0EC] text-sm placeholder:text-[#FFD0EC] placeholder:text-[15px] focus:placeholder:text-transparent caret-white w-4/12 min-w-52"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {/* TABLE */}
      <div className="h-full px-5 pt-4 bg-[#2D3662] rounded-lg">
        {/* Table Headers */}
        <div className="flex text-white text-sm mb-2">
          <span className="basis-6/12">Description</span>
          <span className="basis-2/12">Group</span>
          <span className="basis-2/12">Earn</span>
          <span className="basis-2/12">Go</span>
        </div>

        <hr className="border-[#81689D] mb-3" />

        {/* Table Content */}
        <div className="text-[#D6C5E8] text-sm">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {filteredTasks.map((task, i) => (
                <>
                  {i !== 0 && <hr className="border-[#3C477D] mb-3" />}
                  <div key={task.id} className="flex items-center mb-3">
                    <span className="basis-6/12">{task.description}</span>
                    <span className="basis-2/12">{task.category}</span>
                    <span className="basis-2/12">{task.earn}</span>
                    <span className="basis-2/12 pl-0.5">
                      <Image src="/tasktable-go.png" width="14" height="17" alt="Resume task" />
                    </span>
                  </div>
                </>
              ))}
            </>
          )}
        </div>

        {/* New Task */}
      </div>
    </div>
  );
}

// Self Notes
// We need flex flex-col for top div, otherwise table h-full will cause table overshoot at bottom of page
// due to not accounting for search bar height (h-full uses 100% of parent div's height value as px)
