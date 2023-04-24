// ======================== Styles
import styles from "./home.module.css";

// ======================== Components
import CardContainer from "../../components/cardContainer/CardContainer";
import Navbar from "../../components/navbar/Navbar";
import Pagination from "../../components/pagination/Pagination";

// ======================== Hooks
import { useState, useEffect } from "react";

// ======================== Redux
import { connect } from "react-redux";

import {
    getAllPokemons,
    getUserPokemonByUserId,
    setUserFavorites,
    removePokemons,
} from "../../redux/actions";
import { useLocation } from "react-router-dom";

const Home = (props) => {
    const { pokemons, userPokemons, currentPage, pokemonsPerPage } = props;

    // Redux
    const isHome = useLocation().pathname === "/home";
    useEffect(() => {
        isHome ? removePokemons() : setUserFavorites();
    }, [isHome]);

    const { setUserFavorites, removePokemons } = props;

    // Pagination
    const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    const paginatedPokemonsPre = pokemons.slice(
        (currentPage - 1) * pokemonsPerPage,
        currentPage * pokemonsPerPage
    );

    const paginatedPokemons = paginatedPokemonsPre.map((pokemon) => ({
        ...pokemon,
        isFav: userPokemons.map((p) => p.id).includes(pokemon.id),
    }));

    return (
        <div className={styles.homeContainer}>
            <div className={styles.homeImage}>
                <div className={styles.textContainer}>
                    {!isHome && (
                        <button className={styles.buttonPrimary}>
                            franyorlano's collection
                        </button>
                    )}
                </div>
            </div>
            <Navbar totalPages={totalPages} />

            {pokemons.length ? (
                <CardContainer paginatedPokemons={paginatedPokemons} />
            ) : (
                <div className={styles.loadingContainer}>
                    <span className={styles.loader}></span>
                </div>
            )}
            <Pagination totalPages={totalPages} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pokemons: state.pokemons,
        currentPage: state.currentPage,
        isLogin: state.isLogin,
        userData: state.userData,
        userPokemons: state.userPokemons,
        pokemonsPerPage: state.pokemonsPerPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPokemons: () => dispatch(getAllPokemons()),
        getUserPokemonByUserId: (userId) =>
            dispatch(getUserPokemonByUserId(userId)),
        setUserFavorites: () => dispatch(setUserFavorites()),
        removePokemons: () => dispatch(removePokemons()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
