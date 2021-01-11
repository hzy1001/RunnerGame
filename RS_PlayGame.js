var playGameState;

function PlayGameState()
{
    this.background = new PGBackground();
    this.playground = new PGPlayground();
    this.player     = new PGPlayer();
    this.score      = 0;
    this.isGameOver = false;
    playGameState = this;
}


PlayGameState.prototype.Init = function( )
{
    
}

PlayGameState.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    
    // 후방 배경 화면 그리기
    this.background.RenderLayerBack();
    
    this.playground.Render( );
    
    this.player.Render( );

    // 전방 배경 화면 그리기
    this.background.RenderLayerFront();
    
    // 점수 표시
    Context.fillStyle = "#000000";
    Context.font = '45px Arial'; 
    Context.textBaseline = "top";
    Context.fillText( "SCORE :" + this.score, 5, 5 );

    if( this.isGameOver )
    {
        Context.drawImage(resourcePreLoader.GetImage("img/game_gameover.png"), 0, 0);
    }
}


PlayGameState.prototype.Update = function( )
{
    if( this.isGameOver )
    {
        if( inputSystem.isKeyDown( 13 ) )
        {
            // 게임 재 시작    
            this.Restart();
        }
        return;
    }
    
    if( inputSystem.isKeyDown( 32 ) )
    {
        this.player.Jump();
    }
    
    this.background.Update();
    this.playground.Update();
    this.player.Update();
    
    this.playground.CheckCollision( this.player.collisionBox );
}


PlayGameState.prototype.Restart = function( )
{
    this.background.Init();
    this.playground.Init();
    this.player.Init();
    
    this.score      = 0;
    this.isGameOver = false;    
}


PlayGameState.prototype.Notification = function( msg )
{
    switch( msg )
    {
        case "COLLISION_ELEGATOR":
        // 악어와 충돌 : 게임 오버
        this.isGameOver = true;
        FB.ui(
                  {
                   method: 'feed',
                   name: '보물을 찾아서!! ',
                   caption: '기록 정보',
                   description: (
                      '테스트용 게임에서  ' +
                      this.score +
                      '점을 기록하였습니다!!'
                   ),
                   link: 'http://apps.facebook.com/runnergame_hanb/',
                   picture: 'http://lancekun.iptime.org:8080/runnergame/img_facebook_feed.png'
                  },
                  function(response) {
                  }
               );
        break;
        case "PLAYER_GET_COIN":
        // 코인을 습득하면 10점 추가
        this.score += 10;
        break;
    }
}


