var express = require("express");
var router = express.Router();
var URL = require("url");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    port: "3306",
    database: "icon"
});
connection.connect();

/** GET users listing. */

/**
 * 添加icon
 */
router.get("/addIcon", (req, res, next) => {
    let params = URL.parse(req.url, true).query;
    let addSqlParams = [
        params.name || "",
        params.tag || "",
        params.classify || "",
        params.def || "",
        params.two_mul || "",
        params.three_mul || ""
    ];
    //SQL语句
    let search = "SELECT * FROM icon_list";
    let addIcon =
            "INSERT INTO icon_list (name,tag,classify,def,two_mul,three_mul) VALUES (?,?,?,?,?,?)";
    connection.query(addIcon, addSqlParams, (err, result) => {
        if (err) {
            console.log("[INSERT ERROR] - ", err.message);
            return;
        }
    });
    connection.query(search, (err, result) => {
        if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            return;
        }
        res.send({
            code: 1,
            data: result
        });
    });
});

router.get("/search", (req, res, next) => {
    let params = URL.parse(req.url, true).query;
    //SQL语句
    // console.log(params);
    // console.log(params.id, isNaN(params.id), params.search);
    
    let search = `SELECT * FROM icon_list
  ${isNaN(params.id) ? "" : " where classify=" + params.id}
    ${
            !!params.search
                    ? (isNaN(params.id) ? "where " : "and ") +
                    " name LIKE '%" +
                    params.search +
                    "%'"
                    : ""
            }`;
    console.log(search);
    connection.query(search, (err, result) => {
        if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            return;
        }
        res.send({
            code: 1,
            data: result
        });
    });
});

//分类查询
router.get("/getClassify", (req, res, next) => {
    let search = "SELECT * FROM classify ";
    connection.query(search, (err, result) => {
        if (err) {
            console.log("[SELECT ERROR] - ", err.message);
            return;
        }
        let returnData = [];
        result.forEach(val => {
            if (val.parent_id === 0) {
                returnData.push({
                    id: val.id,
                    value: val.id,
                    label: val.name,
                    parent_id: val.parent_id
                });
            }
        });
        returnData.map(val => {
            val.children = [];
            result.forEach(vals => {
                if (vals.parent_id === val.id) {
                    val.children.push({
                        id: vals.id,
                        value: vals.id,
                        label: vals.name,
                        parent_id: vals.parent_id
                    });
                }
            });
            return val;
        });
        res.send({
            code: 1,
            data: returnData
        });
    });
});

module.exports = router;
