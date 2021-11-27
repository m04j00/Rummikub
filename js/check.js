function show_robot_tile() {
    for (let i = 0; i < robotTile.length; i++) {
        let id = robotTile[i].id;
        let path = robotTile[i].path;
        let div = document.createElement("div");
        div.id = id;
        div.innerHTML += '<img onclick="player_tile_click(' + id + ')" id= "img' + id + '" src="image/' + path + '.svg" class="tile player-tile no-drag">';
        document.querySelector('.robot-board').appendChild(div);
    }
}
show_robot_tile();

