   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
   var c,
       ctx,
       x = (canvas.width / 2) - 25,
       y = canvas.height - 75,
       r = 50,
       speed = 2,
       rightKey = false,
       leftKey = false,
       upKey = false,
       downKey = false;

   function getDistance(player_x, player_y, obstacle_x, obstacle_y) {
       let xDis = obstacle_x - player_x;
       let yDis = obstacle_y - player_y;
       return Math.sqrt(Math.pow(xDis, 2) + Math.pow(yDis, 2))
   }

   function drawPlayer() {
       if(rightKey) {
           x += 5;
       }
       if(leftKey) {
           x -= 5;
       }
       if(upKey) {
           y -= 5;
       }
       if(downKey) {
           y += 5;
       }
       if(x - r <= 0) {
           x = r;
       }
       if((x + r) >= canvas.width) {
           x = canvas.width - r;
       }
       if(y - r <= 0) {
           y = r;
       }
       if((y + r) >= canvas.height) {
           y = canvas.height - r;
       }
   }

   function init() {
       c = document.getElementById('canvas');
       ctx = c.getContext('2d');
       ctx.beginPath();
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.arc(x, y, r, 0, 2 * Math.PI, false);
       ctx.fillStyle = 'blue';
       ctx.fill();
       document.addEventListener('keydown', keyDown, false);
       document.addEventListener('keyup', keyUp, false);
   }

   function gameLoop() {
       requestAnimationFrame(gameLoop);
       console.log(x);
       init()
       drawPlayer();
       //console.log(getDistance(player_x,player_y,obstacle_x,obstacle_y));
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