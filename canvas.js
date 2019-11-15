   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   var c,
       ctx,
       r = 50,
       obstacle_x = canvas.width,
       obstacle_y = canvas.height / (Math.random() * (10 - 1) + 1),
       bonus_x = canvas.width,
       bonus_y = canvas.height / (Math.random() * (3 - 1) + 1),
       player_x = (canvas.width / 2) - 25,
       player_y = canvas.height - 75,
       speedPlayer_x = 10,
       speedPlayer_y = -10,
       speedObs_x = 10,
       speedObs_y = -10,
       speedBonus_x = 10,
       speedBonus_y = -10,
       rightKey = false,
       leftKey = false,
       upKey = false,
       downKey = false,
       lives = 3,
       score = 0,
       level = 1;

   function drawPlayer() {
       if(rightKey) {
           player_x += speedPlayer_x;
       }
       if(leftKey) {
           player_x -= speedPlayer_x;
       }
       if(upKey) {
           player_y += speedPlayer_y;
       }
       if(downKey) {
           player_y -= speedPlayer_y;
       }
       if(player_x - r <= 0) {
           player_x = r;
       }
       if((player_x + r) >= canvas.width) {
           player_x = canvas.width - r;
       }
       if(player_y - r <= 0) {
           player_y = r;
       }
       if((player_y + r) >= canvas.height) {
           player_y = canvas.height - r;
       }
   }

   function init() {
       c = document.getElementById('canvas');
       ctx = c.getContext('2d');
   }

   function draw() {
       ctx.beginPath();
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.font = "16px Calibri";    
       ctx.fillStyle = "white";    
       ctx.fillText("Score: " + score, 8, 20);    
       ctx.fillText("Level: " + level, 8, 40);    
       ctx.fillText("Lives: " + lives, 8, 60);
       ctx.arc(player_x, player_y, r, 0, 2 * Math.PI, false);
       ctx.fillStyle = 'blue';
       ctx.fill();
       ctx.closePath();
       document.addEventListener('keydown', keyDown, false);
       document.addEventListener('keyup', keyUp, false);
       //obstacle 
       ctx.beginPath();
       ctx.arc(obstacle_x, obstacle_y, r, 0, 2 * Math.PI, false);
       ctx.fillStyle = 'red';
       ctx.fill()
       ctx.closePath();
       //bonus
       ctx.beginPath();
       ctx.arc(bonus_x, bonus_y, r, 0, 2 * Math.PI, false);
       ctx.fillStyle = 'green';
       ctx.fill();
       ctx.closePath();
   }

   function moveObjects() {
       obstacle_x -= speedObs_x;
       obstacle_y -= speedObs_y;
       bonus_x -= speedBonus_x;
       bonus_y -= speedBonus_y;
       if(obstacle_x - r <= 0 || obstacle_x >= canvas.width) {
           speedObs_x = -speedObs_x;
           console.log(canvas.width);
       }
       if(obstacle_y - r <= 0 || obstacle_y >= canvas.height) {
           speedObs_y = -speedObs_y;
           console.log(canvas.width);
       }
       if(bonus_x - r <= 0 || bonus_x >= canvas.width) {
           speedBonus_x = -speedBonus_x;
           console.log(canvas.width);
       }
       if(bonus_y - r <= 0 || bonus_y >= canvas.height) {
           speedBonus_y = -speedBonus_y;
           console.log(canvas.width);
       }
   }

   function getDistance(player_x, player_y, obstacle_x, obstacle_y) {
       let xDis = obstacle_x - player_x;
       let yDis = obstacle_y - player_y;
       return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2))
   }

   function badCollide(player_x, player_y, obstacle_x, obstacle_y) {   
       if(getDistance(player_x, player_y, obstacle_x, obstacle_y) <= 100) {      
           return true;   
       }    
       else {        
           return false;    
       }    
   }

   function goodCollide(player_x, player_y, bonus_x, bonus_y) {      
       if(getDistance(player_x, player_y, bonus_x, bonus_y) <= 100) {      
           return true;   
       }    
       else {        
           return false;    
       }
   }

   function gameLoop() {
       requestAnimationFrame(gameLoop);
       init();
       draw();
       moveObjects();
       drawPlayer();
       if(badCollide(player_x, player_y, obstacle_x, obstacle_y) == true) {
           speedObs_x = -speedObs_x;
           speedObs_y = -speedObs_y;
           lives--;
       }
       if(goodCollide(player_x, player_y, bonus_x, bonus_y) == true) {
           speedBonus_x = -speedObs_x;
           speedBonus_y = -speedObs_y;
           score += 5;
       }
//        if(score == 10) {
//            level++;
//            speedBonus_x += 10;
//            speedBonus_y += 10;
//            speedObs_x += 10;
//            speedObs_y += 10;
//        }
//        if(score == 20) {
//            level++;
//            speedBonus_x += 10;
//            speedBonus_y += 10;
//            speedObs_x += 10;
//            speedObs_y += 10;
//        }
//        if(score == 30) {
//            level++;
//            speedBonus_x += 10;
//            speedBonus_y += 10;
//            speedObs_x += 10;
//            speedObs_y += 10;
//        }
       if (level>3){
           alert('You Won');
       }
//        if(lives <= 0) {
//            alert('GameOver');
//            return;
//        }
   }

   function keyDown(e) {
       if(e.keyCode == 39) rightKey = true;
       else if(e.keyCode == 37) leftKey = true;
       if(e.keyCode == 38) upKey = true;
       else if(e.keyCode == 40) downKey = true;
   }

   function keyUp(e) {
       if(e.keyCode == 39) rightKey = false;
       else if(e.keyCode == 37) leftKey = false;
       if(e.keyCode == 38) upKey = false;
       else if(e.keyCode == 40) downKey = false;
   }
   gameLoop();