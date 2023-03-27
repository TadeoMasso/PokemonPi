import axios from "axios";

export function getPokemons() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    return dispatch({
      type: "GET_POKEMONS",
      payload: json.data,
    });
  };
}
export function filterByTypes(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export const getTypes = () => {
  return async function (dispatch) {
    var json = await axios("http://localhost:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: json.data,
    });
  };
};
export function postPokemons(payload) {
  return async function (dispatch) {
    console.log(payload);
    const poke =  await axios.post("http://localhost:3001/createpokemons", payload);
    return dispatch({
      type: "POST_POKEMON",
      payload: poke.data,
    });
  };
}
export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}
export function getNamePokes(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/pokename?name=" + name);
      return dispatch({
        type: "GET_NAMES_POKE",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function emptyFilter() {
  return {
    type: "EMPTY_FILTER",
  };
}
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/id/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function orderByPower(payload) {
  return {
    type: "ORDER_BY_POWER",
    payload,
  };
}
export function orderByAbc(payload) {
  return {
    type: "ORDER_BY_ABC",
    payload,
  };
}
