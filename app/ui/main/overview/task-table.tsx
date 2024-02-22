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
  let firstTaskFound = false;

  useEffect(() => {
    const fetchTasks = async (): Promise<Array<Task>> => {
      const tasksResponse = await fetch("api/tasks");
      return tasksResponse.json();
    };
    fetchTasks().then((tasks) => {
      setTasks(tasks);
      setLoading(false);
    });
  }, []);

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
              {/* Search Logic */}
              {/* Lower case for case insensitive searching */}
              {tasks.map((task) => {
                const shouldDisplayTask = !search || task.description.toLowerCase().search(`${search.toLowerCase()}`) !== -1;
                const divider = firstTaskFound && <hr className="border-[#4A5487] mb-3" />;
                if (shouldDisplayTask) {
                  firstTaskFound = true;
                }
                return (
                  <>
                    {shouldDisplayTask && (
                      <>
                        {divider}
                        <div key={task.id} className="flex items-center mb-3">
                          <span className="basis-6/12">{task.description}</span>
                          <span className="basis-2/12">{task.category}</span>
                          <span className="basis-2/12">{task.earn}</span>
                          <span className="basis-2/12 pl-0.5">
                            <Image src="/tasktable-go.png" width="14" height="17" alt="Resume task" />
                          </span>
                        </div>
                      </>
                    )}
                  </>
                );
              })}
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// Self Notes
// We need flex flex-col for top div, otherwise table h-full will cause table overshoot at bottom of page
// due to not accounting for search bar height (h-full uses 100% of parent div's height value as px)
