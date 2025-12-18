import React, { useEffect, useState } from "react";

import { Link } from "react-router";
import api from "../../services/api";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/api/services");
        console.log(res.data); // <-- check her
        setServices(res.data);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-4xl"></span>
      </div>
    );

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 shadow-xl border rounded-lg"
          >
            <div className="card-body">
              <h2 className="card-title">{service.service_name}</h2>
              <p>{service.description}</p>
              <p>
                Cost: {service.cost} BDT / {service.unit}
              </p>
              <div className="card-actions justify-end mt-3">
                <Link
                  to={`/services/${service._id}`}
                  className="btn btn-primary btn-sm"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
