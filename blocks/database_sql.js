module.exports = {
    name: "Database SQL Connection",

    description: "Establishes a connection to the Oracle database.",

    category: "Database Stuff",

    auto_execute: true,

    inputs: [],

    options: [
        {
            "id": "host",
            "name": "Host",
            "description": "The host address of the Oracle database.",
            "types": ["text"]
        },
        {
            "id": "port",
            "name": "Port",
            "description": "The port number of the Oracle database.",
            "types": ["text"]
        },
        {
            "id": "user",
            "name": "User",
            "description": "The username for the Oracle database connection.",
            "types": ["text"]
        },
        {
            "id": "password",
            "name": "Password",
            "description": "The password for the Oracle database connection.",
            "types": ["text"]
        },
        {
            "id": "service",
            "name": "Service Name",
            "description": "The service name for the Oracle database connection.",
            "types": ["text"]
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
    ],

    async code(cache) {
        const oracledb = require("oracledb");

        const user = "ADMIN";
        const password = "Icdtwsd12345.";

        const connectionConfig = {
            user: user,
            password: password,
            connectString: `(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1521)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=g5ea52585f2762e_polaris_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))`
        };

        try {
            // Establish the database connection
            const connection = await oracledb.getConnection(connectionConfig);
            cache.dbConnection = connection; // Store the connection in cache
            
            console.log("Connected to Oracle database.");
            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error connecting to Oracle:", error);
        }
    }
};