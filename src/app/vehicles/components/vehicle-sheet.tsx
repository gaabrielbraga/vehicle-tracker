import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Fragment, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NewSelect } from "@/components/select";
import { Vehicle, VehicleTypes } from "@/types/vehicles";
import api from "@/services/api";
import { toast } from "sonner";

interface VehicleSheetProps {
  children: ReactNode;
  vehicle?: Vehicle | null;
  setReload: (reload: boolean) => void;
  reload: boolean;
}

const options: VehicleTypes[] = ["car", "motorcycle", "truck", "bus"];

const vehicleSchema = z.object({
  sign: z
    .string()
    .max(7, { message: "Sign must have a maximum of 7 characters" })
    .optional(),
  type: z
    .enum(["car", "motorcycle", "truck", "bus"], {
      message: "Select a valid type.",
    })
    .optional(),
  lat: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .optional(),
  lng: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .optional(),
  speed: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .optional(),
  status: z.enum(["stopped", "moving"]).optional(),
});

type CreateVehicle = z.infer<typeof vehicleSchema>;

export function VehicleSheet({
  children,
  vehicle,
  setReload,
  reload,
}: VehicleSheetProps) {
  const form = useForm<CreateVehicle>({
    mode: "all",
    defaultValues: {
      sign: vehicle?.placa || "",
      type: vehicle?.type || "car",
      lat: vehicle?.lat || undefined,
      lng: vehicle?.lng || undefined,
      speed: vehicle?.speed || 0,
      status: vehicle?.status || undefined,
    },
    resolver: zodResolver(vehicleSchema),
  });

  const handleOnSubmit = async (data: CreateVehicle) => {
    const { sign, type, lat, lng, speed, status } = data;

    const payload = {
      placa: sign,
      type,
      lat,
      lng,
      speed,
      status,
    };

    if (vehicle) {
      await api
        .put(`/vehicles/${vehicle.id}`, payload)
        .then(() => {
          toast.success("Vehicle updated successfully");
          setReload(!reload);
        })
        .catch(() => {
          toast.error("Failed to update vehicle");
        });
    }

    if (!vehicle && sign?.trim() !== "") {
      await api
        .post("/vehicles", payload)
        .then(() => {
          toast.success("Vehicle created successfully");
          setReload(!reload);
        })
        .catch(() => {
          toast.error("Failed to create vehicle");
        });
    }

    form.reset();
    vehicle = undefined;
  };

  return (
    <Sheet>
      <SheetTrigger
        asChild
        onClick={() => {
          form.reset();
        }}
      >
        {children}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="gap-2">
          <SheetTitle>Vehicle</SheetTitle>
          <hr />
        </SheetHeader>
        <Form {...form}>
          <form
            className="flex flex-col gap-3 mt-2"
            onSubmit={form.handleSubmit(handleOnSubmit)}
          >
            <FormField
              control={form.control}
              name="sign"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Sign</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Type vehicle sign" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <NewSelect
                        {...field}
                        placeholder="Select a type"
                        options={options}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {vehicle && (
              <Fragment>
                <FormField
                  control={form.control}
                  name="lat"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Type vehicle latitude"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="lng"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Type vehicle longitude"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="speed"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Speed</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="Type vehicle speed"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <NewSelect
                            {...field}
                            placeholder="Select a status"
                            options={["stopped", "moving"]}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </Fragment>
            )}
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">
                  {vehicle ? "Update vehicle" : "Create vehicle"}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
