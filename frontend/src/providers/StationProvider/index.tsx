/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useReducer
} from "react";
import stationsReducer, { State } from "./reducers/stationReducer";
import useRequest from "../../hooks/useRequest";

type StationsContextType = {
  state: State;
  fetchStations: () => Promise<void>;
};

const initialState: State = {
  stations: [],
  loading: false,
  error: null
};

// eslint-disable-next-line react-refresh/only-export-components
export const StationsContext = createContext<StationsContextType | undefined>(
  undefined
);

const StationsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(stationsReducer, initialState);
  const { makeRequest } = useRequest();

  const fetchStations = useCallback(async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const stations = await makeRequest({
        url: "stations",
        method: "get"
      });

      console.log("Stations fetched", stations);

      dispatch({ type: "FETCH_SUCCESS", payload: stations });
    } catch (error: any) {
      console.error("Failed to fetch stations", error);

      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  }, [makeRequest]);

  const value = useMemo(() => {
    return {
      state,
      fetchStations
    };
  }, [state, fetchStations]);

  return (
    <StationsContext.Provider value={value}>
      {children}
    </StationsContext.Provider>
  );
};

export default StationsProvider;
