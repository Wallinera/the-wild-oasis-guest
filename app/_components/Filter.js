"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") || "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        active={activeFilter === "all"}
        onClick={() => handleFilter("all")}
      >
        All cabins
      </Button>
      <Button
        active={activeFilter === "small"}
        onClick={() => handleFilter("small")}
      >
        Small cabins (1-3 guests)
      </Button>
      <Button
        active={activeFilter === "medium"}
        onClick={() => handleFilter("medium")}
      >
        Medium cabins (4-7 guests)
      </Button>
      <Button
        active={activeFilter === "large"}
        onClick={() => handleFilter("large")}
      >
        Large cabins (8+ guests)
      </Button>
    </div>
  );
}

function Button({ children, onClick, active }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 cursor-pointer ${active ? "bg-primary-600" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Filter;
