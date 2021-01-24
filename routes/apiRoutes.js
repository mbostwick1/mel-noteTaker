
//LOAD DATA 
const dbJson = require("../db/db.json");

//ROUTING
module.exports = function(app) {

  // GET ROUTES
    app.get("/api/notes", function(req, res) {
        return res.json(dbJson);
    });

    // API POST Requests
    app.post("/api/notes", function(req, res) {
        const newNote = req.body;
        dbJson.push(newNote);

        fs.writeFile("../db/db.json", JSON.stringify(dbJson), function (err) {
            if (err) throw err;
            console.log("test"); 
        });

        return res.json(true);

    });
} 