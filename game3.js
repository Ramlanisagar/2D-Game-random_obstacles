// level increment
// score incremet according to level
// speed incremet according to level 

function load_images_sound() 
{
    enemy_image = new Image;
    enemy_image.src = "enemy1.jpg";
    
    player_image = new Image;
    player_image.src = "player_image.png";
}

function isOverlap(rect1,rect2)
{
   if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y)
   {       
   return true; // collision detected!
   }
   return false;
}

function init() 
{
    canvas = document.getElementById("mycanvas");
    console.log(canvas);

    W = 600;
    H = 400;
   
    
    minHeight = 20;
    maxHeight = 200;
    minGap = 50;
    maxGap = 150;
    
    canvas.width = W;
    canvas.height = H;
    game_over = "false";
    key = null;
    
    pen = canvas.getContext('2d');
    console.log(pen);

    e1 = {
        x: 233,
        y: 200,
        w: 10,
        h: 200,
    };
    e2 = {
        x: 233,
        y: 200,
        w: 10,
        h: 200,
    };
    e3 = {
        x: 466,
        y: 200,
        w: 10,
        h: 200,
    }; 
    e4 = {
        x: 466,
        y: 200,
        w: 10,
        h: 200,
    };
    e5 = {
        x: 699,
        y: 200,
        w: 10,
        h: 200,
    };
    e6 = {
        x: 699,
        y: 200,
        w: 10,
        h: 200,
    };
    
    enemy = [e1, e2, e3 , e4, e5, e6]; // array of enemies
    
    player = {
    
         x : 20,
         y : H/2,
         w : 30,
         h : 30,
         score : 0,
         lives : 3,
         level : 0,
         gravity : 3,
    };
    
        window.addEventListener('keydown', function (e) {
            console.log("key pressed")
            key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            console.log("relived")
            key = false;
        })
}

function draw() 
{
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "green";
      
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
      
    for (let i = 0; i < enemy.length; i++) 
    { 
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
    pen.fillStyle = "white";
    pen.font = "30px roboto";
    pen.fillText("Score : " + player.score,20,30);
    pen.fillText("level : " + player.level,230,30);
    pen.fillText("lives : " + player.lives,480,30);
    
}

function update() 
{
    if(player.score > 30)
        player.level = 3;
    else if( player.score > 20)
        player.level = 2;
    else if (player.score > 10)
        player.level = 1;
    
    
    for( let i = 0; i < enemy.length; i++)
        {
            if(isOverlap(player,enemy[i]))
              {   
                    player.lives -= 1; 
                    player.x +=41;
              }
            if(player.lives < 1)
                {
                    console.log(player.lives);
                    game_over = true;                    
                }
        }
    
    for(let i = 0; i < enemy.length ;i++)
    {
        if(player.level == 3)        
            enemy[i].x -= 9;
        else if(player.level == 2)
            enemy[i].x -= 7;
        else if(player.level == 1)
            enemy[i].x -= 6;
        else if(player.level == 0)
            enemy[i].x -= 5;
    }
    
    if ( key == 38 && player.y > 0) {player.y -=7; }
    if ( key == 40 && player.y < 370) {player.y +=7; }
    
    if(player.y < 370) {player.y += player.gravity; }
    
    for(let i = 0; i < enemy.length ;i+=2)
    {
                if(enemy[i].x < -10)
                {
    enemy[i].x = 700;
    enemy[i+1].x = 700;  
    height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
    gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
    enemy[i].h = 700 - height - gap;   
    enemy[i].y = height + gap;
                    
    enemy[i+1].h = height;   
    enemy[i+1].y = 0;
                    
    if(player.level<3)                
    player.score +=2; 
    else
    player.score +=4;    
        
                }
    }
}


function gameloop()
{
    if(game_over == true)
        {   
            console.log("In vicky");
            alert( "Game_Over : lives = " + player.lives +"\nHigh Score = " + player.score+2 + "\nYour Score = " + player.score );
            clearInterval(f);
        }
    draw();
    update();
    console.log("In gameloop");
}

load_images_sound();
init();
var f = setInterval(gameloop, 100);
