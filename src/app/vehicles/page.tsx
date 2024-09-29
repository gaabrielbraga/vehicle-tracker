"use client";

import api from "@/services/api";
import type { Vehicle, VehicleTypes } from "@/types/vehicles";
import { useEffect, useState } from "react";
import { VehicleCard } from "./components/vehicle-card";
import { Input } from "@/components/ui/input";
import { CirclePlus } from "lucide-react";
import { NewSelect } from "@/components/select";
import { Button } from "@/components/ui/button";
import { VehicleSheet } from "./components/vehicle-sheet";

const options: VehicleTypes[] = ["car", "motorcycle", "truck", "bus"];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);

  const getVehicles = async () => {
    const { data } = await api.get("/vehicles");
    setVehicles(data);
  };

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <div className="h-screen w-screen p-8 flex gap-3 flex-col">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <Input placeholder="Search for a sign" className="w-full md:w-auto" />
          <div className="w-full md:w-auto">
            <NewSelect placeholder="Filter by type" options={options} />
          </div>
        </div>

        <VehicleSheet>
          <Button className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
            New vehicle <CirclePlus className="w-4 h-4" />
          </Button>
        </VehicleSheet>
      </div>

      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} {...vehicle} />
      ))}
    </div>
  );
}
