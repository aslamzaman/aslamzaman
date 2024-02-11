
const MysqlRoutes = (tbl, datas, opt) => {

    const titleCase = (str) => {
        return str
            .split(' ')
            .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    const replaceQutation = datas.replaceAll('`','');  
    const splitData = replaceQutation.split(",");
    const data = splitData.map(s => s.trim());


    let dd = "";
    data.map((d, i) => {
        i === (data.length - 1)
            ? dd = dd + `${d}`
            : dd = dd + `${d}, `;
    }
    );

    let ddwahat = "";
    data.map((d, i) => {
        i === (data.length - 1)
            ? ddwahat = ddwahat + `?`
            : ddwahat = ddwahat + `?, `;
    }
    );


    let reqBodyInsert = "";
    data.map((d, i) => {
        i === (data.length - 1)
            ? reqBodyInsert = reqBodyInsert + `req.body.${d}`
            : reqBodyInsert = reqBodyInsert + `req.body.${d}, `;
    }
    );



    let reqBody = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? reqBody = reqBody + `req.body.${d}`
                : reqBody = reqBody + `req.body.${d}, `;
        }
    }
    );


    //------------------------------------------------------------------------

    let updateString = "";
    data.map((d, i) => {
        if (i > 0) {
            i === (data.length - 1)
                ? updateString = updateString + `${d}=?`
                : updateString = updateString + `${d}=?, `;
        }
    }
    );


    let createTable = data.map(d => `${d} TEXT`);


    const str = `    const express = require("express");
    ${opt === 'sqlite' ? 'const sqlite3 = require("sqlite3");' : 'const db = require("../utils/db");'}
    const router = express.Router();  
    ${opt === 'sqlite'?`const db = new sqlite3.Database("my_database.db")

    db.serialize(() => {
		db.run("CREATE TABLE IF NOT EXISTS ${tbl} (${createTable})");
	});`:''}

    // app.use("/${tbl}", require("./src/routes/${titleCase(tbl)}Route"));
    // ${datas}
    
    
    router.post("/insert_one", async (req, res) => {
        let sql = "INSERT INTO ${tbl} (${dd}) VALUES(${ddwahat})";
        await db.${opt === 'sqlite' ? 'run' : 'query'}(sql, [${reqBodyInsert}], (err) => {
            if (err) {
                res.json({ message: "Data inserting error!!" });            
                } else {
                res.json({ message: "Data inserted successfully." });
            }
        });
    })
    
    
    router.post("/update_one/:id", async (req, res) => {  
        let sql = "UPDATE ${tbl} SET ${updateString} WHERE id = ?";
        let paramsId = req.params.id;
        await db.${opt === 'sqlite' ? 'run' : 'query'}(sql, [${reqBody}, paramsId], (err) => {
            if (err) {
                res.json({ message: "Data updating error!!" });
                } else {
                res.json({ message: "Data updated successfully." });
            }
        });
    })
    
    
    router.delete("/delete_one/:id", async (req, res) => {
        let sql = "DELETE FROM ${tbl} WHERE id = ?";
        let paramsId = req.params.id;
        await db.${opt === 'sqlite' ? 'run' : 'query'}(sql, paramsId, (err) => {
            if (err) {
                res.json({ message: "Data deleting error!!" });
                } else {
                res.json({ message: "Data deleted successfully." });
            }
        });
    });
    
    
    router.get("/get_one/:id", async (req, res) => {
        await db.${opt === 'sqlite' ? 'get' : 'query'}("SELECT *FROM ${tbl} WHERE id = ?", req.params.id, (err, row) => {
            if (err) {
                res.json({ message: "No data found!" });
                } else {
                res.json(${opt === 'sqlite' ? 'row' : 'row[0]'});
            }
        });
    });
    
    
    router.get("/", async (req, res) => {
        await db.${opt === 'sqlite' ? 'all' : 'query'}("SELECT *FROM ${tbl} ORDER BY id DESC", (err, row) => {
            if (err) {
                res.json({ message: "No data found!" });
                } else {
                res.json(row);
            }
        });
    });
    
    module.exports = router;
    
    `;

    return str;
}

export default MysqlRoutes;