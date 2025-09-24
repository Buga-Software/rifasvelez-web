import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

export default function MapComponent() {
  useEffect(() => {
    const mapExists = document.getElementById("map")?.innerHTML !== "";
    if (mapExists) return;

    L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/leaflet/marker-icon-2x.png', 
        iconUrl: '/leaflet/marker-icon.png',         
        shadowUrl: '/leaflet/marker-shadow.png',     
    });

    const map = L.map("map").setView([3.9073432, -76.2985562], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    L.marker([3.9073432, -76.2985562])
      .addTo(map)
      .bindPopup("¡Nuestra oficina!")
      .openPopup();
  }, []);

  return (
    <div
      id="map"
      style={{ height: "100%", width: "100%", borderRadius: "6px", zIndex: 0 }}
    />
  );
}
