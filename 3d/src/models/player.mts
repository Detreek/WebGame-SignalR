interface State{
    listAllPlayers : Player[];
    
}
interface Player extends Entity{
    hp : number;
    isAlive : boolean;
    speed : number;
    playerConnectionId : string
    // hitbox : hitBox
}
interface Entity{
    id : number; 
    name : string;
    pos : Vector3d;
    rot : Vector3d;
    scale : Vector3d;


}

interface Vector3d{
    X : number
    Y : number
    Z : number
}
interface hitBox{
    pos : Vector3d;
    rot : Vector3d;
    scale : Vector3d;
}