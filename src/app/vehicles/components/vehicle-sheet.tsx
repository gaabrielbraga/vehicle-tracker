import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface VehicleSheetProps {
  children: ReactNode;
}

const createVehicleSchema = z.object({
  placa: z.string(),
  type: z.enum(["car", "motorcycle", "truck", "bus"]),
});

type CreateVehicle = z.infer<typeof createVehicleSchema>;

export function VehicleSheet({ children }: VehicleSheetProps) {
  const form = useForm<CreateVehicle>({
    mode: "all",
    defaultValues: {
      placa: "",
      type: "car",
    },
    resolver: zodResolver(createVehicleSchema),
  });

  const handleOnSubmit = (data: CreateVehicle) => {
    console.log(data);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New vehicle</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
