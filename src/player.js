class player{
    constructor(number, name, cpu)
    {
        this.number = number;
        this.name = name;
        this.cpu = cpu;
        console.log("NEW PLAYER " + number.toString());
        console.log("NAME: " + name);
        console.log("CPU: " + cpu.toString());
    }
}