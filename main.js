
import * as THREE from 'three';
import { ThreeMFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

//constantes
const forniture=[]
var x=0;
var selected=null
var newForniture=null
var esfera= new THREE.SphereGeometry(1)

var relleno= new THREE.MeshBasicMaterial({color:0x00ff00})

var cuadrado= new THREE.BoxGeometry(1,1,1)
var rellenoC=new THREE.MeshBasicMaterial({color:0x00ff00})













var planeGeometry = new THREE.PlaneGeometry(10, 10);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(- Math.PI/2)
plane.position.set(0,-.5,0)
scene.add(plane);




camera.position.z = 5;




var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();




function onMouseMove(event) {
    // Calcula la posición del mouse en el plano
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualiza el raycaster
    raycaster.setFromCamera(mouse, camera);

    // Intersecta el rayo con el plano

    var intersects = raycaster.intersectObjects(forniture);
    if(intersects.length>0 ){

            selected=intersects[0].object
            console.log("el objeto seleccionado es", selected)


}}

function onMouseClick(event) {
    if (selected) {
        var intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0 && x==2) {
            const posElemento= new THREE.Vector3().copy(intersects[0].point)
            selected.position.set(posElemento.x, 0, posElemento.z)
            
        }

    }

}

const addButton= document.getElementById("suma")


function contar(e){


    if(x==2){
        console.log(x)
        selected=null
        elaborar=false
        objdelete=false
    }

    if(x>2){
        x=1
        console.log("el nuevo valor de x es=",x)
    }
    x++
}
const Gbutton= document.getElementById("girar")

function girar(e){
        if(selected){
            selected.rotateY(Math.PI/2)
        }
        

}



const newObj= document.getElementById("agregar")
var elaborar=false
var objdelete=false

function crearObjeto(event){
    if(elaborar===false){
        console.log("ya se puede agregar")
        elaborar=true
        objdelete=false
        
    }

    else(
        elaborar=false
    )
}

function createObject(event){

    // Calcula la posición del mouse en el plano
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


     // Actualiza el raycaster
     raycaster.setFromCamera(mouse, camera);

     var intersects= raycaster.intersectObject(plane)

     
     if(intersects.length>0 && elaborar ){


        var pos= [mouse.x, mouse.y]
        console.log("aqui ira la nueva funcion", pos)

        const meshEsfera= new THREE.Mesh(esfera,relleno)
        const objectPos= new THREE.Vector3().copy(intersects[0].point)
        meshEsfera.position.set(objectPos.x,0.5,objectPos.z)
		scene.add( meshEsfera );

		forniture.push( meshEsfera)
     }

}

var eliminar= document.getElementById("eliminar")

function estadoDelete(event){
    if(objdelete===false){
        objdelete=true
        elaborar=false
        console.log("voy a eliminar")
    }
    else{
        objdelete=false
    }
}
function eliminarObjeto(event){
    if( objdelete){
        scene.remove( selected );
        object.splice( forniture.indexOf( selected ), 1 );
}

}




document.addEventListener('click', onMouseMove, false);
document.addEventListener('click', onMouseClick, false);
addButton.addEventListener("click", contar, false)
Gbutton.addEventListener("click", girar,false)
document.addEventListener("click", createObject, false)
newObj.addEventListener("click",crearObjeto, false)
eliminar.addEventListener("click", estadoDelete, false)
document.addEventListener("click", eliminarObjeto, false)



//funcion para animar los objetos
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}



animate();
contar();
girar();
createObject()



/*
https://threejs.org/docs/#api/en/constants/Materials 
buscar despues suena prometedor
*/



/*   
codigo que se puede reciclar




var colorcube= new THREE.BoxGeometry(1,0.5,2)
    var fcolor= new THREE.MeshNormalMaterial()
    var meshCube= new THREE.Mesh(colorcube, fcolor)
    meshCube.position.set(2,-0.25,2)
    forniture.push(meshCube)
    scene.add(meshCube) */