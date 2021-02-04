//LOAD DATA
const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

//ROUTING
module.exports = function (app) {
  // GET ROUTES
  app.get("/api/notes", function (req, res) {
    res.json(data);
  });

  app.get("/api/notes/:id", function (req, res) {
    res.json(data[Number(req.params.id)]);
  });

  // API POST Requests
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    let uniqueId = data.length.toString();

    newNote.id = uniqueId;
    data.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(data), function (err) {
      if (err) throw err;
    });

    res.json(data);
  });

  // API DELETE NOTES

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;
    let newId = 0;

    data = data.filter((currentNote) => {
      return currentNote.id != noteId;
    });

    for (currentNote of data) {
      currentNote.id = newId.toString();
      newId++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
  });
};
