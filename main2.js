import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {  OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'  
import {DragControls} from 'three/examples/jsm/controls/DragControls.js'
import { Plane } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background= new THREE.Color(0xcdcdcd)

camera.position.z = 5;

var mouse = new THREE.Vector2();
var intersects;



//plano

/*
------------------------------------------------------------------------------------------------------
						Con funciones

----------------------------------------------------------------------------------------------------

function piso () {
	const plano= new THREE.PlaneGeometry(10,10)
	const meshMaterial= new THREE.MeshBasicMaterial({color: 0xf9e37c, side: THREE.DoubleSide})
	const meshPlano= new THREE.Mesh(plano, meshMaterial)
	const posPlano={x:0,y:-0.5,z:0}
	const grid= new THREE.GridHelper(10,10)
	meshPlano.rotateX( - Math.PI / 2);
	grid.rotateX( - Math.PI / 2)
	meshPlano.position.set(posPlano.x, posPlano.y, posPlano.z)


	meshPlano.name='ground'
	meshPlano.userData.ground= true;

	scene.add(meshPlano)



*/

function piso () {
	const pisobox= new THREE.BoxGeometry(10,0.1,10)
	const materialPisoBox= new THREE.MeshBasicMaterial({color:0xf9e37c })
	const meshPlano= new THREE.Mesh(pisobox, materialPisoBox)

	meshPlano.position.set(0,-0.7,0)
	


	
	meshPlano.name='ground'
	meshPlano.userData.ground= true;

	scene.add(meshPlano)

	

}
function greenBox () {
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.userData.draggable= true;
	cube.userData.name="greebox"

}
function blueBox () {
	const segundoCubo= new THREE.BoxGeometry(1,1,1)
	const materialCubo=new THREE.MeshBasicMaterial({color:0x4169e1})
	const segundoC= new THREE.Mesh(segundoCubo, materialCubo)
	const posC1={x:1.2, y:0, z:0}
	scene.add( segundoC )
	segundoC.position.set(posC1.x, posC1.y, posC1.z)
	segundoC.userData.draggable= true;
	segundoC.userData.name="bluebox"
}

function Ghelper(){
	const grid= new THREE.GridHelper(10,10)
	scene.add(grid)

}

/*
------------------------------------------------------------------------------------------------------
						Sin funciones

----------------------------------------------------------------------------------------------------

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.userData.draggable= true;
cube.userData.name="greebox"


const segundoCubo= new THREE.BoxGeometry(1,1,1)
const materialCubo=new THREE.MeshBasicMaterial({color:0x4169e1})
const segundoC= new THREE.Mesh(segundoCubo, materialCubo)
const posC1={x:1.2, y:0, z:0}
scene.add( segundoC )
segundoC.position.set(posC1.x, posC1.y, posC1.z)
segundoC.userData.draggable= true;
segundoC.userData.name="bluebox"
var objects=[cube,segundoC]


const plano= new THREE.PlaneGeometry(10,10)
const meshMaterial= new THREE.MeshBasicMaterial({color: 0xf9e37c, side: THREE.DoubleSide})
const meshPlano= new THREE.Mesh(plano, meshMaterial)
const posPlano={x:0,y:-0.5,z:0}
meshPlano.rotateX( - Math.PI / 2);
meshPlano.position.set(posPlano.x, posPlano.y, posPlano.z)
scene.add(meshPlano)
meshPlano.name='ground'
meshPlano.userData.ground= true;


const grid= new THREE.GridHelper(10,10)
scene.add(grid)
grid.position.set(0,-0.5,0)
---------------------------------------------------------------------------------------------------------------------------------------------
*/







const heightlightMesh= new THREE.Mesh(
	new THREE.PlaneGeometry(1,1),
	new THREE.MeshBasicMaterial({side:THREE.DoubleSide})
)

heightlightMesh.rotateX(Math.PI/2)
heightlightMesh.position.set(0.5,0,0.5)
scene.add(heightlightMesh)






const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/** 
 * 
 * 
 * 
 * 
 * 
//DCONTROLS
const dcontrol= new DragControls( objects, camera, renderer.domElement );

dcontrol.activate();
dcontrol.activate();

dcontrol.addEventListener("drag", function(event){
	console.log("drag")
	event.object.position.y=0;

})
*/



const controls = new OrbitControls( camera, renderer.domElement );
const loader = new OBJLoader();


function animate() {
	dragObject()

	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

const raycaster= new THREE.Raycaster();
const clickMouse= new THREE.Vector2();
const moveMouse= new THREE.Vector2()
var draggable= THREE.Object3D;




window.addEventListener("click", function(e){

})




/*
FUNCIONA PERO NO DEL TODO 

window.addEventListener('click', event=>{
	moveMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	moveMouse.z = - ( event.clientY / window.innerHeight ) * 2 + 1;
	const pos=[moveMouse.x, moveMouse.y]
	console.log(`el puntero se movio hacia ${pos}`)


	raycaster.setFromCamera(moveMouse, camera)
	var intersects = raycaster.intersectObject(meshPlano);

	if (intersects.length > 0) {
        // Mueve la caja a la posición del punto de intersección
			const heightlightPos= new THREE.Vector3().copy(intersects[0].point).floor().addScalar(0.5)
			cube.position.set(heightlightPos.x, 0, heightlightPos.z)

        

    }


	
})

*/
//---------------------------------------------------------------------------------------------------------------------------------

//FUNCION PARA MOVER EXPERIMENTAL
window.addEventListener('click', event=>{
	


	clickMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clickMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


	raycaster.setFromCamera(clickMouse, camera)
	var intersects= raycaster.intersectObjects(scene.children)


	if (draggable != null) {
		console.log(`dropping draggable ${draggable.name}`)
		
		return draggable = null
	  }



	if(intersects.length>0){
		if(intersects[0].object.userData.draggable){
			draggable=intersects[0].object
			console.log(`el nombre es ${draggable.userData.name}`)
		}
		//var objetoSeleccionado= intersects[0].object
		//objetoSeleccionado.material.color.set(0xff0000)
	}




	
})


window.addEventListener('mousemove', event => {
	moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });








  function dragObject() {
	if (draggable != null) {
	  var intersects= raycaster.intersectObjects(scene.children, true)
	  		

	  if (intersects.length > 0) {
		
		for (let i = 0; i < intersects.length ; i++) {
		  if (intersects[i].object.userData.ground!=true){
			draggable=intersects[0].object
		  let target = (intersects[i].point)

			
			draggable.position.set(target.x, 0, target.z)
		  }


		}
	  }
	}
  }
  

  //window.addEventListener("drag",  dragObject, false)
//--------------------------------------------------------------------------------------------------------------------------------

window.addEventListener("mousemove", function(e){
	moveMouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	moveMouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera(moveMouse, camera)


	intersects= raycaster.intersectObjects(scene.children)	
	intersects.forEach(function(intersect) {
		if(intersect.object.name==="ground"){
			const heightlightPos= new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5)
			heightlightMesh.position.set(heightlightPos.x, -0.49, heightlightPos.z)
		}

	});

})



	
	/*
	
		nota importante para hacer que las paredes sean invisibles al enfocar se usar el mismo ray caster para ello
		se debe crear una constante que haga un array con todos los elementos en este caso 
			const found= raycaster.intersectObjects( scene.children );
		 una vez creada se puede llamar a un condicinal en el cual se llame a esta constante que sera un array con todos
		 los elementos en el plano que la camara pueda observar de la siguiente forma
	
		 found[0].object.userData.xxxxx
		las xxxx se remplazan con la propiedad el objeto que uno desee, luego puede usarse para modificar las propiedades del objeto 
	*/
	animate();
	blueBox();
	greenBox();
	
	piso()

	