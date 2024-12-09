import { Station } from "../../../types/station";

export type State = {
  stations: Station[];
  loading: boolean;
  error: string | null;
};

export type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Station[] }
  | { type: "FETCH_ERROR"; payload: string };

const stationsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, stations: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default stationsReducer;
