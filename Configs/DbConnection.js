import mysql from 'mysql';
import databaseConfigurations from "../Utils/DataBaseConfigurations.js";

const dbConnection = mysql.createConnection(databaseConfigurations);

dbConnection.connect((error) => {
    if (error) {
      console.error("Error connecting to MySQL database:", error);
      return;
    }
  
    console.log("Connected to MySQL database!");
  });

  export default dbConnection;