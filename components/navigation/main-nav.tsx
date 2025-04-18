"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Book, List, AlignJustify, Github, Menu, X, BookOpen, BookText, ScrollText } from "lucide-react";

// Navigation routes grouped by category
const navGroups = {
  kanji: {
    name: "Kanji",
    path: "/kanji-list",
    icon: <Book className="h-4 w-4 mr-2" />,
    items: [], // Direct link, no dropdown
  },
  quiz: {
    name: "Quiz",
    icon: <ScrollText className="h-4 w-4 mr-2" />,
    items: [
      {
        name: "Kanji Quiz",
        path: "/",
        icon: <BookText className="h-4 w-4 mr-2" />,
      },
      {
        name: "Kana Quiz",
        path: "/kana-quiz",
        icon: <AlignJustify className="h-4 w-4 mr-2" />,
      },
      {
        name: "Vocab Quiz",
        path: "/vocab-quiz",
        icon: <List className="h-4 w-4 mr-2" />,
      },
    ],
  },
  kana: {
    name: "Kana",
    path: "/kana-reference",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
    items: [], // Direct link, no dropdown
  },
  vocab: {
    name: "Vocab",
    path: "/vocab-list",
    icon: <List className="h-4 w-4 mr-2" />,
    items: [], // Direct link, no dropdown
  },
};

export function MainNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown && dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const isGroupActive = (group: typeof navGroups.quiz) => {
    if (group.path && pathname === group.path) return true;
    return group.items?.some(item => pathname === item.path);
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              漢字 Kanjiverse
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-1">
          {/* Group navigation items */}
          {Object.entries(navGroups).map(([key, group]) => (
            <div
              key={key}
              className="relative"
              ref={el => (dropdownRefs.current[key] = el)}
            >
              {group.items && group.items.length > 0 ? (
                /* Groups with dropdown */
                <>
                  <button
                    onClick={() => toggleDropdown(key)}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isGroupActive(group)
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {group.icon}
                    {group.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn("ml-1 transition-transform", openDropdown === key ? "rotate-180" : "rotate-0")}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {openDropdown === key && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50">
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          href={item.path}
                          className={cn(
                            "block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100",
                            isActive(item.path) && "bg-slate-100 font-medium"
                          )}
                          onClick={() => setOpenDropdown(null)}
                        >
                          <div className="flex items-center">
                            {item.icon}
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                /* Direct links without dropdown */
                <Link
                  href={group.path || "#"}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(group.path || "")
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {group.icon}
                  {group.name}
                </Link>
              )}
            </div>
          ))}

          {/* GitHub link remains separate */}
          <Link
            href="https://github.com/insomnius/kanjiverse"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <Button
            variant="ghost"
            className="p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute w-full bg-white border-b shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {Object.entries(navGroups).map(([key, group]) => (
              <div key={key} className="space-y-1">
                {group.items && group.items.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(key)}
                      className={cn(
                        "flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isGroupActive(group)
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      )}
                    >
                      {group.icon}
                      {group.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={cn("ml-auto transition-transform", openDropdown === key ? "rotate-180" : "rotate-0")}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {openDropdown === key && (
                      <div className="pl-4 space-y-1 mt-1">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                              isActive(item.path)
                                ? "bg-slate-100 text-slate-900"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            )}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={group.path || "#"}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(group.path || "")
                        ? "bg-slate-100 text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {group.icon}
                    {group.name}
                  </Link>
                )}
              </div>
            ))}

            {/* GitHub link */}
            <Link
              href="https://github.com/insomnius/kanjiverse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}