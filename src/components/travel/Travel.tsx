// src/components/travel/Travel.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Travel.css";

type TripType = "one-way" | "two-way";
type TravelMode = "bus" | "plane";

const Travel: React.FC = () => {
  // --- component state ---
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [departureLocation, setDepartureLocation] = useState<string>("");
  const [departureDate, setDepartureDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>(""); // only for two-way

  const [numberOfAdults, setNumberOfAdults] = useState<number>(1);
  const [numberOfKids, setNumberOfKids] = useState<number>(0);

  const [travelMode, setTravelMode] = useState<TravelMode>("bus");
  const [hotel, setHotel] = useState<string>(""); // optional

  // Only if numberOfKids > 0:
  const [kidsAges, setKidsAges] = useState<string>(""); // e.g. "5, 8"
  // -----------------------

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
      departureLocation,
      departureDate,
      returnDate: tripType === "two-way" ? returnDate : null,
      numberOfAdults,
      numberOfKids,
      travelMode,
      hotel: hotel || null,
      kidsAges:
        numberOfKids > 0
          ? kidsAges
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s !== "")
          : [],
    };

    console.log("Form submitted:", payload);
    // e.g. navigate("/travel/results", { state: payload });
  };

  return (
    <div className="travel-form-wrapper">
      <form onSubmit={handleSubmit} className="travel-form">
        <h2>Book Your Trip</h2>

        {/* ==== Trip type selection ==== */}
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

        {/* ==== Departure Location ==== */}
        <div className="form-group">
          <label htmlFor="departureLocation">Departure Location</label>
          <input
            id="departureLocation"
            type="text"
            placeholder="e.g. Skopje"
            className="full-width"
            required
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
          />
        </div>

        {/* ==== Departure Date ==== */}
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

        {/* ==== Return Date (only if two-way) ==== */}
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

        {/* ==== Number of Adults & Kids ==== */}
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

        {/* ==== Kids' Ages (only if numberOfKids > 0) ==== */}
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

        {/* ==== Travel Mode (Bus or Plane) ==== */}
        <div className="form-group">
          <label htmlFor="travelMode">Travel Mode</label>
          <select
            id="travelMode"
            className="full-width"
            value={travelMode}
            onChange={(e) =>
              setTravelMode(e.target.value as TravelMode)
            }
          >
            <option value="bus">Bus</option>
            <option value="plane">Plane</option>
          </select>
        </div>

        {/* ==== Hotel (optional) ==== */}
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

        {/* ==== Submit Button ==== */}
        <button type="submit" className="submit-btn">
          Search Trips
        </button>
      </form>
    </div>
  );
};

export default Travel;
