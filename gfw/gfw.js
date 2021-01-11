function onGameInit() 
{   
    document.title = "보물을 향해!";
    
    GAME_FPS = 30;
    debugSystem.debugMode = true;
    
    // 리소스 프리로딩 추가
    resourcePreLoader.AddImage( "img/title_background.png" );   
    resourcePreLoader.AddImage( "img/title_start_off.png" );   
    resourcePreLoader.AddImage( "img/title_start_on.png" );   
    resourcePreLoader.AddImage( "img/title_battle_off.png" );   
    resourcePreLoader.AddImage( "img/title_battle_on.png" );   
    resourcePreLoader.AddImage( "img/title_ranking_off.png" );   
    resourcePreLoader.AddImage( "img/title_ranking_on.png" );   
    resourcePreLoader.AddImage( "img/title_credit_off.png" );   
    resourcePreLoader.AddImage( "img/title_credit_on.png" );   
    resourcePreLoader.AddImage( "img/game_background00.png" );   
    resourcePreLoader.AddImage( "img/game_background01.png" );   
    resourcePreLoader.AddImage( "img/game_background02.png" );   
    resourcePreLoader.AddImage( "img/game_background03.png" );   
    resourcePreLoader.AddImage( "img/game_crocodile.png" );   
    resourcePreLoader.AddImage( "img/game_box.png" );   
    resourcePreLoader.AddImage( "img/game_player.png" );  
    resourcePreLoader.AddImage( "img/game_gameover.png" );   
    resourcePreLoader.AddImage( "img/game_item_coin.png" );  
    resourcePreLoader.AddImage( "img/game_item_chest.png" );
    resourcePreLoader.AddImage( "img/multi_rival.png" );   
    resourcePreLoader.AddImage( "img/multi_win.png" ); 
    resourcePreLoader.AddImage( "img/multi_lose.png" ); 
    soundSystem.AddSound( "sound/background.mp3", 1 ); 
            
    // Socket.IO 사용 시 주석 해제
    new gfwSocket("http://127.0.0.1:9892");

    // 게임 초기 시작 상태 설정
    after_loading_state = new TitleState();
    setInterval( gameLoop, 1000 / GAME_FPS );  
}


function onGameDestroy() 
{   
    if( gfwSocket )
        gfwSocket.Disconnect();
}

window.addEventListener("load", onGameInit, false);
window.addEventListener("unload", onGameDestroy, false);
