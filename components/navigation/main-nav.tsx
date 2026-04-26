"use client";

import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, List, AlignJustify, Github, Menu, X, BookOpen, BookText, ScrollText, Pencil, User, Search } from "lucide-react";
import { StreakIndicator } from "@/components/streak-indicator";
import { ProfileLink } from "@/components/profile-link";

const navGroups = {
  kanji: {
    name: "Kanji",
    path: "/kanji-list",
    icon: <Book className="h-4 w-4 mr-2" />,
    items: [],
  },
  quiz: {
    name: "Quiz",
    icon: <ScrollText className="h-4 w-4 mr-2" />,
    items: [
      {
        name: "Kanji Quiz",
        path: "/quiz",
        icon: <BookText className="h-4 w-4 mr-2" />,
      },
      {
        name: "Kana Quiz",
        path: "/kana-quiz",
        icon: <AlignJustify className="h-4 w-4 mr-2" />,
      },
    ],
  },
  draw: {
    name: "Draw",
    icon: <Pencil className="h-4 w-4 mr-2" />,
    items: [
      {
        name: "Practice",
        path: "/draw",
        icon: <Pencil className="h-4 w-4 mr-2" />,
      },
      {
        name: "Find by drawing",
        path: "/draw-search",
        icon: <Search className="h-4 w-4 mr-2" />,
      },
    ],
  },
  reference: {
    name: "Reference",
    icon: <BookOpen className="h-4 w-4 mr-2" />,
    items: [
      {
        name: "Vocabulary",
        path: "/vocab-list",
        icon: <List className="h-4 w-4 mr-2" />,
      },
      {
        name: "Kana",
        path: "/kana-reference",
        icon: <AlignJustify className="h-4 w-4 mr-2" />,
      },
    ],
  },
};

const navItemBase =
  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors motion-reduce:transition-none outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2";
const navItemActive = "bg-cream-deep text-sumi";
const navItemIdle = "text-sumi/70 hover:bg-cream-deep/60 hover:text-sumi";

export function MainNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const toggleMobileDropdown = (key: string) => {
    setOpenMobileDropdown(openMobileDropdown === key ? null : key);
  };

  const isActive = (path: string) => pathname === path;

  const isGroupActive = (group: typeof navGroups[keyof typeof navGroups]) => {
    if ('path' in group && group.path && pathname === group.path) return true;
    return group.items?.some(item => pathname === item.path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-cream/95 backdrop-blur-sm border-b border-sumi/10 shadow-[0_1px_0_0_rgba(200,85,61,0.18)]">
      <div className="max-w-4xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link
            to="/"
            className="group flex items-baseline gap-2.5 outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2 focus-visible:rounded-sm"
            aria-label="Kanji by Insomnius — home"
            aria-current={pathname === "/" ? "page" : undefined}
          >
            <span
              lang="ja"
              aria-hidden="true"
              className="font-jp text-[1.4rem] leading-none font-semibold text-vermilion"
            >
              漢字
            </span>
            <span className="font-display text-[1.35rem] leading-none font-semibold text-sumi tracking-tight">
              Kanji
            </span>
            <span className="font-display italic text-[1.05rem] leading-none font-normal text-sumi/70 transition-colors motion-reduce:transition-none group-hover:text-vermilion-deep">
              by Insomnius
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden sm:flex items-center space-x-1">
          {Object.entries(navGroups).map(([key, group]) => (
            <div key={key} className="relative">
              {group.items && group.items.length > 0 ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    aria-label={`${group.name} menu`}
                    className={cn(
                      navItemBase,
                      isGroupActive(group) ? navItemActive : navItemIdle
                    )}
                  >
                    {group.icon}
                    {group.name}
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-1 transition-transform motion-reduce:transition-none data-[state=open]:rotate-180"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {group.items.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link
                            to={item.path as any}
                            aria-current={active ? "page" : undefined}
                            className={cn(
                              "flex items-center w-full text-sm cursor-pointer",
                              active && "bg-cream-deep font-medium"
                            )}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to={'path' in group && group.path ? (group.path as any) : undefined}
                  aria-current={'path' in group && group.path && isActive(group.path) ? "page" : undefined}
                  className={cn(
                    navItemBase,
                    'path' in group && group.path && isActive(group.path) ? navItemActive : navItemIdle
                  )}
                >
                  {group.icon}
                  {group.name}
                </Link>
              )}
            </div>
          ))}

          <span aria-hidden="true" className="mx-2 h-5 w-px bg-sumi/15" />

          <StreakIndicator />
          <ProfileLink />

          <a
            href="https://github.com/insomnius/kanjiverse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub (opens in new tab)"
            className="flex items-center justify-center w-9 h-9 rounded-md text-sumi/70 hover:text-sumi hover:bg-cream-deep/60 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermilion focus-visible:ring-offset-2"
          >
            <Github aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </a>
        </nav>

        {/* Mobile: persistent streak pill + hamburger button */}
        <div className="sm:hidden flex items-center gap-2">
          {/* Streak stays visible on mobile — engagement signal, not menu fodder */}
          <StreakIndicator />
          <Button
            variant="ghost"
            className="p-2 min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" className="h-6 w-6" />
            ) : (
              <Menu aria-hidden="true" className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu (inline disclosure pattern — popovers feel wrong on narrow viewports) */}
      {mobileMenuOpen && (
        <nav id="mobile-menu" aria-label="Primary" className="sm:hidden absolute w-full bg-cream border-b border-sumi/10 shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {Object.entries(navGroups).map(([key, group]) => {
              const panelId = `mobile-submenu-${key}`;
              const expanded = openMobileDropdown === key;
              return (
                <div key={key} className="space-y-1">
                  {group.items && group.items.length > 0 ? (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(key)}
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        className={cn(
                          navItemBase,
                          "w-full min-h-[44px]",
                          isGroupActive(group) ? navItemActive : navItemIdle
                        )}
                      >
                        {group.icon}
                        {group.name}
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn("ml-auto transition-transform motion-reduce:transition-none", expanded ? "rotate-180" : "rotate-0")}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>

                      {expanded && (
                        <div id={panelId} className="pl-4 space-y-1 mt-1">
                          {group.items.map((item) => {
                            const active = isActive(item.path);
                            return (
                              <Link
                                key={item.path}
                                to={item.path as any}
                                aria-current={active ? "page" : undefined}
                                className={cn(
                                  navItemBase,
                                  "min-h-[44px]",
                                  active ? navItemActive : navItemIdle
                                )}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item.icon}
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={'path' in group && group.path ? (group.path as any) : undefined}
                      aria-current={'path' in group && group.path && isActive(group.path) ? "page" : undefined}
                      className={cn(
                        navItemBase,
                        "min-h-[44px]",
                        'path' in group && group.path && isActive(group.path) ? navItemActive : navItemIdle
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {group.icon}
                      {group.name}
                    </Link>
                  )}
                </div>
              );
            })}

            <div role="separator" aria-hidden="true" className="my-2 h-px bg-sumi/10" />

            <Link
              to="/profile"
              aria-current={pathname === "/profile" ? "page" : undefined}
              className={cn(navItemBase, "min-h-[44px]", pathname === "/profile" ? navItemActive : navItemIdle)}
              onClick={() => setMobileMenuOpen(false)}
            >
              <User aria-hidden="true" className="h-4 w-4 mr-2" />
              Profile
            </Link>

            <a
              href="https://github.com/insomnius/kanjiverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub (opens in new tab)"
              className={cn(navItemBase, "min-h-[44px]", "text-sumi/70 hover:bg-cream-deep/60 hover:text-sumi")}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github aria-hidden="true" className="h-4 w-4 mr-2" />
              GitHub
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
