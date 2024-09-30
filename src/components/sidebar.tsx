"use client";

import { Car, MapPinned, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MotoraLogo from "../assets/motora.png";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useTheme } from "@/hooks/use-theme";
import { NewTooltip } from "./tooltip";

const sidebarItems = [
  { label: "Map", icon: MapPinned, path: "/map", active: false },
  { label: "Vehicles", icon: Car, path: "/vehicles", active: false },
];

export function Sidebar() {
  const { toggleTheme, theme } = useTheme();
  const navigation = usePathname();

  sidebarItems.forEach((item) => {
    item.active = navigation === item.path;
  });

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 dark:bg-muted/60 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center justify-between px-4 lg:h-[60px] lg:px-6 dark:border-gray-700">
            <Link href="#" className="flex items-center gap-2 font-semibold">
              <Image src={MotoraLogo} alt="Motora Logo" className="w-10 h-10" />
            </Link>
            <NewTooltip
              content={
                theme === "light"
                  ? "Switch to dark theme"
                  : "Switch to light mode"
              }
            >
              <Button onClick={toggleTheme} size="icon" variant="ghost">
                {theme === "light" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </Button>
            </NewTooltip>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 gap-2 text-sm font-medium lg:px-4">
              {sidebarItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:rounded-md hover:bg-muted/40 dark:hover:bg-muted/80" +
                    (item.active &&
                      " text-primary bg-muted/80 dark:bg-muted/80")
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
