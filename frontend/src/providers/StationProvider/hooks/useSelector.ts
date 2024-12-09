// useSelector.ts

import { State } from "../reducers/stationReducer";
import useStations from "./useStations";

const useStationsSelector = <T>(selector: (state: State) => T): T => {
  const { state } = useStations();

  return selector(state);
};

export default useStationsSelector;
