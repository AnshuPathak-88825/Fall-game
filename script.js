var character = document.getElementById('character');
var game = document.getElementById('game');
var interval;
var both = 0;
var counter = 0;
var currentblock = [];
function Moveleft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 2 + "px";

    }


} function Moveright() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 380) {
        character.style.left = left + 2 + "px";

    }



}
window.addEventListener('keydown', function () {

    if (both == 0) {
        both++;
        if (this.event.key == "ArrowRight") {
            both++;
            interval = this.setInterval(Moveright, 1);

        }
        else if (this.event.key == "ArrowLeft") {
            both++;
            interval = this.setInterval(Moveleft, 1);

        }
    }


});
window.addEventListener('keyup', function () {
    both = 0;
    this.clearInterval(interval);

});
var blockss = setInterval(function () {
    var blocklast = document.getElementById("block" + (counter - 1));
    var holelast = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var blocklasttop = parseInt(window.getComputedStyle(blocklast).getPropertyValue("top"));
        var holelast = parseInt(window.getComputedStyle(holelast).getPropertyValue("top"));
    }
    if (blocklasttop < 400 || counter == 0) {
        var block = document.createElement('div');
        var hole = document.createElement('div');
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        var random = Math.floor(Math.random() * 360);
        block.style.top = 85 + blocklasttop + "px";
        hole.style.top = 85 + holelast + "px";

        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentblock.push(counter);
        counter++;
    }
    var charactertop = parseFloat(window.getComputedStyle(character).getPropertyValue("top"));
    var characterleft = parseFloat(window.getComputedStyle(character).getPropertyValue("left"));
    if (charactertop <= 0) {
        alert("Game over. Score: " + (counter - 9));
        clearInterval(blockss);
        location.reload();
    }
    var drop = 0;
    for (var i = 0; i < currentblock.length; i++) {
        let current = currentblock[i];

        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        // console.log(iblock);
        var iblocktop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        var iholeleft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));

        iblock.style.top = iblocktop - 0.7 + "px";
        ihole.style.top = iblocktop - 0.7 + "px";
        if (top < -20) {
            currentblock.shift();
            iblock.remove();
            ihole.remove();
        }
        if (iblocktop - 20 < charactertop && iblocktop > charactertop) {
            drop++;
            if (iholeleft <= characterleft && iholeleft + 20 >= characterleft) {
                drop = 0;
            }

        }
    }
    if (drop == 0) {
        if (charactertop < 480) {
            character.style.top = charactertop + 2 + "px";

        }
    }
    else {
        character.style.top = charactertop - 0.7 + "px";
    }




}, 1);



