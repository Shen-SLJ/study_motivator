
/**
 * Task table. Table frows to fill remaining available space of container.
 */
export default function TaskTable() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-2 mb-5 rounded-lg text-[#FFD0EC] bg-[#2D3662] w-4/12 min-w-52">Search</div>
      <div className="h-full bg-[#2D3662] rounded-lg"></div>
    </div>
  )
}

// Self Notes
// We need flex flex-col for top div, otherwise h-full will cause table overshoot at bottom of page due to 
// not accounting for search bar height (h-full uses 100% of parent div's height value as px)