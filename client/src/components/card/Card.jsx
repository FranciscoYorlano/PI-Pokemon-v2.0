// ======================== Styles
import styles from "./card.module.css";

// ======================== React Router
import { Link } from "react-router-dom";

// ======================== React Redux
import { connect } from "react-redux";
import {
    addPokemonToUserPokemons,
    deletePokemonFromUserPokemons,
} from "../../redux/actions";

const Card = (props) => {
    const { id, name, image, attack, life, types, isFav } = props.pokemon;
    const nameU = name[0].toUpperCase() + name.substring(1);

    // Login functions
    const { isLogin, userData } = props;

    // Favorite Pokemons
    const { addPokemonToUserPokemons, deletePokemonFromUserPokemons } = props;
    const handleFavoritePokemon = () => {
        const data = { userId: userData.id, pokemonId: id };
        isFav
            ? deletePokemonFromUserPokemons(data)
            : addPokemonToUserPokemons(data);
    };

    return (
        <div className={styles.card}>
            <Link to={`/detail/${id}`}>
                <div className={styles.cardImage}>
                    <img src={image} alt={name} />
                </div>
                <h2 className={styles.cardName}>{nameU}</h2>
            </Link>
            <div className={styles.cardTypes}>
                {types.map((type) => (
                    <span
                        key={type}
                        className={`${styles.type} ${styles[`${type}`]}`}
                    >
                        {type}
                    </span>
                ))}
            </div>
            <div className={styles.cardStats}>
                {isLogin && isNaN(id) ? (
                    isFav ? (
                        <>
                            <span className={`${styles.stat}`}>
                                <svg
                                    width="2rem"
                                    height="2rem"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g id="Warning / Shield_Warning">
                                            {" "}
                                            <path
                                                id="Vector"
                                                d="M12 8V12M20 10.165C20 16.7333 15.0319 19.6781 12.9258 20.6314L12.9231 20.6325C12.7016 20.7328 12.5906 20.7831 12.3389 20.8263C12.1795 20.8537 11.8215 20.8537 11.6621 20.8263C11.4094 20.7829 11.2972 20.7325 11.074 20.6314C8.9678 19.6781 4 16.7333 4 10.165V6.2002C4 5.08009 4 4.51962 4.21799 4.0918C4.40973 3.71547 4.71547 3.40973 5.0918 3.21799C5.51962 3 6.08009 3 7.2002 3H16.8002C17.9203 3 18.4796 3 18.9074 3.21799C19.2837 3.40973 19.5905 3.71547 19.7822 4.0918C20 4.5192 20 5.07899 20 6.19691V10.165ZM12.0498 15V15.1L11.9502 15.1002V15H12.0498Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                srokeLinecap="round"
                                                SrokeLinejoin="round"
                                            />{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                                {attack}
                            </span>
                            <span
                                className={`${styles.stat} ${styles.notPhones}`}
                            >
                                <svg
                                    width="2rem"
                                    height="2rem"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5"
                                            stroke="#FFFFFF"
                                            stroke-width="1.5"
                                            srokeLinecap="round"
                                            SrokeLinejoin="round"
                                        />{" "}
                                    </g>
                                </svg>
                                {life}
                            </span>
                            <button
                                className={styles.favButton}
                                onClick={handleFavoritePokemon}
                            >
                                <svg
                                    width="2rem"
                                    height="2rem"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"
                                            fill="#ffffff"
                                        />{" "}
                                    </g>
                                </svg>
                            </button>
                        </>
                    ) : (
                        <>
                            <span className={`${styles.stat}`}>
                                <svg
                                    width="2rem"
                                    height="2rem"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <g id="Warning / Shield_Warning">
                                            {" "}
                                            <path
                                                id="Vector"
                                                d="M12 8V12M20 10.165C20 16.7333 15.0319 19.6781 12.9258 20.6314L12.9231 20.6325C12.7016 20.7328 12.5906 20.7831 12.3389 20.8263C12.1795 20.8537 11.8215 20.8537 11.6621 20.8263C11.4094 20.7829 11.2972 20.7325 11.074 20.6314C8.9678 19.6781 4 16.7333 4 10.165V6.2002C4 5.08009 4 4.51962 4.21799 4.0918C4.40973 3.71547 4.71547 3.40973 5.0918 3.21799C5.51962 3 6.08009 3 7.2002 3H16.8002C17.9203 3 18.4796 3 18.9074 3.21799C19.2837 3.40973 19.5905 3.71547 19.7822 4.0918C20 4.5192 20 5.07899 20 6.19691V10.165ZM12.0498 15V15.1L11.9502 15.1002V15H12.0498Z"
                                                stroke="#FFFFFF"
                                                stroke-width="2"
                                                srokeLinecap="round"
                                                SrokeLinejoin="round"
                                            />{" "}
                                        </g>{" "}
                                    </g>
                                </svg>
                                {attack}
                            </span>
                            <span
                                className={`${styles.stat} ${styles.notPhones}`}
                            >
                                <svg
                                    width="2rem"
                                    height="2rem"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5"
                                            stroke="#FFFFFF"
                                            stroke-width="1.5"
                                            srokeLinecap="round"
                                            SrokeLinejoin="round"
                                        />{" "}
                                    </g>
                                </svg>
                                {life}
                            </span>
                            <button
                                className={styles.favButton}
                                onClick={handleFavoritePokemon}
                            >
                                <svg
                                    width="2rem"
                                    height="2rem"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g
                                        id="SVGRepo_bgCarrier"
                                        stroke-width="0"
                                    />

                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />

                                    <g id="SVGRepo_iconCarrier">
                                        {" "}
                                        <path
                                            d="M12 19.7501C11.8012 19.7499 11.6105 19.6708 11.47 19.5301L4.70001 12.7401C3.78387 11.8054 3.27072 10.5488 3.27072 9.24006C3.27072 7.9313 3.78387 6.6747 4.70001 5.74006C5.6283 4.81186 6.88727 4.29042 8.20001 4.29042C9.51274 4.29042 10.7717 4.81186 11.7 5.74006L12 6.00006L12.28 5.72006C12.739 5.25606 13.2857 4.88801 13.8883 4.63736C14.4909 4.3867 15.1374 4.25845 15.79 4.26006C16.442 4.25714 17.088 4.38382 17.6906 4.63274C18.2931 4.88167 18.8402 5.24786 19.3 5.71006C20.2161 6.6447 20.7293 7.9013 20.7293 9.21006C20.7293 10.5188 20.2161 11.7754 19.3 12.7101L12.53 19.5001C12.463 19.5752 12.3815 19.636 12.2904 19.679C12.1994 19.7219 12.1006 19.7461 12 19.7501ZM8.21001 5.75006C7.75584 5.74675 7.30551 5.83342 6.885 6.00505C6.4645 6.17669 6.08215 6.42989 5.76001 6.75006C5.11088 7.40221 4.74646 8.28491 4.74646 9.20506C4.74646 10.1252 5.11088 11.0079 5.76001 11.6601L12 17.9401L18.23 11.6801C18.5526 11.3578 18.8086 10.9751 18.9832 10.5538C19.1578 10.1326 19.2477 9.68107 19.2477 9.22506C19.2477 8.76905 19.1578 8.31752 18.9832 7.89627C18.8086 7.47503 18.5526 7.09233 18.23 6.77006C17.9104 6.44929 17.5299 6.1956 17.1109 6.02387C16.6919 5.85215 16.2428 5.76586 15.79 5.77006C15.3358 5.76675 14.8855 5.85342 14.465 6.02505C14.0445 6.19669 13.6621 6.44989 13.34 6.77006L12.53 7.58006C12.3869 7.71581 12.1972 7.79149 12 7.79149C11.8028 7.79149 11.6131 7.71581 11.47 7.58006L10.66 6.77006C10.3395 6.44628 9.95791 6.18939 9.53733 6.01429C9.11675 5.83919 8.66558 5.74937 8.21001 5.75006Z"
                                            fill="#ffffff"
                                        />{" "}
                                    </g>
                                </svg>
                            </button>
                        </>
                    )
                ) : (
                    <>
                        <span className={`${styles.stat}`}>
                            <svg
                                width="2rem"
                                height="2rem"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g
                                    id="SVGRepo_tracerCarrier"
                                    srokeLinecap="round"
                                    SrokeLinejoin="round"
                                />

                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <g id="Warning / Shield_Warning">
                                        {" "}
                                        <path
                                            id="Vector"
                                            d="M12 8V12M20 10.165C20 16.7333 15.0319 19.6781 12.9258 20.6314L12.9231 20.6325C12.7016 20.7328 12.5906 20.7831 12.3389 20.8263C12.1795 20.8537 11.8215 20.8537 11.6621 20.8263C11.4094 20.7829 11.2972 20.7325 11.074 20.6314C8.9678 19.6781 4 16.7333 4 10.165V6.2002C4 5.08009 4 4.51962 4.21799 4.0918C4.40973 3.71547 4.71547 3.40973 5.0918 3.21799C5.51962 3 6.08009 3 7.2002 3H16.8002C17.9203 3 18.4796 3 18.9074 3.21799C19.2837 3.40973 19.5905 3.71547 19.7822 4.0918C20 4.5192 20 5.07899 20 6.19691V10.165ZM12.0498 15V15.1L11.9502 15.1002V15H12.0498Z"
                                            stroke="#FFFFFF"
                                            stroke-width="2"
                                            srokeLinecap="round"
                                            SrokeLinejoin="round"
                                        />{" "}
                                    </g>{" "}
                                </g>
                            </svg>
                            {attack}
                        </span>
                        <span className={`${styles.stat} ${styles.notPhones}`}>
                            {" "}
                            <svg
                                width="2rem"
                                height="2rem"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                <g
                                    id="SVGRepo_tracerCarrier"
                                    srokeLinecap="round"
                                    SrokeLinejoin="round"
                                />

                                <g id="SVGRepo_iconCarrier">
                                    {" "}
                                    <path
                                        d="M20.4037 12.5C20.778 11.6322 21 10.7013 21 9.71405C21 6 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12.7198 5.92016C12.3266 6.32798 11.6734 6.32798 11.2802 5.92016L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5 4 3 6 3 9.71405C3 10.7013 3.222 11.6322 3.59627 12.5M20.4037 12.5C18.395 17.1578 12 20 12 20C12 20 5.60502 17.1578 3.59627 12.5M20.4037 12.5L16.3249 12.5C16.1273 12.5 15.9483 12.3837 15.868 12.2031L14.4483 9.00872C14.2737 8.61588 13.7176 8.61194 13.5374 9.00226L11.436 13.5555C11.2603 13.9361 10.7223 13.9445 10.5348 13.5695L9.44721 11.3944C9.26295 11.0259 8.73705 11.0259 8.55279 11.3944L8.1382 12.2236C8.0535 12.393 7.88037 12.5 7.69098 12.5L3.59627 12.5"
                                        stroke="#FFFFFF"
                                        stroke-width="1.5"
                                        srokeLinecap="round"
                                        SrokeLinejoin="round"
                                    />{" "}
                                </g>
                            </svg>
                            {life}
                        </span>
                    </>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        userData: state.userData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPokemonToUserPokemons: (data) =>
            dispatch(addPokemonToUserPokemons(data)),
        deletePokemonFromUserPokemons: (data) =>
            dispatch(deletePokemonFromUserPokemons(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
