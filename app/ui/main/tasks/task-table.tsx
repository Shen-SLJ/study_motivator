"use client";

import Image from "next/image";
import { Task } from "@/app/api/tasks/route";
import { Dispatch, HTMLInputTypeAttribute, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { editTaskTableDBEntry } from "@/app/(main)/tasks/actions";

export type TaskTableHeader = "description" | "group" | "earn";

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
        className="px-5 py-2.5 mb-5 rounded-lg bg-[#2D3662] text-[#FFD0EC] text-sm placeholder:text-[#FFD0EC] placeholder:text-[15px] focus:placeholder:text-transparent caret-white w-4/12 min-w-52"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />

      {/* TABLE */}
      <div className="relative h-full px-5 pt-4 bg-[#2D3662] rounded-lg">
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
                    <div className="basis-6/12">
                      <TaskTableEntry content={task.description} id={task.id} column="description" tasks={tasks} setTasks={setTasks} />
                    </div>
                    <div className="basis-2/12">
                      <TaskTableEntry content={task.category} id={task.id} column="group" tasks={tasks} setTasks={setTasks} />
                    </div>
                    <div className="basis-2/12">
                      <TaskTableEntry content={String(task.earn)} id={task.id} column="earn" type="number" tasks={tasks} setTasks={setTasks} />
                    </div>
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
        <Link href="#" className="absolute bottom-6 right-6 p-3 rounded-lg bg-[#FFD0EC] text-[#81689D] text-sm">
          + New Task
        </Link>
      </div>
    </div>
  );
}

/**
 * An entry in the task table. Can be clicked on to edit contents.
 *
 * @param content the content that should be displayed by the entry
 * @param id the id for the entry
 * @param column the column the entry is associated with
 * @param type the type of input when editing. default is text
 * @param tasks the unfiltered list of tasks presented in the table
 * @param setTasks setter in TaskTable to set the tasks state
 */
function TaskTableEntry({
  content,
  id,
  column,
  type,
  tasks,
  setTasks,
}: {
  content: string;
  id: string;
  column: TaskTableHeader;
  type?: HTMLInputTypeAttribute;
  tasks: Array<Task>;
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) {
  const [editing, setEditing] = useState(false);
  const [displayed, setDisplayed] = useState(content);
  const inputElement = useRef<HTMLInputElement>(null);

  const editDBEntryWithID = editTaskTableDBEntry.bind(null, id, column);

  // Clicking outside the element will return it to default display mode
  function handleDocumentClick(e: MouseEvent) {
    if (inputElement.current && !inputElement.current.contains(e.target as Node)) {
      setEditing(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  });

  // Update the task contents for the parent task table on edit (for search purposes)
  function updateOnEdit() {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        switch (column) {
          case "description":
            return { ...task, description: displayed };
          case "earn":
            if (!isNumberParsable(displayed)) {
              throw new TypeError("New value for table column 'earn' must be a number parsable string.");
            }
            return { ...task, e: Number(displayed) };
          case "group":
            return { ...task, category: displayed };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
    setEditing(false);
  }

  if (editing) {
    return (
      <form action={editDBEntryWithID} onSubmit={updateOnEdit}>
        <input
          className="caret-white bg-transparent rounded-lg [&::-webkit-inner-spin-button]:appearance-none"
          name="entryText"
          value={displayed}
          onChange={(e) => setDisplayed(e.target.value)}
          ref={inputElement}
          type={type}
          autoFocus
        />
      </form>
    );
  }
  return (
    <button className="relative right-1 px-1 hover:bg-[#525A86] rounded-lg" onClick={() => setEditing(true)}>
      {displayed}
    </button>
  );
}
