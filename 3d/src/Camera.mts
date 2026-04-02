import { PerspectiveCamera } from "three";
import type { Entity } from "./Entity.mts";

export class Camera extends PerspectiveCamera{
    folowTarget : Entity | null = null 
    
    public sync(){
        if(this.folowTarget != null){
            this.position.set(this.folowTarget.pos.x,this.folowTarget.pos.y,this.folowTarget.pos.z)
        }
    }
    
}