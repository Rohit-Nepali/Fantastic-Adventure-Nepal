import Link from "next/link";

export const metadata = {
  title: "Documents and Preparation for Trekking in Nepal",
  description: "Necessary documents, packing recommendations, and health & safety protocols for trekking in Nepal.",
};

export default function DocumentsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Documents and Preparation for Trekking in Nepal</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Necessary Documents</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px]">
          <li>
            <strong>Passport:</strong> Ensure it is valid for at least 6 months beyond the planned departure date.
          </li>
          <li>
            <strong>Travel Insurance:</strong> Comprehensive coverage that includes high-altitude trekking and emergency
            evacuation is required. A printed copy of the insurance details should be carried.
          </li>
          <li>
            <strong>Visa:</strong> A valid tourist visa for Nepal is necessary. This can be obtained upon arrival or in
            advance from a Nepalese embassy/consulate.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Packing Recommendations</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px]">
          <li>
            <strong>Clothing:</strong> Include warm layers, moisture-wicking base layers, trekking pants, a down jacket,
            a waterproof/windproof jacket, gloves, and a hat.
          </li>
          <li>
            <strong>Footwear:</strong> Sturdy, preferably waterproof, trekking boots and comfortable socks are essential.
          </li>
          <li>
            <strong>Accessories:</strong> Sunglasses, sunscreen, trekking poles, a hat/cap, a reusable water bottle, and a
            headlamp.
          </li>
          <li>
            <strong>Backpack:</strong> A comfortable daypack for daily essentials, while main luggage will be carried by
            porters.
          </li>
          <li>
            <strong>Other Essentials:</strong> Personal medications, a basic first-aid kit, toiletries, and a power bank for
            charging electronic devices.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Health and Safety Protocols</h2>
        <ul className="list-disc pl-5 space-y-2 text-[15px]">
          <li>
            <strong>Altitude Sickness Precautions:</strong> Trekking often involves high altitudes. Gradual ascent,
            hydration, and acclimatization days are recommended to minimize altitude sickness risks. Guides are trained to
            monitor and assist if symptoms arise.
          </li>
          <li>
            <strong>Vaccinations:</strong> Routine vaccines should be up-to-date. Additional vaccinations like Hepatitis A,
            Typhoid, and Rabies may be recommended—consult your healthcare provider.
          </li>
          <li>
            <strong>COVID-19 Measures:</strong> Adhere to local guidelines, including mask usage, hand sanitization, and
            maintaining social distancing where applicable.
          </li>
        </ul>
      </section>

      <div className="mt-10">
        <Link href="/contact" className="inline-block bg-accent text-white px-5 py-3 rounded-md">Contact Us</Link>
        <Link href="/about" className="ml-4 inline-block text-accent underline">Learn about us</Link>
      </div>
    </main>
  );
}
