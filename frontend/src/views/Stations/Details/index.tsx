import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useStationsSelector from "../../../providers/StationProvider/hooks/useSelector";
import useStations from "../../../providers/StationProvider/hooks/useStations";

const Details: React.FC = () => {
  const navigation = useNavigate();
  const { fetchStations } = useStations();
  const stations = useStationsSelector((state) => state.stations);
  const { stationId } = useParams();
  const station = stations.find((station) => station.stationId === stationId);

  useEffect(() => {
    if (!station) {
      // This ideally should be a get station endpoint
      fetchStations();
    }
  }, [station, fetchStations]);

  if (!station) {
    return <div>Loading station data...</div>;
  }

  return (
    <div className="m-4">
      <button
        type="button"
        className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        onClick={() => navigation("/stations/")}
      >
        Back
      </button>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Station ID: {station.stationId}
            </div>
            <p className="mt-2 text-gray-500">
              Last Reported: {station.lastReported}
            </p>
            <div className="mt-4">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-900">Status:</div>
                <div
                  className={`ml-2 text-sm ${
                    station.isInstalled ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {station.isInstalled ? "Installed" : "Not Installed"}
                </div>
                <div
                  className={`ml-2 text-sm ${
                    station.isRenting ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {station.isRenting ? "Renting" : "Not Renting"}
                </div>
                <div
                  className={`ml-2 text-sm ${
                    station.isReturning ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {station.isReturning ? "Returning" : "Not Returning"}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-900">
                Bikes Available:
              </div>
              <div className="ml-2 text-sm text-gray-500">
                Total: {station.numBikesAvailable}
              </div>
              <div className="ml-2 text-sm text-gray-500">
                Classic: {station.numBikesAvailableTypes.classic}
              </div>
              <div className="ml-2 text-sm text-gray-500">
                Electric: {station.numBikesAvailableTypes.electric}
              </div>
              <div className="ml-2 text-sm text-gray-500">
                Smart: {station.numBikesAvailableTypes.smart}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-900">
                Docks Available:
              </div>
              <div className="ml-2 text-sm text-gray-500">
                Total: {station.numDocksAvailable}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
