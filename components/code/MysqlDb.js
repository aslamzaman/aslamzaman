const MysqlDb = ()=>{
  let str = `const mysql = require('mysql');

  // Database connection configuration
  const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'my_database',
    });
    
    // Connect to MySQL
    db.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err;
      }
      console.log('Connected to MySQL');
    });
  
    module.exports = db;`;
  return str;
}

export default MysqlDb;