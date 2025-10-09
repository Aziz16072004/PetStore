import { useState, useEffect } from "react";

export default function useGeolocation() {
  const [coords, setCoords] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => console.error(err)
    );
  }, []);

  return coords;
}
