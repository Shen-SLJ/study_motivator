import TaskTable from "@/app/ui/main/overview/task-table";

export default function Tasks() {
  return (
    <div className="p-6 ml-6">
      <h1 className="text-white text-4xl font-semibold mb-1">Tasks</h1>
      <p className="text-[#D6C5E8] text-sm mb-8">Add and see remaining tasks</p>
      <TaskTable />
    </div>
  );
}