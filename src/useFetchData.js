import { useReducer, useEffect } from "react";
import axios from "axios";
const BASEURL = "http://hn.algolia.com/api/v1/search";
let base = "";
const reducer = (state, action) => {
  switch (action.type) {
    case "Data-Request":
      return {
        loading: true,
        data: {},
      };
    case "Data-Success":
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case "Data-Fail":
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        data: {},
      };
    default:
      return state;
  }
};

export default function useFetchData(params, page, url) {
  const [state, dispatch] = useReducer(reducer, { data: {}, loading: true });

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    dispatch({ type: "Data-Request" });
    if (url !== "") {
      base = url;
    } else {
      base = BASEURL;
    }
    axios
      .get(base, {
        cancelToken: cancelToken.token,
        params: {
          page: page - 1,
          tags: "story",
          ...params,
        },
      })
      .then((res) => {
        dispatch({ type: "Data-Success", payload: { data: res.data } });
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        dispatch({ type: "Data-Fail", payload: { error: err } });
      });

    return () => cancelToken.cancel();
  }, [params, page, url]);
  return state;
}
