// ======================== Action Types
import {
    // Global Error / Global Success =====================
    GLOBAL_ERROR_SET,
    GLOBAL_ERROR_REMOVE,
    GLOBAL_SUCCESS_SET,
    GLOBAL_SUCCESS_REMOVE,

    // Pokemons ==========================================
    // Get All
    ALL_POKEMONS_GET,
    // Filters, sort
    POKEMONS_FILTER_BY_TYPE,
    POKEMONS_FILTER_BY_SOURCE,
    POKEMONS_SORT,
    // Search - Favorites set - Reset
    USER_FAVORITES_SET,
    POKEMONS_BY_NAME_GET,
    POKEMONS_RESET,

    // Pagination ==============================================
    SET_CURRENT_PAGE,
    SET_POKEMONS_PER_PAGE,

    // App features: Detail - Create =========================
    // Detail
    POKEMON_DETAIL_GET,
    POKEMON_DETAIL_REMOVE,
    // Create
    CREATE_POKEMON,

    // Types =================================================
    TYPES_GET,

    // Users =================================================
    // Create - Validate -Sign out
    USER_CREATE,
    USER_VALIDATE,
    USER_SIGN_OUT,
    // User errors
    USER_ERROR_SET,
    USER_ERROR_REMOVE,

    // Users Pokemons ========================================
    // Get all - Add - Delete
    USER_POKEMONS_GET,
    USER_POKEMON_ADD,
    USER_POKEMON_DELETE,
} from "../actions";

// ======================== Consts
import { FILTERS, SORTS } from "../../const";
const { BY_TYPE, BY_SOURCE } = FILTERS;

// ======================== Initial State

const initialState = {
    // Global info
    globalError: "",
    globalSuccess: "",

    // Pokemons
    allPokemons: [],
    pokemons: [],
    userPokemons: [],
    pokemonDetail: {},

    // Types
    types: [],

    // App data
    pokemonsPerPage: 12,
    currentPage: 1,
    sort: SORTS.DEFAULT,
    filters: {
        byType: BY_TYPE.ALL_TYPES,
        bySource: BY_SOURCE.ALL_SOURCES,
    },

    // User
    isLogin: false,
    userData: {},
    signInError: "",
};

// ======================== Apply filters function
const applyFilters = (allPokemons, byType, bySource) => {
    let filteredPokemons = [...allPokemons];

    if (byType !== BY_TYPE.ALL_TYPES) {
        filteredPokemons = filteredPokemons.filter((p) =>
            p.types.includes(byType)
        );
    }

    if (bySource !== BY_SOURCE.ALL_SOURCES) {
        filteredPokemons = filteredPokemons.filter((p) => {
            if (bySource === BY_SOURCE.DATABASE) {
                return isNaN(p.id) === true;
            }
            if (bySource === BY_SOURCE.POKEAPI) {
                return isNaN(p.id) === false;
            }
            return true;
        });
    }

    return filteredPokemons;
};

// ======================== Root Reducer

const rootReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        // Global Error / Global Success =========================
        case GLOBAL_ERROR_SET:
            return { ...state, globalError: action.payload };
        case GLOBAL_ERROR_REMOVE:
            return { ...state, globalError: "" };
        case GLOBAL_SUCCESS_SET:
            return { ...state, globalSuccess: action.payload };
        case GLOBAL_SUCCESS_REMOVE:
            return { ...state, globalSuccess: "" };

        // Pokemons ==============================================
        // Get & set all
        case ALL_POKEMONS_GET:
            return {
                ...state,
                allPokemons: action.payload,
                pokemons: action.payload,
            };

        // Filters, sort
        case POKEMONS_FILTER_BY_TYPE:
            const filteredPokemonsByType = applyFilters(
                state.allPokemons,
                action.payload,
                state.filters.bySource
            );

            return {
                ...state,
                pokemons: filteredPokemonsByType,
                filters: {
                    ...state.filters,
                    byType: action.payload,
                },
            };
        case POKEMONS_FILTER_BY_SOURCE:
            const filteredPokemonsBySource = applyFilters(
                state.allPokemons,
                state.filters.byType,
                action.payload
            );

            return {
                ...state,
                pokemons: filteredPokemonsBySource,
                filters: {
                    ...state.filters,
                    bySource: action.payload,
                },
            };
        case POKEMONS_SORT:
            let orderedPokemons = [...state.pokemons];

            switch (action.payload) {
                case SORTS.DEFAULT:
                    return {
                        ...state,
                        pokemons: applyFilters(
                            state.allPokemons,
                            state.filters.byType,
                            state.filters.bySource
                        ),
                        sort: action.payload,
                    };
                case SORTS.ALPHABETICAL_ASC:
                    orderedPokemons.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    break;
                case SORTS.ALPHABETICAL_DESC:
                    orderedPokemons.sort((a, b) =>
                        b.name.localeCompare(a.name)
                    );
                    break;
                case SORTS.ATTACK_ASC:
                    orderedPokemons.sort((a, b) => a.attack - b.attack);
                    break;
                case SORTS.ATTACK_DESC:
                    orderedPokemons.sort((a, b) => b.attack - a.attack);
                    break;
                default:
                    break;
            }
            return {
                ...state,
                pokemons: orderedPokemons,
                sort: action.payload,
            };
        // Search - Favorites set - Reset
        case POKEMONS_BY_NAME_GET:
            return {
                ...state,
                pokemons: action.payload,
                filters: {
                    ...state.filters,
                    byType: BY_TYPE.ALL_TYPES,
                    bySource: BY_SOURCE.ALL_SOURCES,
                },
                sort: SORTS.DEFAULT,
            };
        case USER_FAVORITES_SET:
            return {
                ...state,
                pokemons: state.userPokemons,
                filters: {
                    ...state.filters,
                    byType: BY_TYPE.ALL_TYPES,
                    bySource: BY_SOURCE.ALL_SOURCES,
                },
                sort: SORTS.DEFAULT,
            };
        case POKEMONS_RESET:
            return {
                ...state,
                pokemons: state.allPokemons,
                filters: {
                    ...state.filters,
                    byType: BY_TYPE.ALL_TYPES,
                    bySource: BY_SOURCE.ALL_SOURCES,
                },
                sort: SORTS.DEFAULT,
            };

        // Pagination ============================================
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload };
        case SET_POKEMONS_PER_PAGE:
            return {
                ...state,
                pokemonsPerPage: action.payload,
            };

        // App features: Detail - Create =========================
        // Detail
        case POKEMON_DETAIL_GET:
            return { ...state, pokemonDetail: action.payload };
        case POKEMON_DETAIL_REMOVE:
            return { ...state, pokemonDetail: {} };
        // Create
        case CREATE_POKEMON:
            return {
                ...state,
                allPokemons: [...state.allPokemons, action.payload],
                pokemons: [...state.pokemons, action.payload],
            };

        // Types =================================================
        case TYPES_GET:
            return { ...state, types: action.payload };

        // Users =================================================
        // Create - Validate -Sign out
        case USER_CREATE:
            return {
                ...state,
            };
        case USER_VALIDATE:
            return {
                ...state,
                isLogin: true,
                userData: action.payload,
                signInError: "",
            };
        case USER_SIGN_OUT:
            return {
                ...state,
                isLogin: false,
                userData: {},
                userPokemons: [],
            };
        // User errors
        case USER_ERROR_SET:
            return {
                ...state,
                signInError: action.payload,
            };
        case USER_ERROR_REMOVE:
            return {
                ...state,
                signInError: "",
            };

        // Users Pokemons ========================================
        // Get all - Add - Delete
        case USER_POKEMONS_GET:
            return {
                ...state,
                userPokemons: action.payload,
            };
        case USER_POKEMON_ADD:
            return {
                ...state,
                userPokemons: [...state.userPokemons, action.payload],
            };
        case USER_POKEMON_DELETE:
            return {
                ...state,
                userPokemons: state.userPokemons.filter(
                    (pokemon) => pokemon.id !== action.payload
                ),
            };

        // =======================================================
        default:
            return { ...state };
    }
};

export default rootReducer;
