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
    description VARCHAR(255),
    orgUserId UUID REFERENCES users(userId)
    )
    `

    const createUsersOrganisationsTable = `
    CREATE TABLE IF NOT EXISTS users_organisations (
    user_id UUID REFERENCES users(userId),
    org_id UUID REFERENCES organisations(orgId),
    PRIMARY KEY (user_id, org_id)
    )
    `;
    try {

        await Pool.query(createUserTable);
        await Pool.query(createOrganisationTable);
        await Pool.query( createUsersOrganisationsTable);

        console.log('Table created successfully!')
        
    } catch (error) {
        console.error('Error creating table', error)

    }
}

export default createTable