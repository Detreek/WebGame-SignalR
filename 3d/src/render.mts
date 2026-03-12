import * as THREE from 'three';
import { HEIGHT, WIDHT } from './settings.mts';
import * as CANNON from 'cannon-es'
const canvac = document.getElementById("canvas")
if (!canvac){
    throw "sssss"
}

const renderer = new THREE.WebGLRenderer({canvas: canvac})
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 45,  WIDHT/ HEIGHT, 1, 1000 );
const world = new CANNON.World()
const shape_obj = new CANNON.Box(new CANNON.Vec3(20,20,20))
const obj = new CANNON.Body({mass: 0})
const ambientOclusion = new THREE.AmbientLight(0xffffff,1)

camera.lookAt(new THREE.Vector3(-1,-1,-1))
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({ mass: 0 }); // mass 0 = статичный
groundBody.addShape(groundShape);

world.addBody(groundBody);

// Визуализация пола
const groundGeo = new THREE.PlaneGeometry(50000, 50000);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x444444 });
const groundMesh = new THREE.Mesh(groundGeo, groundMat);


scene.add(groundMesh);

obj.addShape(shape_obj)

world.addBody(obj)
scene.add(ambientOclusion)



function animation(){

    requestAnimationFrame(animation)
    camera.position.set(obj.position.x,obj.position.y,obj.position.z)
    world.step(1/60)
    renderer.render(scene,camera)
}
animation()

function Vec3ToVector3(vec : CANNON.Vec3){
    return (new THREE.Vector3(vec.x,vec.y, vec.z))
}

// document.addEventListener('keydown',(event: KeyboardEvent) =>{
//     if(event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц'){
//         obj.velocity.set(0,0,0)
//     }
//     if(event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В'){
//         connection.invoke("OnRightMove")
//     }
//     if(event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы'){
//         connection.invoke("OnBackward")
//     }
//     if(event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф' ){
//         connection.invoke("OnLeftMove")
//     }
// });
