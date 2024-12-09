import { useContext } from "react";
import { StationsContext } from "..";

const useStations = () => {
  const context = useContext(StationsContext);

  if (!context) {
    throw new Error("useStations must be used within a StationProvider");
  }

  return context;
};

export default useStations;
