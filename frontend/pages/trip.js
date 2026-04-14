import { useState } from "react";
import { planTrip } from "../services/api";

export default function TripPage() {
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submitTrip = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    try {
      const { data } = await planTrip({ start, destination });
      setResult(data);
    } catch (err) {
      setError("Trip planning failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold">Trip Planner</h2>
      <form onSubmit={submitTrip} className="space-y-4 rounded-xl border border-gray-700 bg-card p-6">
        <input
          type="text"
          value={start}
          onChange={(event) => setStart(event.target.value)}
          placeholder="Start"
          className="w-full rounded-md border border-gray-600 bg-gray-900 p-3"
          required
        />
        <input
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Destination"
          className="w-full rounded-md border border-gray-600 bg-gray-900 p-3"
          required
        />
        <button
          type="submit"
          className="rounded-md bg-accent px-5 py-2 font-semibold text-gray-900 hover:bg-cyan-300"
        >
          Calculate Trip
        </button>
      </form>

      {error && <p className="mt-4 text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 rounded-xl border border-gray-700 bg-card p-6">
          <p>
            <span className="text-gray-300">Distance:</span> {result.distance} km
          </p>
          <p>
            <span className="text-gray-300">Battery usage:</span> {result.batteryUsage} kWh
          </p>
        </div>
      )}
    </div>
  );
}
