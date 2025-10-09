import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icon
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadowUrl from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = defaultIcon;

const MapView: React.FC = () => {
  const [coords, setCoords] = useState<[number, number] | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  if (!coords) return <div>Loading map...</div>;

  return (
    <MapContainer
      center={coords}
      zoom={13}
      style={{ height: "71vh", width: "80%", margin: "0 auto", display: "block" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <Marker position={coords}>
        <Popup>Your Real Location</Popup>
      </Marker>
    </MapContainer>
  );
};

// ✅ Make sure to export as default
export default MapView;
