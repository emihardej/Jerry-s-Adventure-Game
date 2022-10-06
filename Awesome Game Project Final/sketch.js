/*

The AWESOME Game Project
----------------------------------------------------------------------------------------------------------------------

EXTENSIONS:
1. Sound - I have added a soundscape featuring background music and other sound effects. I faced the challenge of finding sounds that would fit in and work well with the other sounds I had chosen. I also found it difficult figuring out how to make certain sounds play how I wanted eg. only once, different tempo/ frequency, on a loop ect. However I learnt with practising and referring to the p5.js library online how to change the sounds to my desire.
Sound Credit:
-Background music: "Groove Music" by Benjamin Mastripolito  https://freesound.org/people/Lemoncreme/sounds/203099/
-Running sound: "Running, Snow, A.wav" by Inspector  https://freesound.org/people/InspectorJ/sounds/421022/
-Level Complete sound: "Jingle Achievement 01" by LittleRobotSoundFactory  https://freesound.org/people/LittleRobotSoundFactory/sounds/270330/
-Falling sound: "Retro Falling Down SFX" by suntemple  https://freesound.org/people/suntemple/sounds/253173/
-Collection crunch/bite sound: "Crunchy Bite 001" by yottasounds  https://freesound.org/people/yottasounds/sounds/232133/
-Game over sound: "Gamepack1- Mystery failed" by Gameloops  https://freesound.org/people/Gameloops/sounds/394485/
-Default Jump sound

2. Enemies - I have added rats as an enemy character to my game. Because of the way the character is drawn I found it difficult to change the direction they face when moving back and forth. I practised using different number operations to impliment this.

-----------------------------------------------------------------------------------------------------------------------
*/

// ----------------
// Global Variables
// ----------------
    var scrollPos;

    var gameChar_x;
    var gameChar_y;
    var floorPos_y;
    var gameChar_world_x;

    var isLeft;
    var isRight;
    var isFalling;
    var isPlummeting;
    var isJumping;

    var canyon;
    var collectable;

    var game_score;
    var flagpole;
    var lives;

    var enemies;
 
    var backgroundSound;
    var jumpSound;
    var runningSound;
    var fallingSound;
    var levelWinSound;
    var gameOverSound;
    var collectSound;

//----------------
// Preload Sounds
//----------------

function preload()
    {
        soundFormats('mp3','wav');

        backgroundSound = loadSound('assets/backgroundmusic.wav');
        jumpSound = loadSound('assets/jump.wav');
        runningSound = loadSound('assets/running.wav');
        fallingSound = loadSound('assets/falling.wav'); //change maybe?
        levelWinSound = loadSound('assets/win.wav');
        gameOverSound = loadSound('assets/gameover.wav');
        collectSound = loadSound('assets/collect.wav');

        backgroundSound.setVolume(0.3);
        jumpSound.setVolume(0.8 );
        runningSound.setVolume(0.2);
        fallingSound.setVolume(0.8);
        levelWinSound.setVolume(0.4);
        gameOverSound.setVolume(1);
        collectSound.setVolume(0.8);
    }

//-------
// Setup
//-------
function setup()
    {
        createCanvas(1024, 576);
        backgroundSound.loop();
        floorPos_y = height * 3/4;
        lives = {length: 3, x_pos: 900, y_pos: 30}
        startGame();
    }

function startGame()
    {
        gameChar_x = width/2;
        gameChar_y = floorPos_y;

        // Variable to control the background scrolling
        scrollPos = 0;

        // Real position of the gameChar variable in the game world
        gameChar_world_x = gameChar_x - scrollPos;

        // Boolean variables to control the movement of the game character
        isLeft = false;
        isRight = false;
        isFalling = false;
        isPlummeting = false;
        isJumping = false;
        
        // Initialise arrays of scenery objects
        trees_x = [200, 800, 1000, 1500, 1750, 2100, 2500, 2650, 2950, 3500, 3600, 4150, 4250, 4550, 4950];

        clouds = [
            {x_pos: 100, y_pos: 150},
            {x_pos: 800, y_pos: 100},
            {x_pos: 1300, y_pos: 200},
            {x_pos: 1900, y_pos: 100},
            {x_pos: 2700, y_pos: 200},
            {x_pos: 3600, y_pos: 150},
            {x_pos: 3900, y_pos: 150},
            {x_pos: 4300, y_pos: 100},
            {x_pos: 4800, y_pos: 180},
            {x_pos: 5100, y_pos: 150}
                 ];

        mountains_x = [0, 900, 2400, 3750, 4600];

        canyon = [
            {x_pos: 600, width: 700},
            {x_pos: 1100, width: 1200},
            {x_pos: 1950, width: 2050},
            {x_pos: 3050, width: 3150},
            {x_pos: 3300, width: 3400},
            {x_pos: 3900, width: 4000},
            {x_pos: 4300, width: 4400},
            {x_pos: 4800, width: 4900}

        ];

        collectable = [
            {x_pos: 400, y_pos: 400, isFound: false},
            {x_pos: 800, y_pos: 400, isFound: false},
            {x_pos: 1000, y_pos: 400, isFound: false},
            {x_pos: 1150, y_pos: 300, isFound: false},
            {x_pos: 1300, y_pos: 400, isFound: false},
            {x_pos: 1600, y_pos: 400, isFound: false},
            {x_pos: 1800, y_pos: 400, isFound: false},
            {x_pos: 2000, y_pos: 300, isFound: false},
            {x_pos: 2100, y_pos: 400, isFound: false},
            {x_pos: 2400, y_pos: 400, isFound: false},
            {x_pos: 2550, y_pos: 300, isFound: false},
            {x_pos: 2950, y_pos: 400, isFound: false},
            {x_pos: 3250, y_pos: 400, isFound: false},
            {x_pos: 3350, y_pos: 300, isFound: false},
            {x_pos: 3800, y_pos: 400, isFound: false},
            {x_pos: 4100, y_pos: 400, isFound: false},
            {x_pos: 4350, y_pos: 300, isFound: false},
            {x_pos: 4500, y_pos: 400, isFound: false},
            {x_pos: 4700, y_pos: 400, isFound: false},
            {x_pos: 4850, y_pos: 300, isFound: false},
        ];

        game_score = 0;

        flagpole = {isReached: false, x_pos: 5000};

        enemies = [];
        enemies.push(new enemy(250, floorPos_y - 10, 100));
        enemies.push(new enemy(1450, floorPos_y - 10, 100));
        enemies.push(new enemy(2550, floorPos_y - 10, 100));
        enemies.push(new enemy(3700, floorPos_y - 10, 100));
        enemies.push(new enemy(4600, floorPos_y - 10, 100));
    }

// ---------------------
// Draw functions
// ---------------------
function draw()
    {   
        // Sky
        background(150, 150, 240);

        // Ground
        noStroke();
        fill(47,79,79);
        rect(0, floorPos_y, width, height/4);

        push()
        
        translate(scrollPos, 0);

        drawClouds();

        drawMountains();

        drawTrees();

        renderFlagpole();

        // Canyons
        for(var i = 0 ; i < canyon.length ; i++)
            { 
                drawCanyon(canyon[i]);
                checkCanyon(canyon[i]);  
            }

        // Collectable items
        for(var i = 0 ; i < collectable.length ; i++)
            {
                if(collectable[i].isFound == false)
                    {
                        drawCollectable(collectable[i]);
                        checkCollectable(collectable[i]);
                    }
            }

        // Enemies.
        for(var i = 0 ; i < enemies.length ; i++)
            {
                enemies[i].draw();
            }

        pop()

        // Draw game character.
        drawGameChar();

        // Logic to make the game background scroll
        if(isLeft)
            {
                if(gameChar_x > width * 0.2)
                    {
                        gameChar_x -= 5;
                    }
                else
                    {
                        scrollPos += 5;
                    }
            }

        if(isRight)
            {
                if(gameChar_x < width * 0.8)
                    {
                        gameChar_x  += 5;
                    }
                else
                    {
                        scrollPos -= 5; // negative for moving against the background
                    }
            }

        if(isJumping == true) 
            {
                gameChar_y -= 160 ;
            }

        if(gameChar_y >= 0)
            {
                isJumping = false;
            }

        if(gameChar_y != floorPos_y)
            { 
                gameChar_y += 5; 
                isFalling = true;
            }
        else
            {
                isFalling = false;
            }

        // Logic to make the game character rise and fall.
        if(isPlummeting == true)
            {
                gameChar_y += 4;
            }

        // End of level logic       
        if(flagpole.isReached == false)
            {
                checkFlagpole();

            }
        else
            {   
                noStroke()
                textSize(30);
                text("Level Complete!", 400, height/2);
                textSize(12);
                text("Refresh page to try again", 435, 315);
            }

        checkPlayerDie();

        // Update real position of gameChar
        gameChar_world_x = gameChar_x - scrollPos;

        //Game Score graphic
        fill(255);
        noStroke();
        textSize(20);
        textStyle(BOLD);
        text("Score: " + game_score + "/" + collectable.length, 20, 30);

        //Lives Graphic
        drawLifeToken();
    }


// ---------------------
// Key control functions
// ---------------------

function keyPressed()
    {
        if(keyCode == 37)
            {
                isLeft = true;
                runningSound.play();
            }
        else if(keyCode == 39)
            {
                isRight = true;
                runningSound.play();
            }
        else if(keyCode == 32 && gameChar_y == floorPos_y)
            {
                isJumping = true;
                jumpSound.rate(1.3);
                jumpSound.play();
            }
    }

function keyReleased()
    {
        if(keyCode == 37)
            {
                isLeft = false;
                runningSound.stop();
            }
        else if(keyCode == 39)
            {
                isRight = false;
                runningSound.stop();
            }
        else if(keyCode == 32)
            {
                isFalling = false;
            }
    }

// ----------------------------------------------
// Game character render function (All positions)
// ----------------------------------------------
function drawGameChar()
    {
        // Jumping/Falling left
        if(isLeft && isFalling)
            {
                fill(0);
                stroke(210,180,140);
                strokeWeight(1.5)
                ellipse(gameChar_x - 2, gameChar_y - 15 , 10, 25);
                ellipse(gameChar_x + 10, gameChar_y - 15, 10, 10);
                ellipse(gameChar_x, gameChar_y - 31, 30, 30);
                ellipse(gameChar_x - 5, gameChar_y - 55, 30, 30);
                ellipse(gameChar_x - 15, gameChar_y - 27, 5, 7);
                ellipse(gameChar_x + 7, gameChar_y - 45, 10, 35);
                fill(210, 105, 30);
                ellipse(gameChar_x - 9, gameChar_y - 57, 5, 5);
                fill(255);
                rect(gameChar_x - 18, gameChar_y - 47, 3, 5);
                fill(255, 228, 225);
                triangle(gameChar_x - 18, gameChar_y - 49, 
                         gameChar_x - 17, gameChar_y - 46, 
                         gameChar_x - 15 , gameChar_y - 46);
            }
        
        // Jumping/Falling right
	   else if(isRight && isFalling)
            {
                fill(0);
                stroke(210,180,140);
                strokeWeight(1.5)
                ellipse(gameChar_x, gameChar_y - 15, 10, 25);
                ellipse(gameChar_x - 10, gameChar_y - 15, 10, 10);
                ellipse(gameChar_x, gameChar_y - 31, 30, 30);
                ellipse(gameChar_x + 5, gameChar_y - 55, 30, 30);
                ellipse(gameChar_x + 15, gameChar_y - 27, 5, 7);
                ellipse(gameChar_x - 7, gameChar_y - 45, 10, 35);
                ellipse(gameChar_x + 9, gameChar_y - 57, 5, 5);
                fill(255);
                rect(gameChar_x + 16, gameChar_y - 47, 3, 5);
                triangle(gameChar_x + 18, gameChar_y - 49, 
                         gameChar_x + 17, gameChar_y - 46, 
                         gameChar_x + 15 , gameChar_y - 46);        
            }
         
        // Running left
	   else if(isLeft)
            {
                fill(0);
                stroke(210,180,140);
                strokeWeight(1.5)
                ellipse(gameChar_x, gameChar_y - 24, 30, 30);
                ellipse(gameChar_x - 5, gameChar_y - 50, 30, 30);
                ellipse(gameChar_x - 2, gameChar_y - 7, 25, 10);
                ellipse(gameChar_x + 15, gameChar_y - 15, 10, 10);
                ellipse(gameChar_x - 15, gameChar_y - 22, 5, 7);
                ellipse(gameChar_x + 7, gameChar_y - 40, 10, 35);
                ellipse(gameChar_x - 9, gameChar_y - 52, 5, 5);
                fill(255);
                rect(gameChar_x - 18, gameChar_y - 42, 3, 5);
                triangle(gameChar_x - 18, gameChar_y - 44, 
                         gameChar_x - 17, gameChar_y - 41, 
                         gameChar_x - 15 , gameChar_y - 41);
            }
        
        // Running right
	   else if(isRight)
            {
                fill(0);
                stroke(210,180,140);
                strokeWeight(1.5)
                ellipse(gameChar_x, gameChar_y - 24, 30, 30);
                ellipse(gameChar_x + 5, gameChar_y - 50, 30, 30);
                ellipse(gameChar_x + 2, gameChar_y - 7, 25, 10);
                ellipse(gameChar_x - 15, gameChar_y - 15, 10, 10);
                ellipse(gameChar_x + 15, gameChar_y - 22, 5, 7);
                ellipse(gameChar_x - 7, gameChar_y - 40, 10, 35);
                ellipse(gameChar_x + 9, gameChar_y - 52, 5, 5);
                fill(255);
                rect(gameChar_x + 16, gameChar_y - 42, 3, 5);
                triangle(gameChar_x + 18, gameChar_y - 44, 
                         gameChar_x + 17, gameChar_y - 41, 
                         gameChar_x + 15 , gameChar_y - 41);
            }
    
        // Jumping/Falling front facing
	   else if(isFalling || isPlummeting || isJumping)
            {
                fill(0);
                stroke(210,180,140);
                strokeWeight(1.5);
                ellipse(gameChar_x - 6, gameChar_y - 8, 10, 20);
                ellipse(gameChar_x + 6, gameChar_y - 8, 10, 20);
                ellipse(gameChar_x, gameChar_y - 29, 30, 30);
                ellipse(gameChar_x, gameChar_y - 55, 30, 30);
                ellipse(gameChar_x - 3, gameChar_y - 30, 5, 7);
                ellipse(gameChar_x + 3, gameChar_y - 30, 5, 7);
                ellipse(gameChar_x - 15, gameChar_y - 45, 10, 35);
                ellipse(gameChar_x + 15, gameChar_y - 45, 10, 35);
                ellipse(gameChar_x - 7, gameChar_y - 55, 5, 5);
                ellipse(gameChar_x + 7, gameChar_y - 55, 5, 5);
                fill(255);
                rect(gameChar_x - 1.5, gameChar_y - 45, 3, 5);
                triangle(gameChar_x, gameChar_y - 49, 
                         gameChar_x - 3, gameChar_y - 46, 
                         gameChar_x + 3, gameChar_y - 46);
            }

        //Standing (front facing)
	   else
            {
                fill(0);
                stroke(210,180,140);
                strokeWeight(1.5)
                ellipse(gameChar_x, gameChar_y - 25, 30, 40);
                ellipse(gameChar_x, gameChar_y - 55, 30, 30);
                ellipse(gameChar_x - 10, gameChar_y - 5, 20, 10);
                ellipse(gameChar_x + 10, gameChar_y - 5, 20, 10);
                ellipse(gameChar_x - 4, gameChar_y - 30, 5, 7);
                ellipse(gameChar_x + 4, gameChar_y - 30, 5, 7);
                ellipse(gameChar_x - 15, gameChar_y - 45, 10, 35);
                ellipse(gameChar_x + 15, gameChar_y - 45, 10, 35);
                ellipse(gameChar_x - 7, gameChar_y - 55, 5, 5);
                ellipse(gameChar_x + 7, gameChar_y - 55, 5, 5);
                fill(255);
                rect(gameChar_x - 1.5, gameChar_y - 45, 3, 5);
                triangle(gameChar_x, gameChar_y - 49, 
                         gameChar_x - 3, gameChar_y - 46, 
                         gameChar_x + 3, gameChar_y - 46);
            }
}

// ---------------------------
// Background render functions
// ---------------------------

// Draw cloud objects
function drawClouds()
    {
        for(var i = 0 ; i < clouds.length ; i++)
            {
                noStroke();

                //Shadow
                fill(201, 140, 201);
                ellipse(clouds[i].x_pos, clouds[i].y_pos + 5, 85, 45);
                ellipse(clouds[i].x_pos + 50, clouds[i].y_pos + 5, 55, 45);
                ellipse(clouds[i].x_pos + 110, clouds[i].y_pos + 50, 50);
                ellipse(clouds[i].x_pos + 140, clouds[i].y_pos + 50, 50);

                //Highlight
                fill(241, 190, 241);
                ellipse(clouds[i].x_pos, clouds[i].y_pos, 85, 45);
                ellipse(clouds[i].x_pos + 50, clouds[i].y_pos, 55, 45);
                ellipse(clouds[i].x_pos + 30, clouds[i].y_pos - 20, 45, 55);
                ellipse(clouds[i].x_pos + 110, clouds[i].y_pos + 45, 50);
                ellipse(clouds[i].x_pos + 140, clouds[i].y_pos + 45, 50);
                ellipse(clouds[i].x_pos + 125, clouds[i].y_pos + 30, 50);
            }
    }

// Draw mountains objects
function drawMountains()
    {
        for(var i = 0 ; i < mountains_x.length ; i++)
            {
                noStroke();
                
                //Back mountain
                fill(110, 90, 130);
                triangle(mountains_x[i], floorPos_y - 232, mountains_x[i] + 100, floorPos_y, mountains_x[i] - 100, floorPos_y);
                
                //Front mountains
                fill(126, 106, 152);
                //Right
                triangle(mountains_x[i] + 75, floorPos_y - 112, mountains_x[i] + 25, floorPos_y, mountains_x[i] + 125, floorPos_y);
                //Left
                triangle(mountains_x[i] - 75, floorPos_y - 132,mountains_x[i] - 150, floorPos_y, mountains_x[i], floorPos_y);
                
                //Back mountain peak
                fill(240, 230, 250);
                triangle(mountains_x[i], floorPos_y - 232, mountains_x[i] - 30, floorPos_y - 162, mountains_x[i] + 30, floorPos_y - 162);     
            }     
    }

// Draw trees objects
function drawTrees()
    {
        for(var i = 0 ; i < trees_x.length ; i++)
            {
                noStroke();

                //Trunk
                fill(100, 80, 70);
                rect(trees_x[i], floorPos_y - 100, 40, 100);


                //Shadows
                noStroke()
                fill(205,133,63);
                ellipse(trees_x[i] - 10, floorPos_y - 90, 65, 55);
                ellipse(trees_x[i] + 50, floorPos_y - 90, 65, 55);
                ellipse(trees_x[i] + 20, floorPos_y - 130, 65, 65);

                //Top
                fill(244,164,96);
                ellipse(trees_x[i] - 10, floorPos_y - 95, 65, 55);
                ellipse(trees_x[i] + 50, floorPos_y - 95, 65, 55);
                ellipse(trees_x[i] + 20, floorPos_y - 135, 65, 65);

                //Leaf details
                stroke(164, 114, 11);
                strokeWeight(5);
                line(trees_x[i] - 15, floorPos_y - 105, trees_x[i] -11, floorPos_y - 105); 
                line(trees_x[i] - 15, floorPos_y - 85, trees_x[i] -11, floorPos_y - 85);
                line(trees_x[i] + 55, floorPos_y - 85, trees_x[i] +51, floorPos_y - 85);
                line(trees_x[i] + 55, floorPos_y - 105, trees_x[i] +51, floorPos_y - 105);
                stroke(205,133,63);
                line(trees_x[i] + 10, floorPos_y - 140, trees_x[i] +6, floorPos_y - 140);
                line(trees_x[i] + 30, floorPos_y - 140, trees_x[i] +26, floorPos_y - 140);
                stroke(225,120,50)
                line(trees_x[i] - 30, floorPos_y - 95, trees_x[i] -26, floorPos_y - 95);
                line(trees_x[i] , floorPos_y - 95, trees_x[i] +4, floorPos_y - 95);
                line(trees_x[i] + 20, floorPos_y - 150, trees_x[i] +16, floorPos_y - 150);
                line(trees_x[i] + 40, floorPos_y - 95, trees_x[i] +36, floorPos_y - 95);
                line(trees_x[i] + 70, floorPos_y - 95, trees_x[i] +66, floorPos_y - 95);
            }
    }

// Draw Lives
function drawLifeToken()
    {
        for(var i = 0 ; i < lives.length ; i++)
            {
                noStroke();
                fill(240, 110, 140)
                ellipse(lives.x_pos + i * 40, lives.y_pos, 18)
                ellipse(lives.x_pos + 18 + i * 40, lives.y_pos, 18)
                triangle(lives.x_pos - 9 + i * 40, lives.y_pos + 2, 
                         lives.x_pos + 27 + i * 40, lives.y_pos + 2, 
                         lives.x_pos + 9 + i * 40, lives.y_pos + 23)
            }
    }

//-----------------------------------------------
//Interactable objects (draw and check functions)
//-----------------------------------------------

// Canyon draw functions
function drawCanyon(t_canyon)
    {  
        noStroke();
        fill(150, 150, 240);
        rect(t_canyon.x_pos, floorPos_y, 100, height);
        stroke(180);
        strokeWeight(10);
        strokeCap(SQUARE);
        line(t_canyon.x_pos, floorPos_y, t_canyon.x_pos, height);
        line(t_canyon.width, floorPos_y, t_canyon.width, height);

    }

// Check character is over a canyon
function checkCanyon(t_canyon)
    {
        if(gameChar_world_x >= (t_canyon.x_pos + 10) && gameChar_world_x <= (t_canyon.x_pos + 90) && gameChar_y >= floorPos_y)
            { 
                isPlummeting = true; 
                console.log("fall");
                gameChar_y += 5; 
                constrain(gameChar_world_x, t_canyon.x_pos, (t_canyon.x_pos +  t_canyon.width))
            }

        else
            {
                isPlummeting = false;
            }

    }

//Check player has died
function checkPlayerDie()
    {
        for(var i = 0 ; i < enemies.length ; i++)
            {

                var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

                if(gameChar_y >= height || isContact)
                    {
                        console.log("dead");
                        lives.length -= 1;
                        isLeft = false;
                        isRight = false;
                        isJumping = false;

                        if(lives.length > 0 )
                            {
                                startGame();
                                fallingSound.playMode('untilDone');
                                fallingSound.setLoop(false);
                                fallingSound.play();
                            }
                        else
                            {
                                enemies[i].inc = 0;
                                isLeft = false;
                                isRight = false;
                                isJumping = false;
                                push();
                                fill(0,0,0, 30);
                                rect(0,0, width, height);

                                fill(0,0,0);
                                noStroke();
                                textSize(30);
                                text("GAME OVER", 410, height/2);
                                textSize(12);
                                text("Refresh page to try again", 432, 315);
                                pop();
                                gameOverSound.playMode('untilDone');
                                gameOverSound.play();
                                gameOverSound.onended(stop);
                            }
                    }
            }
    }

//Flagpole draw function
function renderFlagpole()
    {   
        strokeWeight(10);
        strokeCap(SQUARE);
        stroke(255);
        line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 300);
        noStroke();
        fill(255,220,150);



        if(flagpole.isReached == true)
            {
                triangle(flagpole.x_pos +2, floorPos_y - 300,
                        flagpole.x_pos + 2, floorPos_y - 220,
                        flagpole.x_pos + 100, floorPos_y - 260);
                levelWinSound.playMode('untilDone');
                levelWinSound.play();
                levelWinSound.onended(stop);

                isRight = false;
                isLeft = false;
                runningSound.stop();
            }
        else
            {
               triangle(flagpole.x_pos +2, floorPos_y - 80,
                        flagpole.x_pos + 2, floorPos_y,
                        flagpole.x_pos + 100, floorPos_y - 40); 
            }

    }

// Check flagpole has been reached
function checkFlagpole()
    {
        var distance = abs(gameChar_world_x - flagpole.x_pos);

        if(distance <  10)
            {
                flagpole.isReached = true;
            }
    }

// Collectable objects draw function
function drawCollectable(t_collectable)
    {
        fill(255, 255, 220);
        stroke(160, 160, 140);
        strokeWeight(1)
        ellipse(t_collectable.x_pos, t_collectable.y_pos, 25);
        ellipse(t_collectable.x_pos - 6, t_collectable.y_pos + 10, 15);
        ellipse(t_collectable.x_pos + 6, t_collectable.y_pos + 10, 15);
        fill(100, 80, 70);
        triangle(t_collectable.x_pos - 5, t_collectable.y_pos + 3, 
                 t_collectable.x_pos + 5, t_collectable.y_pos + 3, 
                 t_collectable.x_pos, t_collectable.y_pos + 8);
    }

// Check collectable has been collected
function checkCollectable(t_collectable)
    {
        if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 50)
            {
                t_collectable.isFound = true;
                console.log("Collectable found");
                game_score += 1;
                collectSound.rate(0.7);
                collectSound.play();
            }
    }

// Enemy object draw function
function enemy(x, y, range)
    {
        this.x = x;
        this.y = y;
        this.range = range;

        this.currentX = x;
        this.inc = 1;
        this.direction = 1;
        
        //Enemy movement
        this.update = function()
        {
            this.currentX += this.inc;

            if(this.currentX >= this.x + this.range)
                {
                    this.inc = -1;
                    this.direction = -1;

                }
            else if(this.currentX < this.x)
                {
                    this.inc = 1;
                    this.direction = 1;
                }
        }
        
        //Draw enemy
        this.draw = function()
        {
            this.update();

            stroke(255, 240, 255);
            noFill();
            strokeJoin(SQUARE);
            strokeWeight(2);
            beginShape();
            vertex(this.currentX + (this.direction * 23), this.y + 5);
            vertex(this.currentX + (this.direction * 26), this.y + 10);
            vertex(this.currentX + (this.direction * 29), this.y + 5);
            vertex(this.currentX + (this.direction * 32), this.y + 10);
            vertex(this.currentX + (this.direction * 35), this.y + 5);
            vertex(this.currentX + (this.direction * 38), this.y + 10);
            vertex(this.currentX + (this.direction * 41), this.y + 5);
            vertex(this.currentX + (this.direction * 44), this.y + 10);
            vertex(this.currentX + (this.direction * 47), this.y + 5);
            endShape();

            fill(0, 0, 0);
            noStroke();
            ellipse(this.currentX, this.y, 40, 30);
            triangle(this.currentX + (this.direction * 15), this.y - 10, 
                     this.currentX + (this.direction * 50), this.y + 5, 
                     this.currentX + (this.direction * 15), this.y + 10);
            ellipse(this.currentX + (this.direction * 20), this.y, 20 ,20);
            ellipse(this.currentX + (this.direction * 15), this.y - 10, 15, 15);

            fill(255, 0 ,0);
            ellipse(this.currentX+ (this.direction * 20), this.y - 3, 8, 8);

            fill ( 250, 200, 200);
            ellipse(this.currentX + (this.direction * 50), this.y + 5, 5, 5);

            stroke(250, 200, 200);
            strokeWeight(5);
            strokeJoin(ROUND);
            beginShape();
            curve(this.currentX - (this.direction * 20), this.y + 3, 
                  this.currentX - (this.direction * 30), this.y ,
                  this.currentX - (this.direction * 40), this.y + 3, 
                  this.currentX - (this.direction * 50), this.y);
            endShape();
        }

        //Check enemy contact
        this.checkContact = function(gc_x, gc_y)
        {
            var d = dist(gc_x, gc_y, this.currentX, this.y)

            if(d < 20)
                {
                    return true;
                    isJumping = false;
                }
            return false;
        }
    }
