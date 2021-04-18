var express = require('express');
var router = express.Router()
var mongojs = require('mongojs');
var db = mongojs(
  "tasklist",
  ['tasks']
)

//Get All Tasks
router.get("/tasks",(req,res,next)=>{
  db.tasks.find({},{_id:1, title:1},(err,tasks)=>{
    if (err) {
      res.send(err)
    }

    var data = []
    Object.keys(tasks).forEach((key) => {
      var val = tasks[key]
      data.push([val.title,val._id])
    })
    res.send(data)
  })
})

//Add Data
router.post('/tasks',(req,res,next) =>{
  var task = req.body
  if (!task.title) {
    res.status(400)
    res.json({
      error: "Bad Data"
    })
  }else {
    db.tasks.save(task,(err, task)=>{
      if (error) {
        res.send(err)
      }else {
        res.json(task)
      }
    })
  }
})

//Delete data
router.delete('/tasks/:id',(req,res,next)=>{
  db.tasks.delete({_id: mongojs.ObjectId(req.params.id)}, (err, task) =>{
    if (err) {
      res.send(err)
    }else {
      res.json(task)
    }
  })
})

//Update Data
router.put('/task/:id',(req,res,next)=>{
  var task = req.body
  var updTask = {}

  if (task.title) {
    upd.title = task.title
  }

  if (!updTask) {
    res.status(400)
    res.json({
      error: "Bad Data"
    })
  }else {
    db.tasks.update({_id: mongojs.ObjectId(req.params.id)},
      updTask,
      {},
      (err, task) =>{
        if (err) {
          res.send(err)
        }else {
          res.json(task)
        }
      })
  }
})

module.exports = router
