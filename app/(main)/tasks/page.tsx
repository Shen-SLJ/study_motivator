import TaskTable from "@/app/ui/main/tasks/task-table";

export default function Tasks() {
  return (
    <div className="flex flex-col h-full pt-4 pb-6 pr-6">
      <h1 className="text-white text-4xl font-semibold mb-1">Tasks</h1>
      <p className="text-[#D6C5E8] text-sm mb-8">Add and see remaining tasks</p>
      <div className="grow">
        <TaskTable />
      </div>
    </div>
  );
}