import type { Vector3d } from "../Entity.mts";

export interface StateDTO{
    Players : PlayerDTO[];
    
}
export interface PlayerDTO extends EntityDTO{
    hp : number;
    isAlive : boolean;
    speed : number;
    playerConnectionId : string

    // hitbox : hitBox
}
interface EntityDTO{
    id : number; 
    name : string;
    pos : Vector3d;
    angleY : number;
    angleX : number;


}


interface hitBox{
    pos : Vector3d;
    rot : Vector3d;
    scale : Vector3d;
}