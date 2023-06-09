// Models
const { User } = require("../db");

// ======================== Regex

const REGEX_USERNAME = /^[a-z0-9_]{3,20}$/;
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const REGEX_PASSWORD = /^(?=.*\d)(?=.*[A-Z])(?!.*\s).{6,15}$/;

// ======================== User Controllers

const getUserByCredentialsController = async (userData) => {
    const { email, password } = userData;

    // Email validations
    if (!email) {
        throw new Error("Email is required.");
    } else {
        if (!REGEX_EMAIL.test(email)) {
            throw new Error("Email is invalid.");
        }
    }

    // Password validations
    if (!password) {
        throw new Error("Password is required.");
    }

    // Search user
    const user = await User.findOne({
        where: { email: email, password: password },
        attributes: ["username", "id"],
    });

    if (user === null) {
        throw new Error("Invalid email or password.");
    } else {
        return user;
    }
};

const getAllUsersController = async () => {
    const users = await User.findAll({
        attributes: ["email", "username", "id"],
    });

    return users;
};

const createNewUserController = async (user) => {
    const { username, email, password } = user;

    // Username validations
    if (!username) {
        throw new Error("Username is required");
    } else {
        // Existance of username and email
        const usernameFind = await User.findOne({
            where: { username: username },
            attributes: ["username"],
        });
        const userExist = !(usernameFind === null);

        if (userExist) {
            throw new Error("Username is already in use.");
        } else {
            if (!REGEX_USERNAME.test(username)) {
                throw new Error(
                    "Username must be between 3 and 20 characters long, and can only contain lowercase letters, numbers and underscores."
                );
            }
        }
    }

    // Email validations
    if (!email) {
        throw new Error("Email is required.");
    } else {
        const emailFind = await User.findOne({
            where: { email: email },
            attributes: ["username"],
        });
        const emailExist = !(emailFind === null);
        if (emailExist) {
            throw new Error("Email is already in use.");
        } else {
            if (!REGEX_EMAIL.test(email)) {
                throw new Error("Email is invalid.");
            }
        }
    }

    // Password validations
    if (!password) {
        throw new Error("Password is required.");
    } else {
        if (!REGEX_PASSWORD.test(password)) {
            throw new Error(
                "Password must be between 6 and 15 characters long, and contain at least one uppercase letter, one number, and no spaces."
            );
        }
    }

    // Create user
    const newUser = await User.create(user);

    return newUser;
};

module.exports = {
    getUserByCredentialsController,
    getAllUsersController,
    createNewUserController,
};
