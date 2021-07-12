const express = require('express');
const router = express.Router();



const TodoSocket= require('../models/TodoSocket');
const TodoSocketController = require('../controllers/TodoSocketController');


router.get('/',TodoSocketController.index);
router.post('/',TodoSocketController.store);
router.get('/:id',TodoSocketController.view);
router.get('/delete/:id',TodoSocketController.del);





// module.exports = router;

module.exports = function (io) {


    io.on("connect", async (socket) => {
      // console.log("User connected");

      //GET ALL TODO DATA

      // console.log(response)

      setInterval(async function(){
        const response = await TodoSocket.find().sort({_id:-1});
        socket.emit("all_todos", response);
      }, 1000);



      socket.emit("now", {
        message:'Working nicesssss'
      });

      //emit all todolist
      // TodoSocket.find().sort({_id:-1})
      // .then(response=>{
      //   console.log(response)
      // })
      // socket.emit("now", {
      //   message:'Working nicesssss'
      // });

    });





//     io.on("connect", (socket) => {
//
//     socket.on("join", async (gameId) => {
//
//         try {
//             let result = await collection.findOne({ "_id": gameId });
//             if(!result) {
//                 await collection.insertOne({ "_id": gameId, messages: [] });
//             }
//
//             socket.join(gameId);
//             socket.emit("joined", gameId);
//             socket.activeRoom = gameId;
//
//         } catch (e) {
//             console.error(e);
//         }
//     });
//
//     socket.on("message", (message) => {});
// });



    return router;
};
