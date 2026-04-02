import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Entity } from "./Entity.mts";
import { FOV, WIDHT,HEIGHT,DAMPING_FACTOR } from './settings.mts';

export class Player extends Entity{
    
    constructor(){
            const box = new CANNON.Box(new CANNON.Vec3(3,3,3))
            const body = new CANNON.Body({mass: 122,linearDamping: DAMPING_FACTOR})
            body.addShape(box)
            const geo = new THREE.BoxGeometry()
            const mat = new THREE.Material()
            const mesh = new THREE.Mesh(geo,mat)
            body.position.y = 10
            body.position.x = 20
            super(
                body,
                mesh
                
            ) 
            
        }
    
}