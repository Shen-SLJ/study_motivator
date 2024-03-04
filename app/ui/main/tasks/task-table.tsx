"use client";

import Image from "next/image";
import { Task } from "@/app/api/tasks/route";
import { HTMLInputTypeAttribute, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { editTaskTableEntry } from "@/app/(main)/tasks/actions";

export type TaskTableHeader = "description" | "group" | "earn"

/**
 * Task table. Table frows to fill remaining available space of container.
 * @todo Edit filteredTasks on task table entry edit
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
                      <TaskTableEntry content={task.description} id={task.id} column="description" />
                    </div>
                    <div className="basis-2/12">
                      <TaskTableEntry content={task.category} id={task.id} column="group" />
                    </div>
                    <div className="basis-2/12">
                      <TaskTableEntry content={task.earn} id={task.id} column="earn" type="number" />
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
 */
function TaskTableEntry({ content, id, column, type }: { content: string | number; id: string, column: TaskTableHeader, type?: HTMLInputTypeAttribute }) {
  const [editing, setEditing] = useState(false);
  const [displayed, setDisplayed] = useState(content);
  const inputElement = useRef<HTMLInputElement>(null);

  const editEntryWithID = editTaskTableEntry.bind(null, id, column);

  // Clicking outside the element will return it to default display mode
  function handleDocumentClick(e: MouseEvent) {
    if (inputElement.current && !inputElement.current.contains(e.target as Node)) {
      setEditing(false)
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    }
  });

  if (editing) {
    return (
      <form action={editEntryWithID} onSubmit={() => setEditing(false)}>
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


// Self Notes
// We need flex flex-col for top div, otherwise table h-full will cause table overshoot at bottom of page
// due to not accounting for search bar height (h-full uses 100% of parent div's height value as px)

// Empty regex returns empty matches for any string at index 0

// autoFocus for input element in TaskTableEntry is React's implementation of autofocus
// https://react.dev/reference/react-dom/components/input

// Refs:
// Detect click outside: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component, https://react.dev/reference/react-dom/components/common see ref attribute, https://developer.mozilla.org/en-US/docs/Web/API/Node/contains.
// useRef is null to ensure correct type for ref attribute in common elements (components)

// Events:
// Type errors https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t

// Removing spinner in integer input
// Note: [...], where ... = CSS selector. & = this element
// https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants.
// https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties
// https://stackoverflow.com/questions/73666015/nested-brackets-and-ampersand-usage-in-tailwind-ui-examples 
// https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp
// https://stackoverflow.com/questions/75879418/how-to-remove-arrows-in-input-type-number-inside-the-input 
// https://stackoverflow.com/questions/71296535/how-to-remove-arrow-on-input-type-number-with-tailwind-css