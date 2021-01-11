
function MGRivalPlayer()
{
    this.sprPlayer = new SpriteAnimation( 
        resourcePreLoader.GetImage("img/multi_rival.png"),
         156 , 222 , 4 , 8 );
    this.y = 255;
    this.isJumping = false;
    this.sprPlayer.SetPosition( 30, this.y );
}

MGRivalPlayer.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    
    this.sprPlayer.Render( Context );
}

MGRivalPlayer.prototype.Update = function( )
{
    this.sprPlayer.Update();
    
    if( this.isJumping == true)
    {
        this.y += this.jumpPower;
        this.jumpPower += 1.5;
        if( this.y >= 255 )
        {
            this.y = 255;   
            this.isJumping = false;         
        }
        this.sprPlayer.SetPosition( 30, this.y );
    }
}

MGRivalPlayer.prototype.Jump = function( )
{
    if( this.isJumping == false )
    {
        this.isJumping = true;
        this.jumpPower = - 20;           
    }
}

