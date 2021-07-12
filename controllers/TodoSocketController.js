const {response}= require('express');
const TodoSocket= require('../models/TodoSocket');


//***INDEX***
const index = async (req,res) => {
  // TodoSocket.find().sort({_id:-1})
  // .then(response=>{
  //   res.json({
  //     response:true,
  //     data:response
  //   })
  // })
  // .catch({
  // })
  const response = await TodoSocket.find().sort({_id:-1});
  // console.log(response)
    res.json({
      response:true,
      data:response
    })
}


//***STORE***
const store = (req,res) => {

  TodoSocket.create(req.body)
  .then(response=>{
    res.json({
      response:true
    })
  })

}

//***VIEW***
const view = (req,res) => {
  TodoSocket.findById(req.params.id)
  .then(response=>{

    let updateData = {
      status: true
    }

    TodoSocket.findByIdAndUpdate(req.params.id, {$set:updateData})
      .then(responsessss=>{
      console.log(true)
    })

    res.json({
      response:true,
      data:response
    })
  })
}


//***DELETE***
const del = (req,res) => {
  TodoSocket.findByIdAndRemove(req.params.id)
  .then(response=>{
    res.json({
      response:true
    })
  })
}


module.exports={index,store,view,del};
