export const createUser = "INSERT INTO users (userId, firstName, lastName, email, password, phone ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *" ;

export const getAllUser = "SELECT * FROM users";

export const checkIfUserExist = "SELECT * FROM users WHERE email = $1 ";

export const getUserById = "SELECT * FROM users WHERE userId = $1"
