import {Client} from 'pg'
const client = new Client({
    host : 'localhost',
    port : 5432,
    database : 'appdb',
    user : 'postgres',
    password : 'Abhishek@2512'
})

async function getUsers(username:string , email : string, password : string) {
    try {
        await client.connect()

        const inserQuery = `
                                INSERT INTO users (username, email, password) 
                                VALUES ($1 , $2 , $3)
                            ` 

        const users = await client.query(inserQuery , [username , email , password])
        console.log(users.rowCount);

    } catch (error: any) {
        console.log(error.message);
    }finally{
        await client.end(); //todos=>  Close the client connection
    }
}

getUsers('onny' , 'o@' , 'onny')