export type VehicleTypes = "car" | "truck" | "motorcycle" | "bus";

export type VehicleStatus = "moving" | "stopped";

export interface Vehicle {
  id: number;
  lat: number;
  lng: number;
  placa: string;
  speed: number;
  status: VehicleStatus;
  type: VehicleTypes;
}
