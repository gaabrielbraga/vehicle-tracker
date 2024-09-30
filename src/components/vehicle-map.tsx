import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Vehicle } from "@/types/vehicles";

interface VehicleMapProps {
  setIsLoading: (isLoading: boolean) => void;
}

const VehicleMap = ({ setIsLoading }: VehicleMapProps) => {
  const [vehicle, setVehicle] = useState<Vehicle>();

  useEffect(() => {
    const socket: Socket = io(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/ws`);

    socket.on("vehicle-position-update", (data) => {
      setIsLoading(true);
      setVehicle(data.data);
      setIsLoading(false);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vehicleIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/9970/9970230.png",
    className: "",
    iconSize: [38, 38],
    iconAnchor: [22, 22],
    popupAnchor: [-3, -20],
  });

  return (
    <MapContainer
      center={[-20.24876441608483, -40.27231934446436]}
      zoom={13}
      className="h-screen w-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vehicle && (
        <Marker
          key={vehicle.id}
          position={[vehicle.lat, vehicle.lng]}
          icon={vehicleIcon}
        >
          <Popup>
            {vehicle.placa} - Velocidade: {vehicle.speed} km/h
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default VehicleMap;
