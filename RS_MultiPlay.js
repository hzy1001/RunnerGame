var playGameState;

function MultiPlayGameState()
{     
    this.background = new PGBackground();
    this.playground = new PGPlayground();
    this.player     = new PGPlayer();
    this.rival      = new MGRivalPlayer();
    playGameState = this;
    
    gfwSocket.On( "msg_in_game", function( msg )
    {
        switch( msg )
        {
            case "JUMP":
            playGameState.rival.Jump();
            break;
        }
    });
    
    gfwSocket.On( "result_game" , function( result )
    {
        playGameState.isGameOver = true;
        switch( result )
        {
            case "WIN":
            playGameState.isWin = true;   
            break;
            case "LOSE":
            playGameState.isWin = false;   
            break;
        }     
    });
    
    this.isGameOver  = false;
    this.isWin       = null;
}


MultiPlayGameState.prototype.Init = function( )
{
    
}

MultiPlayGameState.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
        
    // 후방 배경 화면 그리기
    this.background.RenderLayerBack();
    
    this.playground.Render();
    
    this.rival.Render();
    this.player.Render();
    // 전방 배경 화면 그리기
    this.background.RenderLayerFront();
    
    if( this.isGameOver )
    {
        if( this.isWin == true )
            Context.drawImage(resourcePreLoader.GetImage("img/multi_win.png"), 0, 0);
        else if( this.isWin == false )
            Context.drawImage(resourcePreLoader.GetImage("img/multi_lose.png"), 0, 0);
    }
}

MultiPlayGameState.prototype.Update = function( )
{
    if( this.isGameOver )
    {
        if( inputSystem.isKeyDown( 13 ) )
        {
            // 게임 재시작    
            ChangeGameState( new TitleState() );
        }
        return;
    }
    
    if( inputSystem.isKeyDown( 32 ) )
    {
        this.player.Jump();
        gfwSocket.Emit("msg_in_game","JUMP");
    }
        
    this.background.Update();
    this.playground.Update();
    this.player.Update();
    this.rival.Update();
    
    this.playground.CheckCollision( this.player.collisionBox );
}

MultiPlayGameState.prototype.Notification = function( msg )
{
    switch( msg )
    {
        case "COLLISION_ELEGATOR":
        // 악어와 충돌 : 내가 졌다는 메시지를 보내주자
        gfwSocket.Emit("msg_in_game", "GAME_OVER");
        break;
     /*   case "PLAYER_GET_COIN":
        // 코인을 습득하면 10점 추가
        break;*/
    };
} 



