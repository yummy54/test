const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const parkings = [
  { id : "논현동", name: "논현로131길"},
  { id : "삼성동", name: "테헤란로69길"},
  { id : "신사동", name: "언주로171길"}
];

// simple api
app.get("/Information", (req, res) => {
  res.send("원하는 위치의 주차장들을 안내해줍니다");
});

// request param X, response O
app.get("/api/users", (req, res) => {
  res.json({ok:true, users:users});
})

// Query param, request param O, response O
app.get("/api/users/user", (req, res) => {
  const user_id = req.query.user_id
  const user = users.filter(data => data.id == user_id);
  res.json({ok:false, users:user});
})

// path param, request param O, response O
app.get("/api/users/:user_id", (req, res) => {
  const user_id = req.params.user_id
  const user = users.filter(data => data.id == user_id);
  res.json({ok:false, users:user});
})

// post, request body, response O
app.post("/api/users/userBody", (req, res) => {
  const user_id = req.body.id
  const user = users.filter(data => data.id == user_id);
  res.json({ok:true, users:user});
})

// post, request body, response O
app.post("/api/users/add", (req, res) => {
  const { id, name } = req.body
  const user = users.concat({id, name});
  res.json({ok:true, users:user});
})

// put, request body, response O
app.put("/api/users/update", (req, res) => {
  const { id, name } = req.body
  const user = users.map(data => {
    if(data.id == id) data.name = name
    return {
      id : data.id,
      name : data.name
    }
  })
  res.json({ok:true, users:user});
})

// patch, request path param & body, response O
app.patch("/api/user/update/:user_id", (req, res) => {
  const { user_id } = req.params
  const { name } = req.body
  const user = users.map(data => {
    if(data.id == user_id) data.name = name
    return {
      id : data.id,
      name : data.name
    }
  })
  res.json({ok:true, users:user});
})

// delete, request body, response O
app.delete("/api/user/delete", (req, res) => {
  const { user_id } = req.body
  const user = users.filter(data => data.id != user_id);
  res.json({ok:true, users:user});
})

module.exports = app;
