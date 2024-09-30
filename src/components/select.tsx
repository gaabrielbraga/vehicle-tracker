import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewSelectProps {
  placeholder: string;
  options: Array<string>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function NewSelect({ placeholder, options, onChange }: NewSelectProps) {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} onChange={onChange} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
