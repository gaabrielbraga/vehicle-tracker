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

export function VehicleCard({ placa, lat, lng, speed, status, type }: Vehicle) {
  return (
    <Card className="bg-white text-black dark:bg-gray-800 dark:text-white">
      <CardHeader>
        <CardTitle className="flex gap-3 items-center">
          {placa} <Badge>{type.toUpperCase()}</Badge>
        </CardTitle>
        <CardDescription>
          <Badge variant={status === "stopped" ? "destructive" : "default"}>
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
        <VehicleSheet>
          <Button variant="outline" size="icon">
            <Pencil className="w-4 h-4" />
          </Button>
        </VehicleSheet>
        <NewTooltip content="Delete vehicle">
          <Button variant="secondary" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </NewTooltip>
      </CardFooter>
    </Card>
  );
}
