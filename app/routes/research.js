const ResearchDAO = require("../data/research-dao").ResearchDAO;
const needle = require("needle");
const { environmentalScripts } = require("../../config/config");

function ResearchHandler(db) {
  "use strict";
  const researchDAO = new ResearchDAO(db);

  this.displayResearch = (req, res) => {
    if (req.query.symbol) {
      const url = req.query.url + req.query.symbol;
      return needle.get(url, (error, newResponse, body) => {
        if (error || !newResponse) {
          console.error("Error fetching data:", error);
          return res.status(500).send("Error fetching data");
        }
        if (newResponse.statusCode !== 200) {
          console.error("Failed to fetch data:", newResponse.statusCode);
          return res.status(newResponse.statusCode).send("Failed to fetch data");
        }
        return res.render("research", { body });
      });
    } else {
      return res.render("research", { body: "" });
    }
  };
};
module.exports = ResearchHandler;