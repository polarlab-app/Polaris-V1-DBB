const oracledb = require('oracledb');

(async () => {
  try {
    // Configure the connection
    await oracledb.initOracleClient({ libDir: 'C:/ADW/' }); // Set the path to the Oracle Instant Client library
    const connection = await oracledb.getConnection({
      user: 'ADMIN',
      password: 'Icdtwsd12345.',
      connectString: '(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.eu-frankfurt-1.oraclecloud.com))(connect_data=(service_name=g5ea52585f2762e_polaris_low.adb.oraclecloud.com))(security=(ssl_server_dn_match=yes)))'
    });

    // Execute a query
    const result = await connection.execute('SELECT 1 FROM dual');

    // Process the query result
    console.log('Query Result:', result.rows);

    // Release the connection
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();