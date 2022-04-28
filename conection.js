
const user = 'root';
const pass = 'awdc123';
const server ='localhost';
const bd = 'Investimentos';

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        console.log("Já está conectado!");
        return global.connection;
    }

    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://"+user+":"+pass+"@"+server+":3306/"+bd);
    global.connection = connection;
    return connection;
}