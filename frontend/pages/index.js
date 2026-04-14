import { motion } from "framer-motion";
import Link from "next/link";

const featureCards = [
  "Dynamic Pricing",
  "Trip Planning",
  "Real-Time Data",
];

const steps = ["Find station", "Check price", "Plan trip", "Charge"];

const stats = [
  { label: "Charges", value: "10,000+" },
  { label: "Stations", value: "500+" },
  { label: "Savings", value: "30%" },
];

export default function HomePage() {
  return (
    <div className="text-gray-100">
      <section
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1606229365485-93a3b8ee0385')",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">Charge Smarter. Drive Further.</h1>
          <p className="mb-8 text-lg text-gray-200 md:text-2xl">
            Dynamic pricing for EV charging hubs
          </p>
          <Link
            href="/pricing"
            className="rounded-full bg-accent px-8 py-3 font-semibold text-gray-900 hover:bg-cyan-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <img
          src="https://images.unsplash.com/photo-1617788138017-80ad40651399"
          alt="Electric car charging"
          className="h-80 w-full rounded-xl object-cover"
        />
        <div>
          <h2 className="mb-4 text-3xl font-bold">Why Electric Vehicles Are the Future</h2>
          <ul className="space-y-2 text-gray-300">
            <li>EVs run on electricity instead of petrol</li>
            <li>Lower cost per km</li>
            <li>Zero emissions</li>
            <li>Low maintenance</li>
          </ul>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="mb-4 text-3xl font-bold">EV Technology &amp; The Future</h2>
          <ul className="space-y-2 text-gray-300">
            <li>Advanced battery systems</li>
            <li>Fast charging technology</li>
            <li>Renewable energy integration</li>
            <li>Smart energy systems</li>
          </ul>
        </div>
        <img
          src="https://images.unsplash.com/photo-1509395176047-4a66953fd231"
          alt="EV future technology"
          className="h-80 w-full rounded-xl object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Features</h2>
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {featureCards.map((title) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl border border-gray-700 bg-card p-6"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
            </motion.div>
          ))}
        </div>
        <img
          src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75"
          alt="EV charging station"
          className="h-72 w-full rounded-xl object-cover"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">How It Works</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-xl border border-gray-700 bg-card p-5 text-center">
              <p className="mb-2 text-accent">Step {index + 1}</p>
              <p className="font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">Platform Stats</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-xl border border-gray-700 bg-card p-6 text-center">
              <p className="text-3xl font-bold text-accent">{item.value}</p>
              <p className="text-gray-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <img
          src="https://images.unsplash.com/photo-1628177142898-93e36e4e3c65"
          alt="EV battery system"
          className="h-80 w-full rounded-xl object-cover"
        />
      </section>
    </div>
  );
}
