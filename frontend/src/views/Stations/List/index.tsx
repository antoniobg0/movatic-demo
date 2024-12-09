import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStations from "../../../providers/StationProvider/hooks/useStations";
import useStationsSelector from "../../../providers/StationProvider/hooks/useSelector";

const List: React.FC = () => {
  const navigate = useNavigate();
  const { fetchStations } = useStations();
  const stations = useStationsSelector((state) => state.stations);
  const loading = useStationsSelector((state) => state.loading);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 flow-root p-8">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Available Bikes
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Available Docks
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stations.map((station) => (
                  <tr
                    key={station.stationId}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => navigate(`/stations/${station.stationId}`)}
                  >
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {station.stationId}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {station.numBikesAvailable}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {station.numDocksAvailable}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
