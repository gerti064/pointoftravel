import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Travel.css";

type TripType = "one-way" | "two-way";
type TravelMode = "bus" | "plane";

const Travel: React.FC = () => {
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [from_location, setFromLocation] = useState<string>("");
  const [to_location, setToLocation] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
  const [numberOfKids, setNumberOfKids] = useState<number>(0);
  const [travelMode, setTravelMode] = useState<TravelMode>("bus");
  const [hotel, setHotel] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [kidsAges, setKidsAges] = useState<string>("");

  const handleTripTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value as TripType;
    setTripType(val);
    if (val === "one-way") {
      setReturnDate("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      tripType,
      from_location,
      to_location,
      departureDate,
      returnDate: tripType === "two-way" ? returnDate : null,
      first_name,
      last_name,
      numberOfAdults,
      numberOfKids,
      travelMode,
      hotel: hotel || null,
      phone,
      email,
      kidsAges:
        numberOfKids > 0
          ? kidsAges
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          : [],
    };

    console.log("Payload:", payload);

    fetch("/api/bookings/add_booking.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
        if (data.success) {
          alert("Booking submitted successfully!");
        } else {
          alert("Failed to submit booking: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Error submitting booking.");
      });
  };

  return (
    <div className="travel-form-wrapper">
      <form onSubmit={handleSubmit} className="travel-form">
        <h2>Book Your Trip</h2>

        <div className="options-row">
          <label className="option">
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={tripType === "one-way"}
              onChange={handleTripTypeChange}
            />
            One-Way
          </label>
          <label className="option">
            <input
              type="radio"
              name="tripType"
              value="two-way"
              checked={tripType === "two-way"}
              onChange={handleTripTypeChange}
            />
            Two-Way
          </label>
        </div>

        <div className="form-group destination-group">
          <label className="group-label">Destination Location</label>
          <div className="form-row location-row">
            <div className="form-group">
              <label htmlFor="from_location" className="small-label">Departure From:</label>
              <input
                id="from_location"
                type="text"
                placeholder="e.g. Skopje"
                className="full-width"
                required
                value={from_location}
                onChange={(e) => setFromLocation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="to_location" className="small-label">To:</label>
              <input
                id="to_location"
                type="text"
                placeholder="e.g. Ohrid"
                className="full-width"
                required
                value={to_location}
                onChange={(e) => setToLocation(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="departureDate">Departure Date</label>
          <input
            id="departureDate"
            type="date"
            className="full-width"
            required
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </div>

        {tripType === "two-way" && (
          <div className="form-group">
            <label htmlFor="returnDate">Return Date</label>
            <input
              id="returnDate"
              type="date"
              className="full-width"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}
        <div className="form-group name-group">
  <label className="group-label">Passenger Name</label>
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="first_name" className="small-label">First Name</label>
      <input
        id="first_name"
        type="text"
        placeholder="e.g. John"
        className="full-width"
        required
        value={first_name}
        onChange={(e) => setFirstName(String(e.target.value))}
      />
    </div>
    <div className="form-group">
      <label htmlFor="last_name" className="small-label">Last Name</label>
      <input
        id="last_name"
        type="text"
        placeholder="e.g. Doe"
        className="full-width"
        required
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  </div>
</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="numberOfAdults">Number of Adults</label>
            <input
              id="numberOfAdults"
              type="number"
              min={1}
              className="full-width"
              required
              value={numberOfAdults}
              onChange={(e) => setNumberOfAdults(Number(e.target.value))}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfKids">Number of Kids</label>
            <input
              id="numberOfKids"
              type="number"
              min={0}
              className="full-width"
              required
              value={numberOfKids}
              onChange={(e) => {
                const val = Number(e.target.value);
                setNumberOfKids(val);
                if (val === 0) {
                  setKidsAges("");
                }
              }}
            />
          </div>
        </div>

        {numberOfKids > 0 && (
          <div className="form-group">
            <label htmlFor="kidsAges">Kids' Ages (comma-separated)</label>
            <input
              id="kidsAges"
              type="text"
              placeholder="e.g. 5, 8, 12"
              className="full-width"
              required
              value={kidsAges}
              onChange={(e) => setKidsAges(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="travelMode">Travel Mode</label>
          <select
            id="travelMode"
            className="full-width"
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value as TravelMode)}
          >
            <option value="bus">Bus</option>
            <option value="plane">Plane</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hotel">Hotel (optional)</label>
          <input
            id="hotel"
            type="text"
            placeholder="Hotel name (optional)"
            className="full-width"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </div>
        <div className="form-group">
  <label htmlFor="phone" className="small-label">Phone Number</label>
  <input
    id="phone"
    type="tel"
    placeholder="e.g. +389 70 123 456"
    className="full-width"
    required
    // You should add a corresponding state for this:
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>

<div className="form-group">
  <label htmlFor="email" className="small-label">Email</label>

  <input
    id="email"
    type="email"
    placeholder="e.g. example@email.com"
    className="full-width"
    required
    // You should add a corresponding state for this:
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
        <button type="submit" className="submit-btn">
          Search Trips
        </button>
      </form>
    </div>
  );
};

export default Travel;
