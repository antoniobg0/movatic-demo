import { Outlet } from "react-router-dom";
import StationsProvider from "../../providers/StationProvider";

const Stations = () => {
  return (
    <StationsProvider>
      <Outlet />
    </StationsProvider>
  );
};

export default Stations;
