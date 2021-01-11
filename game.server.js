// 서버 시작
var socketio = require( "socket.io" );
var http = require( "http" );

var server = http.createServer( 
function( request, response )
{
    response.end('Hello RunnerGame'); 
});
server.listen( 9892, function()
{
    console.log("RunnerGame Server Started port:9892");
});
var io = socketio.listen( server );
io.set( "log level", 1 );

// 클라이언트 접속
io.sockets.on("connection", function( socket )
{
    console.log( "[Client Connected] " );
    var player =  new Player( socket.id );
    socket.set("user_data", player );
    arrPlayers.push( player );
    
    socket.on('disconnect',function()
    {    
        var player;
        socket.get( "user_data", function( error, user_data )
        {
            player = user_data;
        });
        for( var i = 0; i < arrPlayers.length; i++ )
        {
            if( arrPlayers[i].id == player.id )
            {
                arrPlayers.splice( i, 1 );
                console.log( "[Client Disconnected] 현재 접속 중인 플레이어 수 :" + arrPlayers.length );                   
            }    
        }
    } );


    // 게임을 원한다
    socket.on("want_game", function( data )
    {
        var player;
        socket.get( "user_data", function( error, user_data )
        {
            player = user_data;
        });
        player.isWantGame = true;
        for( var i = 0; i < arrPlayers.length; i++ )
        {
            if( arrPlayers[i].id == player.id )
                continue;
            if( arrPlayers[i].isWantGame == true )
            {
                console.log( "[Start Game]");
                player.isWantGame = false;
                arrPlayers[i].isWantGame = false;
                
                player.rival_id = arrPlayers[i].id;
                arrPlayers[i].rival_id = player.id;
                
                io.sockets.sockets[player.id].emit("start_game");
                io.sockets.sockets[arrPlayers[i].id].emit("start_game");
            }
        }
    });
    // 멀티 게임 내에 발생하는 정보 알림
    socket.on("msg_in_game", function( msg )
    {
        var player;
        socket.get( "user_data", function( error, user_data )
        {
            player = user_data;
        });
        switch( msg )
        { 
            case "GAME_OVER":
            io.sockets.sockets[player.rival_id].emit("result_game", "WIN");
            io.sockets.sockets[player.id].emit("result_game", "LOSE");
            console.log( "[End Game]");
            break;  

            case "JUMP":
            io.sockets.sockets[player.rival_id].emit("msg_in_game", "JUMP");            
            break;  
        };
    });
});

// 게임 
function Player( id )
{
    this.id = id;
    this.isWantGame = false;
    this.rival_id = 0;
}

var arrPlayers = new Array();


 