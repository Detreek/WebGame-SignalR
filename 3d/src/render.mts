import * as THREE from 'three';
import { HEIGHT, WIDHT } from './settings.mts';
import * as CANNON from 'cannon-es'
import { canvas } from './canvas.mts';
import { input } from './control.mts';
import {Player } from './Player.mts'
import { Vector3d } from './Entity.mts';
import { Camera } from './Camera.mts';
import { FOV } from './settings.mts';
import connection from './connection.mts';
import { State } from './GameState.mts';

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
const world = new CANNON.World();
renderer.setSize(WIDHT, HEIGHT);
renderer.shadowMap.enabled = true; // ✅ Включаем тени

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb); // небо для наглядности
const gameState = new State()

connection.on("snapshot",(snapshot) => {console.log(snapshot), gameState.load(snapshot)})

// Камера
const player = new Player("sds3323dsa")
const camera = new Camera(FOV,WIDHT/HEIGHT,0.01)

camera.folowTarget = player
player.pos.y = 100
world.addBody(player.obj)
// === 🌟 ОСВЕЩЕНИЕ ===
// Фоновый свет (мягкая засветка)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Направленный свет (как солнце) — основной источник
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(20, 30, 20);
directionalLight.castShadow = true; // ✅ Тени
directionalLight.shadow.mapSize.set(2048, 2048);
scene.add(directionalLight);

// Дополнительный заполняющий свет (опционально)
const fillLight = new THREE.PointLight(0x88ccff, 0.4, 50);
fillLight.position.set(-10, 10, -10);
scene.add(fillLight);

// === 🌍 ПОЛ ===
const groundShape = new CANNON.Plane();
const groundBody = new CANNON.Body({ mass: 0 });
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // 🔄 Поворот для Plane
groundBody.addShape(groundShape);
world.addBody(groundBody);

const groundGeo = new THREE.PlaneGeometry(50000, 50000);
const groundMat = new THREE.MeshStandardMaterial({ 
    color: 0x444444,
    roughness: 0.8,
    metalness: 0.2
});
const groundMesh = new THREE.Mesh(groundGeo, groundMat);
groundMesh.rotation.x = -Math.PI / 2; // 🔄 Поворот в Three.js
groundMesh.receiveShadow = true; // ✅ Принимает тени
scene.add(groundMesh);

// === 📦 КУБ (физика + визуал) ===
// Физика
const shape_obj = new CANNON.Box(new CANNON.Vec3(2, 2, 2)); // ✅ Уменьшил размер для наглядности
const objBody = new CANNON.Body({ mass: 1 }); // ✅ mass: 1 — чтобы падал
objBody.addShape(shape_obj);
objBody.position.set(0, 10, 0); // 📍 Начальная позиция выше пола
world.addBody(objBody);

// Визуал
const boxGeo = new THREE.BoxGeometry(4, 4, 4); // 2*2*2 в Cannon = 4x4x4 в Three.js
const boxMat = new THREE.MeshStandardMaterial({ 
    color: 0x00ff88,
    roughness: 0.3,
    metalness: 0.1
});
const boxMesh = new THREE.Mesh(boxGeo, boxMat);
boxMesh.castShadow = true; // ✅ Отбрасывает тени
scene.add(boxMesh);
let YAW = 0
let PITCH = 0

CANNON.RaycastResult


function animation(){
    
    requestAnimationFrame(animation)
    // camera.position.set(obj.position.x,obj.position.y,obj.position.z)
    connection.invoke("OnCameraMove",player.rotX,player.rotY)
    YAW -= input.mouse.movementX / 1000

    PITCH -= input.mouse.movementY / 1000
    PITCH = Math.max(-Math.PI / 2, Math.min(Math.PI /2, PITCH))

    camera.quaternion.setFromEuler(new THREE.Euler(PITCH,YAW,0,"YXZ"))
    connection.invoke("OnCameraMove",PITCH,YAW)
    let vectorCamera : THREE.Vector3 = new THREE.Vector3(0,0,0)
    
    camera.getWorldDirection(vectorCamera)
    vectorCamera.y = 0
    vectorCamera.normalize()
    
    
    let Mvector = new Vector3d(0,0,0)
    if (input.keyboard["w"]?.isDown){
        // debugger
        player.obj.applyForce(new CANNON.Vec3(vectorCamera.x * 2000,0,vectorCamera.z * 2000))
        Mvector.x += vectorCamera.x * 20000
        Mvector.y += 0
        Mvector.x += vectorCamera.z * 20000
        connection.invoke("OnMove",Mvector) // TODO: Временное решение (возможен рассинхрон)
        
        
    }
    if (input.keyboard["s"]?.isDown){
        player.obj.applyForce(new CANNON.Vec3(-vectorCamera.x * 2000,0,-vectorCamera.z * 2000))
        Mvector.x -= vectorCamera.x * 2000
        Mvector.y += 0
        Mvector.x -= vectorCamera.z * 2000
        connection.invoke("OnMove",Mvector)
       
    }
    const rightDirection = Vector3d.cross(vectorCamera,new Vector3d(0,1,0))
    if (input.keyboard["d"]?.isDown){
        
        player.obj.applyForce(new CANNON.Vec3(rightDirection.x * 2000,0,rightDirection.z * 2000))
        Mvector.x += rightDirection.x * 2000
        Mvector.y += 0
        Mvector.x += rightDirection.z * 2000
        connection.invoke("OnMove",Mvector)
        
    }
    
    if (input.keyboard["a"]?.isDown){
        player.obj.applyForce(new CANNON.Vec3(-rightDirection.x * 2000,0,-rightDirection.z * 2000))
        Mvector.x -= rightDirection.x * 2000
        Mvector.y += 0
        Mvector.x -= rightDirection.z * 2000
        connection.invoke("OnMove",Mvector)
        
    }
    
    
    world.step(1/60)
    player.sync()
    camera.sync()
    input.clear()
    
    renderer.render(scene,camera)
}
animation()


