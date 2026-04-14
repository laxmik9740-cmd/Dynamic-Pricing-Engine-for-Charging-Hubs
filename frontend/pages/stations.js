import { useEffect, useState } from "react";
import { getStations } from "../services/api";

export default function StationsPage() {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const { data } = await getStations();
        setStations(data);
      } catch (err) {
        setError("Unable to load stations.");
      }
    };

    fetchStations();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold">Charging Stations</h2>
      {error && <p className="text-red-400">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2">
        {stations.map((station) => (
          <div key={station.id} className="rounded-xl border border-gray-700 bg-card p-6">
            <h3 className="text-xl font-semibold">{station.name}</h3>
            <p className="text-gray-300">{station.location}</p>
            <p className="mt-3 text-accent">${station.price}/kWh</p>
            <p className="text-sm text-gray-400">Available ports: {station.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
