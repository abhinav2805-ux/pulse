import React from 'react';
import { ChartBarIcon, CogIcon, ClubIcon, LightbulbIcon } from 'lucide-react';

const Feature = ({ icon, title, description }) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
    {icon}
    <h3 className="mt-4 mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-center text-gray-600">{description}</p>
  </div>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100  bg-dot-black/[0.2] py-12">
      

      <main className="container mx-auto px-4 py-12">
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Optimize Your Buffer Stock Management</h2>
          <p className="text-xl text-gray-600">Harness the power of AI to predict market trends and manage your buffer stock efficiently.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature 
            icon={<ChartBarIcon className="w-12 h-12 text-blue-500" />}
            title="Predictive Analytics"
            description="Utilize advanced AI models to forecast market trends and optimize stock levels."
          />
          <Feature 
            icon={<CogIcon className="w-12 h-12 text-blue-500" />}
            title="Automated Management"
            description="Set rules for automatic stock releases based on market conditions and predictions."
          />
          <Feature 
            icon={<ClubIcon className="w-12 h-12 text-blue-500" />}
            title="Real-time Inventory"
            description="Monitor your buffer stock levels in real-time across multiple locations."
          />
          <Feature 
            icon={<LightbulbIcon className="w-12 h-12 text-blue-500" />}
            title="Smart Insights"
            description="Receive intelligent recommendations for optimal buffer stock management."
          />
        </section>

        <section className="mt-16 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
          <h1 className='text-4xl font-extrabold mt-10'>*Under Construction*</h1>
        </section>
      </main>

    </div>
  );
};

export default LandingPage;