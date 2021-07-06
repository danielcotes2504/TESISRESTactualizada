const express = require("express");
const router = express.Router();

const request = require("request");

var port = process.env.PORT1 || 8000;
//var hostURL = "http://192.168.20.42:" + port;
var hostURL = "http://localhost:" + port;
router.get("/:user", (req, res) => {
  const { user } = req.params;
  const uri = hostURL + "/projects/" + user;

  request.get(uri, (err, resp, body) => {
    // body = JSON.parse(body);

    if (err || resp.status == 500) {
      res.status(500).send({ ERROR: "Error saving" });
    } else {
      res.status(resp.statusCode).send(body);
    }
  });
});

router.post("/:user", (req, res) => {
  const { user } = req.params;
  const { project } = req.body;
  const uriFind = hostURL + "/projects/" + user + "/" + project;
  const uriSave = hostURL + "/projects/" + user;

  request.get(uriFind, (err, resp, body) => {
    body = JSON.parse(body);

    if (err || resp.status == 500) {
      res.status(500).send({ ERROR: "Error saving" });
    } else {
      if (body.length) {
        res.status(400).send({ ERROR: "Project already exists" });
      } else {
        request.post(
          { url: uriSave, body: req.body, json: true },
          (err, resp, body) => {
            if (err || resp.statusCode == 500) {
              res.status(500).send({ ERROR: "Error saving" });
            } else {
              res.status(resp.statusCode).send(body);
            }
          }
        );
      }
    }
  });
});

router.put("/:user/:project", (req, res) => {
  const { user } = req.params;
  const { project } = req.params;
  const newProject = req.body.project;

  const uriFind = hostURL + "/projects/" + user + "/" + newProject;
  const uriPut = hostURL + "/projects/" + user + "/" + project;

  request.get(uriFind, (err, resp, body) => {
    body = JSON.parse(body);

    if (err || resp.status == 500) {
      res.status(500).send({ ERROR: "Error updating" });
    } else {
      if (body.length) {
        res.status(400).send({ ERROR: "Project already exists" });
      } else {
        request.put(
          { url: uriPut, body: req.body, json: true },
          (err, resp, body) => {
            if (err || resp.statusCode == 500) {
              res.status(500).send({ ERROR: "Error updating" });
            } else {
              res.status(resp.statusCode).send(body);
            }
          }
        );
      }
    }
  });
});

router.delete("/:user/:project", (req, res) => {
  const { user } = req.params;
  const { project } = req.params;
  const uri = hostURL + "/projects/" + user + "/" + project;

  request.del(uri, (err, resp, body) => {
    body = JSON.parse(body);

    if (err || resp.statusCode == 500) {
      res.status(500).send({ ERROR: "Error removing" });
    } else {
      res.status(resp.statusCode).send(body);
    }
  });
});

module.exports = router;
