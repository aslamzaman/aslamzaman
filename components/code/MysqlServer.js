const ServerString = () => {
    const dd = "console.log(`Server is running on http://localhost:${port}`);";
    let str = `    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require("cors");
      
  
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    const port = process.env.PORT || 8080;
    
      
    
    // Routes
    // app.use('/post', require('./src/routes/PostRoute'));
    

    
    app.use((req,res)=>{
      res.send({msg:"Page Not Found!"});
    });

    

    // Start the server
    app.listen(port, () => {
      ${dd}
    });
    
    `;
    return str;
  }
  

export default ServerString;