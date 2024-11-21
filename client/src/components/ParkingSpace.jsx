import React, { useState, useEffect } from "react";

const ParkingSpace = () => {
  const [parkingStatus, setParkingStatus] = useState([]); // Will fetch from backend
  const [reservationMessage, setReservationMessage] = useState("");

  // Fetch parking status from backend
  useEffect(() => {
    const fetchParkingStatus = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/parking");
        if (response.ok) {
          const data = await response.json();
          setParkingStatus(data.parkingStatus);
        } else {
          setReservationMessage("Error fetching parking status.");
        }
      } catch (error) {
        console.error("Error:", error);
        setReservationMessage("Failed to connect to the server.");
      }
    };

    fetchParkingStatus();
  }, []);

  // Handle spot click to reserve parking
  const handleSpotClick = async (sectionIndex, spotIndex) => {
    try {
      const response = await fetch("http://localhost:5001/api/parking/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sectionIndex, spotIndex }),
      });

      const data = await response.json();

      if (response.ok) {
        setParkingStatus(data.parkingStatus); // Update status after reservation
        setReservationMessage(
          `You have reserved Section ${sectionIndex + 1}, Spot ${spotIndex + 1}`
        );
      } else {
        setReservationMessage(data.message);
      }
    } catch (error) {
      console.error("Error reserving parking spot:", error);
      setReservationMessage("Failed to reserve the parking spot.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto my-10 p-5 bg-purple-700 border border-gray-400 rounded-lg shadow-lg">
        <h1 className="text-white text-4xl font-bold text-center mb-6">
          Parking Space Status
        </h1>
        {parkingStatus.length > 0 ? (
          <div className="flex flex-wrap justify-between">
            {parkingStatus.map((section, sectionIndex) => (
              <div key={sectionIndex} className="w-full md:w-1/3 p-2">
                <h2 className="text-white text-3xl font-semibold text-center mb-3">
                  Section {sectionIndex + 1}
                </h2>
                <div className="flex flex-wrap justify-between">
                  {section.map((isOccupied, spotIndex) => (
                    <div
                      key={spotIndex}
                      onClick={() => handleSpotClick(sectionIndex, spotIndex)}
                      className={`w-1/5 m-1 p-4 text-center text-xl border rounded-lg cursor-pointer transition-transform transform hover:scale-105 ${
                        isOccupied
                          ? "bg-red-300 text-red-800 border-red-500 cursor-not-allowed"
                          : "bg-green-300 text-green-800 border-green-500"
                      }`}
                    >
                      {spotIndex + 1}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white text-center">Loading parking status...</p>
        )}
        {reservationMessage && (
          <p className="mt-6 text-white text-lg text-center">
            {reservationMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default ParkingSpace;
