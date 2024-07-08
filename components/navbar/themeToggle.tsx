"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      checked={theme === "light" || theme === undefined ? false : true}
      onCheckedChange={(isChecked) => {
        isChecked ? setTheme("dark") : setTheme("light");
      }}
    />
  );
}
