import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About Our Service
        </h1>
        <p className="text-gray-600 text-lg mb-10">
          We provide professional home services that are reliable and
          affordable.
        </p>

        {/* SECTION */}
        <section className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our goal is to make booking services easier, faster, and safer for
            everyone. From cleaning to repairs, customers can find trusted
            professionals and schedule appointments effortlessly.
          </p>
        </section>

        {/* SECTION */}
        <section className="bg-white shadow-md rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-gray-600 space-y-2">
            <li>Verified service providers</li>
            <li>Easy online booking system</li>
            <li>Flexible schedules</li>
            <li>Transparent pricing</li>
            <li>Secure user authentication</li>
          </ul>
        </section>

        {/* SECTION */}
        <section className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            How It Works
          </h2>
          <ol className="list-decimal pl-6 text-gray-600 space-y-2">
            <li>Browse available services</li>
            <li>Select preferred date and location</li>
            <li>Submit booking using secured authentication</li>
            <li>Receive confirmation and track status</li>
          </ol>
        </section>
      </div>
    </div>
  );
};

export default About;
