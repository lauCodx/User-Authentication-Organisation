import Pool from "../config/db.connect";

const createTable = async() =>{
    const createUserTable = 
    `
    CREATE TABLE IF NOT EXISTS users (
    userId UUID PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) 
    
    );
    ` 

    const createOrganisationTable = 
    `
    CREATE TABLE IF NOT EXISTS organisations (
    orgId UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    userId UUID REFERENCES users(userId)
    )
    `

    try {

        await Pool.query(createUserTable)
        await Pool.query(createOrganisationTable);
        console.log('Table created successfully!')
        
    } catch (error) {
        console.error('Error creating table', error)

    }
}

export default createTable