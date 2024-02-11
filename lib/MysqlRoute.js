const express = require("express");
const router = express.Router();    
const db = require("../utils/db");


// app.use("/post", require("./src/routes/PostRoute"));
// id, name_en, name_bn
// SELECT post.id, post.name_en, post.name_bn FROM post LEFT JOIN tbl_2 ON post.col_id = tbl_2.id ORDER BY post.id DESC


router.post("/insert_one", async (req, res) => {
    let sql = "INSERT INTO post (name_en, name_bn) VALUES(?, ?)";
    await db.query(sql, [req.body.name_en, req.body.name_bn], (err) => {
        if (err) {
            res.json({ message: "Data inserting error!!" });            
            } else {
            res.json({ message: "Data inserted successfully." });
        }
    });
})


router.post("/update_one/:id", async (req, res) => {  
    let sql = "UPDATE post SET name_en = ?, name_bn = ? WHERE id = ?";
    let paramsId = req.params.id;
    await db.query(sql, [req.body.name_en, req.body.name_bn, paramsId], (err) => {
        if (err) {
            res.json({ message: "Data updating error!!" });
            } else {
            res.json({ message: "Data updated successfully." });
        }
    });
})


router.delete("/delete_one/:id", async (req, res) => {
    let sql = "DELETE FROM post WHERE id = ?";
    let paramsId = req.params.id;
    await db.query(sql, paramsId, (err) => {
        if (err) {
            res.json({ message: "Data deleting error!!" });
            } else {
            res.json({ message: "Data deleted successfully." });
        }
    });
});


router.get("/get_one/:id", async (req, res) => {
    await db.query("SELECT *FROM post WHERE id = ?", req.params.id, (err, row) => {
        if (err) {
            res.json({ message: "No data found!" });
            } else {
            res.json(row[0]);
        }
    });
});


router.get("/", async (req, res) => {
    await db.query("SELECT *FROM post ORDER BY id DESC", (err, row) => {
        if (err) {
            res.json({ message: "No data found!" });
            } else {
            res.json(row);
        }
    });
});

module.exports = router;
