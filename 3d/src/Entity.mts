import * as CANNON from 'cannon-es'

import * as THREE from 'three';
import connection from './connection.mts';

export class Entity {

    obj : CANNON.Body
    mesh : THREE.Mesh
    rotY : number = 0
    rotX : number = 0
    public get pos() : Vector3d {
        return Vector3d.fromCannon(this.obj.position)
    }

    
    public set pos(vector3d : Vector3d) {
        this.obj.position.set(vector3d.x,vector3d.y,vector3d.z);
    }

    public rotate(angleY : number, angleX : number){
        this.obj.quaternion.setFromEuler(this.rotX + angleY,this.rotY + angleY,0,"XYZ")
        this.rotX += angleX 
        this.rotY += angleY
    } 
    
    
    
    
    
    
    constructor(object : CANNON.Body,mesh : THREE.Mesh){
        this.obj = object
        this.mesh = mesh
    }

    public sync(){
        this.mesh.position.set(this.obj.position.x,this.obj.position.y,this.obj.position.z)
        
    }
    

}
class Box extends Entity{
    
    constructor(){
        const box = new CANNON.Box(new CANNON.Vec3())
        const body = new CANNON.Body({mass: 0})
        body.addShape(box)
        const geo = new THREE.BoxGeometry()
        const mat = new THREE.Material()
        const mesh = new THREE.Mesh(geo,mat)
        super(
            body,
            mesh
            
        )  
    }
}
export class Vector3d{
    
    x : number = 0
    y : number = 0
    z : number = 0
    constructor(x : number,y : number,z : number){
        this.x = x
        this.y = y
        this.z = z
    }
    static fromCannon(vector3 : CANNON.Vec3) : Vector3d{
        return (new Vector3d(vector3.x,vector3.y,vector3.z))
    }
    static fromThree(vector3 : THREE.Vector3) : Vector3d{
        return( new Vector3d(vector3.x,vector3.y,vector3.z))
    }
    static cross(v1 : Vector3d, v2 : Vector3d){
        return (new Vector3d(v1.y * v2.z - v1.z * v2.y, v1.z*v2.x - v1.x * v2.z,v1.x * v2.y - v1.y*v2.x))
    }
    static toCannon(vector3 : Vector3d){
        return ( new CANNON.Vec3(vector3.x,vector3.y,vector3.z))

    }
    static toThree(vector3 : Vector3d){
        return ( new THREE.Vector3(vector3.x,vector3.y,vector3.z))

    }
}
