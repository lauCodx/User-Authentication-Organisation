export const createUser = "INSERT INTO users (firstName, lastName, email, password, phone ) VALUES ($1, $2, $3, $4, $5) RETURNING *" ;

export const getAllUser = "SELECT * FROM users";

export const checkIfUserExist = "SELECT * FROM users WHERE email = $1"