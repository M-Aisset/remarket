import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import ThemeToggle from "@/components/navbar/themeToggle";
import LanguageToggle from "@/components/navbar/languageToggle";

export default function NavbarOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="flex justify-start items-center gap-3">
          Language: <LanguageToggle />
        </DropdownMenuLabel>
        <DropdownMenuLabel className="flex justify-start items-center gap-3">
          Dark mode: <ThemeToggle />
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
