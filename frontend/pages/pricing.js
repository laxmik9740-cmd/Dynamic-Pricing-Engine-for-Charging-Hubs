import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPricing } from "../services/api";

export default function PricingPage() {
  const [pricing, setPricing] = useState(null);
  const [error, setError] = useState("");

  const fetchPricing = async () => {
    try {
      setError("");
      const { data } = await getPricing();
      setPricing(data);
    } catch (err) {
      setError("Unable to fetch pricing right now.");
    }
  };

  useEffect(() => {
    fetchPricing();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="mb-8 text-3xl font-bold">Dynamic Pricing</h2>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-gray-700 bg-card p-8"
      >
        {error && <p className="text-red-400">{error}</p>}
        {!error && pricing && (
          <>
            <p className="text-lg text-gray-300">Current charging price</p>
            <p className="mt-2 text-5xl font-bold text-accent">${pricing.price}/kWh</p>
            <p className="mt-4 text-xl">{pricing.message}</p>
          </>
        )}
        <button
          onClick={fetchPricing}
          className="mt-8 rounded-md bg-accent px-5 py-2 font-semibold text-gray-900 hover:bg-cyan-300"
        >
          Refresh Price
        </button>
      </motion.div>
    </div>
  );
}
