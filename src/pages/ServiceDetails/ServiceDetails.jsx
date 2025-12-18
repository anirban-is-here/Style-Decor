import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Swal from "sweetalert2";
import api from "../../services/api";
import UseAuth from "../../hooks/UseAuth";

const ServiceDetails = () => {
  const { id } = useParams();
    const { user } = UseAuth();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    date: "",
    location: "",
  });

  // Fetch service details
  useEffect(() => {
    api
      .get(`/services/${id}`)
      .then((res) => setService(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Handle form change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit booking
  const handleBooking = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.location) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }

    const booking = {
      userName: user.displayName || user.email,
      userEmail: user.email,
      serviceId: service._id,
      serviceName: service.service_name,
      date: formData.date,
      location: formData.location,
      status: "Pending", // initial status
    };

    // Pass JWT token in headers
    const token = localStorage.getItem("token");

    api
      .post("/bookings", booking, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        Swal.fire("Success", "Booking created successfully", "success");
        setFormData({ date: "", location: "" });
      })
      .catch(() => {
        Swal.fire("Error", "Booking failed. Try again.", "error");
      });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!service)
    return <div className="text-center mt-10">Service not found</div>;

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-2">{service.service_name}</h1>
      <p className="mb-2">{service.description}</p>
      <p className="mb-4">
        Cost: {service.cost} BDT / {service.unit}
      </p>

      <h2 className="text-2xl font-semibold mb-3">Book this service</h2>
      <form onSubmit={handleBooking} className="max-w-md">
        <label className="label">
          <span className="label-text">Date</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />

        <label className="label">
          <span className="label-text">Location</span>
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter location"
          className="input input-bordered w-full mb-3"
          required
        />

        <button type="submit" className="btn btn-primary w-full">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default ServiceDetails;
