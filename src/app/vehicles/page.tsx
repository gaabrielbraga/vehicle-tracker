"use client";

import api from "@/services/api";
import type { Vehicle } from "@/types/vehicles";
import { useEffect, useState } from "react";
import { VehicleCard } from "./components/vehicle-card";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehicleSheet } from "./components/vehicle-sheet";
import Loading from "@/components/loading";

export default function VehiclesPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);

  const getVehicles = async () => {
    setIsLoading(true);
    const { data } = await api.get("/vehicles");
    setVehicles(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getVehicles();
  }, [reload]);

  return (
    <div className="p-8 flex gap-10 flex-col">
      {isLoading && <Loading />}
      <div className="flex flex-col md:flex-row justify-end gap-4">
        <VehicleSheet reload={reload} setReload={setReload}>
          <Button className="flex items-center gap-2 w-full md:w-auto mt-3 md:mt-0">
            New vehicle <CirclePlus className="w-4 h-4" />
          </Button>
        </VehicleSheet>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="w-full">
            <VehicleCard setReload={setReload} reload={reload} {...vehicle} />
          </div>
        ))}
      </div>
    </div>
  );
}
