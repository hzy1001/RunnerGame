function PGPlayer()
{
    this.sprPlayer = new SpriteAnimation( 
        resourcePreLoader.GetImage("img/game_player.png"),
         156 , 222 , 4 , 8 );
    this.Init();
}

PGPlayer.prototype.Init = function( )
{
    this.x = 50;
    this.y = 255;
    this.isJumping = false;
    this.jumpPower = 0;
    this.collisionBox 
    = {left: this.x + 40,top : this.y + 55, right: this.x + 100, bottom: this.y + 200 };
    
    this.Invalid();
}


PGPlayer.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    
    this.sprPlayer.Render( Context );
}

PGPlayer.prototype.Update = function( )
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
    }
    this.Invalid();
}

PGPlayer.prototype.Jump = function( )
{
    if( this.isJumping == false )
    {
        this.isJumping = true;
        this.jumpPower = - 20;           
    }
}

PGPlayer.prototype.Invalid = function( )
{
    this.sprPlayer.SetPosition( this.x, this.y );
    this.collisionBox 
    = {left: this.x + 40,top : this.y + 55, right: this.x + 100, bottom: this.y + 200 };
}

