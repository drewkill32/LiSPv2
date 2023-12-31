import { useState, useEffect } from "react";

export interface NavMenuProps {
  title: string;
  menuItems: {
    name: string;
    link: string;
  }[];
}

export default function NavMenu({ title, menuItems }: NavMenuProps) {
  const [open, setOpen] = useState(false);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Esc" || e.key === "Escape") {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <div
        className="relative z-20"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <span
          aria-haspopup="true"
          aria-expanded={open}
          onFocus={() => setOpen(true)}
          className=" relative flex gap-1"
        >
          {title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>

        {open && (
          <>
            <div className="absolute h-4 w-full" />
            <div
              role="menu"
              onMouseLeave={() => setOpen(false)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  setOpen(false);
                }
              }}
              className={`absolute text-primary border bg-white border-gray-300 shadow-md right-0 flex flex-col mt-2 py-2 w-48 rounded-lg `}
            >
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  role="menuitem"
                  href={item.link}
                  className="px-4 hover:bg-primary hover:text-white py-3 focus:bg-primary focus:text-white"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
      {open && (
        <button
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed h-full w-full inset-0 cursor-default"
        ></button>
      )}
    </>
  );
}
