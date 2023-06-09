import axios from "axios";
import { BACKEND_BASE_URI } from "../../config";

// ======================== Action Types

// Location ==============================================
export const LOCATION_SET = "LOCATION_SET";

export const setLocation = (location) => {
    return {
        type: LOCATION_SET,
        payload: location,
    };
};

// Global Error / Global Success =========================
export const GLOBAL_ERROR_SET = "GLOBAL_ERROR_SET";
export const GLOBAL_ERROR_REMOVE = "GLOBAL_ERROR_REMOVE";
export const GLOBAL_SUCCESS_SET = "GLOBAL_SUCCESS_SET";
export const GLOBAL_SUCCESS_REMOVE = "GLOBAL_SUCCESS_REMOVE";

export const setGlobalError = (error) => {
    return {
        type: GLOBAL_ERROR_SET,
        payload: error,
    };
};
export const removeGlobalError = () => {
    return {
        type: GLOBAL_ERROR_REMOVE,
    };
};
export const setGlobalSuccess = (message) => {
    return {
        type: GLOBAL_SUCCESS_SET,
        payload: message,
    };
};
export const removeGlobalSuccess = () => {
    return {
        type: GLOBAL_SUCCESS_REMOVE,
    };
};

// Pokemons ==========================================
// Get All
export const ALL_POKEMONS_GET = "GET_ALL_POKEMONS";

export const getAllPokemons = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URI}/pokemons`);
            const pokemons = response.data;
            dispatch({ type: ALL_POKEMONS_GET, payload: pokemons });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

// Filters, sort
export const POKEMONS_FILTER_BY_TYPE = "POKEMONS_FILTER_BY_TYPE";
export const POKEMONS_FILTER_BY_SOURCE = "POKEMONS_FILTER_BY_SOURCE";
export const POKEMONS_SORT = "POKEMONS_SORT";

export const filterPokemonsByType = (type) => {
    return {
        type: POKEMONS_FILTER_BY_TYPE,
        payload: type,
    };
};
export const filterPokemonsBySource = (source) => {
    return {
        type: POKEMONS_FILTER_BY_SOURCE,
        payload: source,
    };
};
export const sortPokemons = (sort) => {
    return {
        type: POKEMONS_SORT,
        payload: sort,
    };
};

// Search - Favorites set - Reset
export const POKEMONS_BY_NAME_GET = "POKEMONS_GET_BY_NAME";
export const USER_FAVORITES_SET = "USER_FAVORITES_SET";
export const POKEMONS_RESET = "POKEMONS_RESET";

export const getPokemonsByName = (name) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URI}/pokemons?name=${name}`
            );
            const pokemons = response.data;
            dispatch({ type: POKEMONS_BY_NAME_GET, payload: pokemons });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
export const setUserFavorites = () => {
    return {
        type: USER_FAVORITES_SET,
    };
};
export const resetPokemons = () => {
    return {
        type: POKEMONS_RESET,
    };
};

// Pagination ==============================================
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_POKEMONS_PER_PAGE = "SET_POKEMONS_PER_PAGE";

export const setCurrentPage = (page) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};
export const setPokemonsPerPage = (pokemonsPerPage) => {
    return {
        type: SET_POKEMONS_PER_PAGE,
        payload: pokemonsPerPage,
    };
};

// App features: Detail - Create =========================
// Detail
export const POKEMON_DETAIL_GET = "POKEMON_DETAIL_GET";
export const POKEMON_DETAIL_REMOVE = "POKEMON_DETAIL_REMOVE";

export const getPokemonDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URI}/pokemons/${id}`
            );
            const pokemon = response.data;
            dispatch({ type: POKEMON_DETAIL_GET, payload: pokemon });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
export const removePokemonDetail = () => {
    return {
        type: POKEMON_DETAIL_REMOVE,
    };
};

// Create
export const CREATE_POKEMON = "CREATE_POKEMON";

export const createPokemon = (newPokemon) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URI}/pokemons`,
                newPokemon
            );
            const createdPokemon = response.data;
            dispatch({
                type: CREATE_POKEMON,
                payload: createdPokemon,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

// Types =================================================
export const TYPES_GET = "TYPES_GET";

export const getAllTypes = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${BACKEND_BASE_URI}/types`);
            const types = response.data;
            dispatch({ type: TYPES_GET, payload: types });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

// Users =================================================
// Create - Validate -Sign out
export const USER_CREATE = "USER_CREATE";
export const USER_VALIDATE = "USER_VALIDATE";
export const USER_SIGN_OUT = "USER_SIGN_OUT";

export const createUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URI}/users`,
                userData
            );
            const newUser = response.data;
            dispatch({
                type: USER_CREATE,
                payload: newUser,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
export const validateUser = (credentials) => {
    return async (dispatch) => {
        try {
            const { email, password } = credentials;
            const response = await axios.get(
                `${BACKEND_BASE_URI}/users?email=${email}&password=${password}`
            );
            const userData = response.data;
            dispatch({
                type: USER_VALIDATE,
                payload: userData,
            });
        } catch (error) {
            dispatch({
                type: USER_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
export const signout = () => {
    return {
        type: USER_SIGN_OUT,
    };
};

// User errors
export const USER_ERROR_SET = "USER_ERROR_SET"; // Not developed yet
export const USER_ERROR_REMOVE = "USER_ERROR_REMOVE";

export const removeUserError = () => {
    return {
        type: USER_ERROR_REMOVE,
    };
};

// Users Pokemons ========================================
// Get all - Add - Delete
export const USER_POKEMONS_GET = "USER_POKEMONS_GET";
export const USER_POKEMON_ADD = "USER_POKEMON_ADD";
export const USER_POKEMON_DELETE = "USER_POKEMON_DELETE";

export const getUserPokemonsByUserId = (userId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `${BACKEND_BASE_URI}/userspokemons/${userId}`
            );
            dispatch({
                type: USER_POKEMONS_GET,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const addPokemonToUserPokemons = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(
                `${BACKEND_BASE_URI}/userspokemons`,
                data
            );
            const newUserPokemon = response.data;
            dispatch({
                type: USER_POKEMON_ADD,
                payload: newUserPokemon,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};

export const deletePokemonFromUserPokemons = (data) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(
                `${BACKEND_BASE_URI}/userspokemons?userId=${data.userId}&pokemonId=${data.pokemonId}`
            );
            dispatch({
                type: USER_POKEMON_DELETE,
                payload: data.pokemonId,
            });
        } catch (error) {
            dispatch({
                type: GLOBAL_ERROR_SET,
                payload: error.response.data.error,
            });
        }
    };
};
