let parkingStatus = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => Math.random() < 0.5)
  );
  
  // Get parking status
  const getParkingStatus = (req, res) => {
    res.status(200).json({ parkingStatus });
  };
  
  // Update a parking spot
  const updateParkingSpot = (req, res) => {
    const { sectionIndex, spotIndex } = req.body;
  
    if (
      sectionIndex < 0 ||
      sectionIndex >= parkingStatus.length ||
      spotIndex < 0 ||
      spotIndex >= parkingStatus[0].length
    ) {
      return res.status(400).json({ message: "Invalid section or spot index" });
    }
  
    if (parkingStatus[sectionIndex][spotIndex]) {
      return res.status(400).json({ message: "Spot already occupied" });
    }
  
    // Reserve the spot
    parkingStatus[sectionIndex][spotIndex] = true;
    res.status(200).json({ message: "Spot reserved successfully", parkingStatus });
  };
  
  module.exports = {
    getParkingStatus,
    updateParkingSpot,
  };
  