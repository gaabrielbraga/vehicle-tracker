"use client";

import Loading from "@/components/loading";
import VehicleMap from "@/components/vehicle-map";
import { useState } from "react";

export default function MapPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      {isLoading && <Loading />}
      <VehicleMap setIsLoading={setIsLoading} />
    </div>
  );
}
