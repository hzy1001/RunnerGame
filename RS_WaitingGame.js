
function WaitMultiPlayGameState()
{ 
    gfwSocket.On( "start_game", function()
    {
        ChangeGameState( new MultiPlayGameState() );        
    });
}

WaitMultiPlayGameState.prototype.Init = function( )
{
    gfwSocket.Emit("want_game");
}

WaitMultiPlayGameState.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
        
    // 점수 표시
    Context.fillStyle = "#000000";
    Context.font = '45px Arial'; 
    Context.textBaseline = "top";
    Context.fillText( "Waiting. .", 5, 5 );    
}

WaitMultiPlayGameState.prototype.Update = function( )
{
    
}



