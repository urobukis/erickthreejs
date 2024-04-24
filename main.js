
import * as THREE from 'three';
import { OBJLoader, GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/ window.innerHeight, 0.1, 1000 );
camera.position.set(1,8,4)
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
//constantes
const forniture=[]


var newForniture=null
var esfera= new THREE.SphereGeometry(1)

var relleno= new THREE.MeshBasicMaterial({color:0x00ff00})

var cuadrado= new THREE.BoxGeometry(1,1,1)
var rellenoC=new THREE.MeshBasicMaterial({color:0x00ff00})
//elementos importados para clonar
//nuevos elementos a incluir 
let tag
let bbox
const loader=new GLTFLoader()
let model1, model2, model3
loader.load("./modelos/bath.glb", function(gltf){
    const model=gltf.scene
    model.userData.name="bath"
    model.scale.set(0.01,0.01,0.01)


    const bbox = new THREE.Box3().setFromObject(model);
    const center = bbox.getCenter(new THREE.Vector3());
    const size= bbox.getSize(new THREE.Vector3())
 
    const mesh= new THREE.Mesh(new THREE.BoxGeometry(size.x,size.y, size.z), new THREE.MeshStandardMaterial({ color: 0xff0000, transparent: true, opacity: 0.0} ))
    model.position.set(-center.x, -center.y, -center.z);
    
    //mesh.position.set(-center.x,-center.y, -center.z)
    mesh.add(model)
    //forniture.push(mesh)

   // scene.add(mesh)
   //const box = new THREE.Box3().setFromObject(model);
   // console.log( 'Bounding box size:', box.getSize( new THREE.Vector3() ) );
    model1=mesh



})
loader.load("./modelos/sink.glb", function(gltf){
    const model=gltf.scene
    model.scale.set(0.8,0.8,0.8)
    model.userData.name="sink"

    
    const bbox = new THREE.Box3().setFromObject(model);
    const center = bbox.getCenter(new THREE.Vector3());
    const size= bbox.getSize(new THREE.Vector3())
 
    const mesh= new THREE.Mesh(new THREE.BoxGeometry(size.x,size.y, size.z), new THREE.MeshStandardMaterial({ color: 0xff0000, transparent: true, opacity: 0.0} ))
    model.position.set(-center.x, -center.y, -center.z);
    
    //mesh.position.set(-center.x,-center.y, -center.z)
    mesh.add(model)
   

    model2=mesh

})
loader.load("./modelos/toilet.glb", function(gltf){
    const model=gltf.scene
    model.userData.name="toilet"
    model.scale.set(0.5,0.5,0.5)
    const bbox = new THREE.Box3().setFromObject(model);
    const center = bbox.getCenter(new THREE.Vector3());
    const size= bbox.getSize(new THREE.Vector3())
 
    const mesh= new THREE.Mesh(new THREE.BoxGeometry(size.x,size.y, size.z), new THREE.MeshStandardMaterial({ color: 0xff0000, transparent: true, opacity: 0.0} ))
    model.position.set(-center.x, -center.y, -center.z);
    
    //mesh.position.set(-center.x,-center.y, -center.z)
    mesh.add(model)
    model3=mesh

})


//fin de clonados
//plano 
var planeGeometry = new THREE.PlaneGeometry(10, 10);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc, side: THREE.DoubleSide});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotateX(- Math.PI/2)
plane.position.set(0,-.5,0)
plane.userData.name="plane"
scene.add(plane);

//grid helper y funcion para colocar los elementos


	const grid= new THREE.GridHelper(10,10)
    grid.position.set(0,-0.49,0)
	scene.add(grid)


    //otra funcion
    const heightlightMesh= new THREE.Mesh(
        new THREE.PlaneGeometry(1,1),
        new THREE.MeshBasicMaterial({side:THREE.DoubleSide})
    )
    
    heightlightMesh.rotateX(Math.PI/2)
    heightlightMesh.position.set(0.5,0,0.5)
    scene.add(heightlightMesh)

    //tercera funcion

    window.addEventListener("mousemove", function(event){

    
        raycaster.setFromCamera(mouse, camera)
    
    
        var intersects= raycaster.intersectObject(plane)	


        if(intersects.length>0){
            const heightlightPos= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
            heightlightMesh.position.set(heightlightPos.x, -0.49, heightlightPos.z)
        }

    
    })

//Fin de grid helper y funcion para colocar los elementos


//funciones para añador los modelos y mostrarlos
/*
const loader = new GLTFLoader();

loader.load( './bath_with_sink/bath_with_sink.gltf', function ( gltf ) {

    var modelo= gltf.scene 

    
    scene.add( modelo );


}, undefined, function ( error ) {

	console.error( error );

} );

*/


//fin de las funciones para añador los modelos y mostrarlos
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();



function position(event){
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

var selected=null

function onMouseMove(event) {
    event.preventDefault();
    // Actualiza el raycaster
    raycaster.setFromCamera(mouse, camera);

    // Intersecta el rayo con el plano

    var intersects = raycaster.intersectObjects(forniture);
    if(intersects.length>0){

            selected=intersects[0].object
            //selected.material.color.setHex(0xff0000)
            console.log("el objeto seleccionado es", selected)


}}

//cambiar de posicion un objto en la pantalla
function onMouseClick(event) {
    if (selected && seleccionar) {
        var intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0 && seleccionar) {
            if(tag===model1){
                const posElemento= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
            selected.position.set(posElemento.x,-0.21, posElemento.z)
            }
            else{const posElemento= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
                selected.position.set(posElemento.x,0, posElemento.z)}
            
            
            
           // selected.position.set(posElemento.x, 0, posElemento.z)

         

    
            
        }
    }


}


//controles

const addButton= document.getElementById("suma")
var seleccionar=false

function agregarObjeto(e){


    if(seleccionar===false){
        seleccionar=true
       
        console.log("se puede seleccionar un objeto")
        selected=null

        elaborar=false
        objdelete=false
    }

    else{
        seleccionar=false,
        console.log("no se puede seleccionar un objeto")
    }

}
//girar
const Gbutton= document.getElementById("girar")

function girar(e){
        if(selected){
            selected.rotateY(Math.PI/2)
        }
        

}

//habilitar la creacion de objetos
const newObj= document.getElementById("agregar")
var elaborar=false
var objdelete=false

function crearObjeto(event){
    if(elaborar==false){
        console.log("ya se puede agregar")
        elaborar=true
        objdelete=false
        seleccionar=false

        
    }

    else(
        elaborar=false, 
        console.log("ya no se puede agregar")
    )
}


function estadoDelete(event){

    if(objdelete===false){
        objdelete=true
        elaborar=false
        console.log("voy a eliminar")
    }
    else{
        objdelete=false
        console.log("ya no puedo eliminar")
    }
}
//final de los controles
const btn1=document.getElementById("btn-1")
const btn2=document.getElementById("btn-2")
const btn3=document.getElementById("btn-3")




btn1.addEventListener("click",(e)=>{
    tag=model1
    console.log("se presiono 1",tag)

})
btn2.addEventListener("click", (e)=>{
    tag=model2
    console.log("se presiono 2",tag)
}, false)
btn3.addEventListener("click", (e)=>{
    tag=model3
    console.log("se presiono 3",tag)
}, false)
//agregar nuevos objetos en la pantalla
function createObject(event){
    //
     var intersects= raycaster.intersectObject(plane)

     
     if(intersects.length>0 && elaborar ){
        //esfera,relleno
        //const meshEsfera= new THREE.Mesh(cuadrado,rellenoC)
        //const objectPos= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
        //meshEsfera.position.set(objectPos.x,0,objectPos.z)
		const algoTag= tag.clone()
        if(tag==model1){
            const objectPos= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
            algoTag.position.set(objectPos.x,-0.21,objectPos.z)
            scene.add( algoTag );
    
            forniture.push( algoTag)
        }
        if (tag==model2){
            const objectPos= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
            algoTag.position.set(objectPos.x,0,objectPos.z)
            scene.add( algoTag );
    
            forniture.push( algoTag)

        }
        if(tag==model3){const objectPos= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
            algoTag.position.set(objectPos.x,0,objectPos.z)
            scene.add( algoTag );
    
            forniture.push( algoTag)}
     
      


     }

}
//eliminar objetos de la pantalla
var eliminar= document.getElementById("eliminar")

function eliminarObjeto(event){
    if( objdelete){

        var intersects = raycaster.intersectObjects(forniture);
        if (intersects.length>0){
            scene.remove( selected );
            //object.splice( forniture.indexOf( selected ), 1 );
        }

}

}




window.addEventListener('click', onMouseMove, false);
window.addEventListener('click', onMouseClick, false);
addButton.addEventListener("click", agregarObjeto, false)
Gbutton.addEventListener("click", girar,false)
window.addEventListener("click", createObject, false)
newObj.addEventListener("click",crearObjeto, false)
eliminar.addEventListener("click", estadoDelete, false)
window.addEventListener("click", eliminarObjeto, false)
window.addEventListener("mousemove", position, false)



//funcion para animar los objetos
function animate() {
    raycaster.setFromCamera(mouse, camera)
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}



animate();
agregarObjeto();
girar();
createObject();
position();



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