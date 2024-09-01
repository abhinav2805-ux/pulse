import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import TypingAnimation from '@/components/magicui/typing-animation';
import teamMembers from '@/constants/team';




const AboutUs = () => {
  return (
    <div className="bg-white py-12  bg-dot-black/[0.2]">
      <div className="container mx-auto px-4">
        
        <TypingAnimation
        className="text-4xl font-bold mt-4 text-black text-center dark:text-white"
        text="HARVESTRA"
        />
        <section className="mb-12">
          <TypingAnimation
          className="text-2xl font-semibold mb-4 text-black text-left dark:text-white"
          text="Our Vision"
          />
          <p className="text-gray-700">
            At Harvestra, we envision a future where advanced AI and ML technologies enhance the stability and efficiency of India&apos;s agricultural commodity markets. Our goal is to provide the Department of Consumer Affairs with cutting-edge predictive tools, empowering them to make data-driven decisions that benefit farmers, consumers, and the overall economy.
          </p>
        </section>

        <section className="mb-12">
        <TypingAnimation
          className="text-2xl font-semibold mb-4 text-black text-left dark:text-white"
          text="The Problem We're Solving"
          />
          <p className="text-gray-700">
            The Department of Consumer Affairs monitors daily prices of 22 essential food commodities across 550 centers in India. They maintain buffer stocks of pulses and onions to stabilize price volatility through strategic market interventions. Currently, price analyses rely on seasonality, historical trends, market intelligence, and crop estimates. While ARIMA models have been used for pulses, there&apos;s a need for more advanced, comprehensive predictive models. Harvestra addresses this gap by developing AI-ML based models for accurate price predictions of agri-horticultural commodities, particularly focusing on pulses and vegetables like onion and potato.
          </p>
        </section>

        <section className="mb-12">
          <TypingAnimation
          className="text-2xl font-semibold mb-4 text-black text-left dark:text-white"
          text="Our Approach"
          />          
          <p className="text-gray-700">
            We&apos;re developing state-of-the-art AI-ML models to predict prices of agri-horticultural commodities:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Utilizing advanced machine learning algorithms that go beyond traditional ARIMA models</li>
            <li>Incorporating a wide range of factors including historical price data, seasonality, crop sowing and production estimates, and market intelligence inputs</li>
            <li>Developing separate models for different commodity categories (pulses, onions, potatoes) to capture their unique market dynamics</li>
            <li>Creating a user-friendly interface for the Department of Consumer Affairs to access predictions and insights easily</li>
            <li>Implementing continuous model refinement based on new data and feedback from the Department</li>
          </ul>
        </section>

        <section className="mb-12">
        <TypingAnimation
          className="text-2xl font-semibold mb-4 text-black text-left dark:text-white"
          text="Meet Our Team"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <Image src={member.image} width={32} height={32} alt={member.name} className="rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-gray-600 text-center mb-2">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <a title='linkedin' href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <LinkedInIcon size={20} />
                    </a>
                  )}
                  {member.social.github && (
                    <a title='github' href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
                      <GitHubIcon size={20} />
                    </a>
                  )}
                </div>
                
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
        <TypingAnimation
          className="text-2xl font-semibold mb-4 text-black text-left dark:text-white"
          text="Our Impact"
          />
          <p className="text-gray-700">
            While Harvestra is still in development, our goal is to achieve the following impacts:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Provide more accurate and timely price predictions for 22 essential food commodities</li>
            <li>Enable better-informed decisions on buffer stock management and market interventions</li>
            <li>Contribute to the stabilization of food commodity prices in India</li>
            <li>Support the Department of Consumer Affairs in enhancing food security and market efficiency</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Check out our project on <a href="https://github.com/AnshJain9159/pulse" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;