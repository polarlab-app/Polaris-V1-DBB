module.exports = {
    name: "Database SQL Query",

    description: "Executes an SQL query using the established Oracle database connection.",

    category: "Database Stuff",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes this block.",
            "types": ["action"]
        },
        {
            "id": "query",
            "name": "SQL Query",
            "description": "The SQL query to execute.",
            "types": ["text"]
        }
    ],

    options: [],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Query Result",
            "description": "The result of the executed SQL query.",
            "types": ["unspecified"]
        }
    ],

    async code(cache) {
        const oracledb = require('oracledb');

        await oracledb.initOracleClient({ libDir: 'C:/ADW/' }); // Set the path to the Oracle Instant Client library
        const connection = await oracledb.getConnection({
          user: 'ADMIN',
          password: 'Icdtwsd12345.',
          connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=g5ea52585f2762e_polaris_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
        });

        const query = this.GetInputValue("query", cache);

        try {
            // Execute the SQL query
            const result = await connection.execute(query);

            // Store the query result in the output
            this.StoreOutputValue(result, "result", cache);

            // Run the next block
            console.log(result)
            this.RunNextBlock("action", cache);
        } catch (error) {
            console.error("Error executing SQL query:", error);
        }
    }
};