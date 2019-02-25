import SocketIO from 'socket.io';
import logger from '../core/logger/app-logger';
import http from 'http';
export default (app)=>{
const server = http.createServer(app);
const io = SocketIO(server);
let users = [];
io.on('connection', (socket) => {
    let isNewUser = true;
    socket.on('chat',(data)=>{
        socket.join(data.room);
        users.map((user)=> {
            if(user.id===data.id){
                // console.log("not new user",data.id,data.value) ;
                isNewUser=false;   
            }
        } )
        if(isNewUser){
            users.push({id:data.id});
            socket.emit('loginSuccess',data);
            io.to(data.room).emit('add',data);
            logger.info( `room ${data.room} user ${data.id} connected ` );
        }else{
            socket.emit('loginFail',"");
        }
        // console.log(`${users.length} users connect`);
    
    });
    socket.on('sendMessage',function(data){
        // console.log(data);
        io.to(data.room).emit('receiveMessage',data)
    });
    socket.on('leaveRoom',(function(data){
        socket.leave(data.room);
        logger.info( `room ${data.room} user ${data.id} leaved room ` );
    }))
    
    socket.on('subscribeToTimer', (interval) => {
    // console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
        socket.emit('timer', new Date());
    }, interval);
  });
});
    return server
}