const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
  attack: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
      };
    case "FILTER_BY_TYPE":
      state.pokemons = state.allPokemons;
      const allPokemones = state.allPokemons;
      const typeFilter =
        action.payload === "All"
          ? allPokemones
          : allPokemones.filter((el) => el.types?.includes(action.payload));
      return {
        ...state,
        pokemons: typeFilter,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_ATTACK":
      state.pokemons = state.allPokemons;
      const allPokemon = state.allPokemons;
      const  attackFilter =
        action.payload === "All"
          ? allPokemon
          : allPokemon.filter((el) => el.attack?.includes(action.payload));
      return {
        ...state,
        pokemons: attackFilter,
      };
    case "FILTER_CREATED":
      state.pokemons = state.allPokemons;
      const allPokemons = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemons.filter((el) => typeof el.id === "string")
          : allPokemons.filter((el) => typeof el.id === "number");
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    default:
      return state;
    case "GET_NAMES_POKE":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "EMPTY_FILTER":
      return {
        ...state,
        pokemons: [],
      };
      case "ORDER_BY_POWER":
            let orderPokePow = action.payload === "weak"  
                ?   state.allPokemons.sort(function ( a, b ) {
                        if (a.attack > b.attack) {
                            return 1
                        }
                        if (b.attack > a.attack) {
                            return -1
                        }
                        return 0
                    }) 
                :   state.allPokemons.sort(function ( a, b ) {
                        if (a.attack > b.attack) {
                            return -1
                        }
                        if (b.attack > a.attack) {
                            return 1
                        }
                        return 0
                    })
            return {
                ...state,
                pokemons: orderPokePow
            }
            case "ORDER_BY_ABC":
            let orderPokeAbc = action.payload === "asc" 
                ?   state.allPokemons.sort(function ( a, b ) {
                        if (a.name > b.name) {
                            return 1
                        }
                        if (b.name > a.name) {
                            return -1
                        }
                        return 0
                    }) 
                :   state.allPokemons.sort(function ( a, b ) {
                        if (a.name > b.name) {
                            return -1
                        }
                        if (b.name > a.name) {
                            return 1
                        }
                        return 0
                    })
            return {
                ...state,
                pokemons: orderPokeAbc
            }
  }
}


export default rootReducer;
