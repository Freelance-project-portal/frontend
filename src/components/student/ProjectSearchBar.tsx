"use client";

import { useState } from "react";

import SearchInput from "../shared/SearchInput";
import { Button } from "@/src/components/ui/button";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";

interface ProjectSearchBarProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}

const ProjectSearchBar = ({ onSearch, onFilterChange }: ProjectSearchBarProps) => {
  const [filters, setFilters] = useState({
    skills: "",
    faculty: "",
  });

  const handleFilterApply = () => {
    onFilterChange?.(filters);
  };

  const handleFilterClear = () => {
    setFilters({ skills: "", faculty: "" });
    onFilterChange?.({ skills: "", faculty: "" });
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        <SearchInput placeholder="Search projects by title or description..." onSearch={onSearch} />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filter Projects</SheetTitle>
            <SheetDescription>Narrow down your project search with filters</SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="e.g., React, Python"
                value={filters.skills}
                onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="faculty">Faculty Name</Label>
              <Input
                id="faculty"
                placeholder="Search by faculty"
                value={filters.faculty}
                onChange={(e) => setFilters({ ...filters, faculty: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleFilterApply} className="flex-1">
                Apply Filters
              </Button>
              <Button onClick={handleFilterClear} variant="outline">
                Clear
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProjectSearchBar;


