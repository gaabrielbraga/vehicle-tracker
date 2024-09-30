import { NewTooltip } from "@/components/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Vehicle } from "@/types/vehicles";
import { Pencil, Trash2 } from "lucide-react";
import { VehicleSheet } from "./vehicle-sheet";
import api from "@/services/api";
import { toast } from "sonner";

export function VehicleCard({
  id,
  placa,
  lat,
  lng,
  speed,
  status,
  type,
}: Vehicle) {
  const handleDeleteVehicle = async () => {
    await api.delete(`/vehicles/${id}`).then(() => {
      toast.success("Vehicle deleted successfully");
    });
  };

  return (
    <Card className="bg-white text-black dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle className="flex gap-3 items-center">
          {placa} <Badge>{type.toUpperCase()}</Badge>
        </CardTitle>
        <CardDescription>
          <Badge variant={status === "stopped" ? "destructive" : "secondary"}>
            {status}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Latitude: {lat}</p>
        <p>Longitude: {lng}</p>
        <p>Speed: {speed}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <VehicleSheet vehicle={{ id, placa, lat, lng, speed, status, type }}>
          <Button variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </VehicleSheet>
        <NewTooltip content="Delete vehicle">
          <Button onClick={handleDeleteVehicle} variant="secondary" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </NewTooltip>
      </CardFooter>
    </Card>
  );
}
