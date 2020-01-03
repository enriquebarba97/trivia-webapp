class player{
    constructor(number, name, cpu, color, number_of_players)
    {
        this.number = number;
        this.name = name;
        this.cpu = cpu;
        this.color = color;
        this.categories_correct = [0,0,0,0];
        this.x = view.instance().Xcenter + (view.instance().player_size * 1.5) * Math.cos((number - 1) * 2 * Math.PI / number_of_players);
        this.y = view.instance().Ycenter + (view.instance().player_size * 1.5) * Math.sin((number - 1)* 2 * Math.PI / number_of_players);
        /*console.log("NEW PLAYER " + number.toString());
        console.log("NAME: " + name);
        console.log("CPU: " + cpu.toString());
        console.log("Color: " + color);
        console.log("X: " + this.x);
        console.log("Y: " + this.y);
        console.log("NUMBER OF PLAYERS: " + number_of_players);*/
    }
}