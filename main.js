import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {  OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'  


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background= new THREE.Color(0xcdcdcd)

camera.position.z = 5;

var mouse = new THREE.Vector2();
var intersects = new THREE.Vector3();


//plano

function cubeBlue(){
	//cubo 1
	const segundoCubo= new THREE.BoxGeometry(1,1,1)
	const materialCubo=new THREE.MeshBasicMaterial({color:0x4169e1})
	const segundoC= new THREE.Mesh(segundoCubo, materialCubo)
	const posC1={x:1.2, y:0, z:0}
	scene.add( segundoC )
	segundoC.position.set(posC1.x, posC1.y, posC1.z)
	segundoC.userData.draggable= true;
	segundoC.userData.name="bluebox"
}


function cubeGreen(){
	//cubo 2
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	cube.userData.draggable= true;
	cube.userData.name="greebox"
}


function plane () {
	const plano= new THREE.PlaneGeometry(10,10)
	const meshMaterial= new THREE.MeshBasicMaterial({color: 0xf9e37c, side: THREE.DoubleSide})
	const meshPlano= new THREE.Mesh(plano, meshMaterial)
	const posPlano={x:0,y:-0.5,z:0}
	meshPlano.rotateX( - Math.PI / 2);
	meshPlano.position.set(posPlano.x, posPlano.y, posPlano.z)
	scene.add(meshPlano)
	meshPlano.userData.ground= true;
}


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );






const controls = new OrbitControls( camera, renderer.domElement );
const loader = new OBJLoader();


function animate() {

	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

const raycaster= new THREE.Raycaster();
const clickMouse= new THREE.Vector2();
const moveMouse= new THREE.Vector2()
var draggable= THREE.Object3D;



function selectObjet(event){
	
    if(draggable){

		console.log(`objeto`)
		draggable= null
		return;
	}

	clickMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	clickMouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
	raycaster.setFromCamera( clickMouse, camera );
	//const position=[clickMouse.x, clickMouse.y]

	//console.log("posicion",{position})
	const found= raycaster.intersectObjects( scene.children );

	if(found.length>0 && found[0].object.userData.draggable){
		draggable=found[0].object
		console.log(`found draggable ${draggable.userData.name}`)
	}

			


	}

window.addEventListener("click", selectObjet, false)



window.addEventListener('click', event=>{
	moveMouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	moveMouse.z = - ( event.clientY / window.innerHeight ) * 2 + 1;
	const pos=[moveMouse.x, moveMouse.y]
	console.log(`el puntero se movio hacia ${pos}`)

	
})


/*

function dragObject(){
    
    if (draggable !=null){
        raycaster.setFromCamera(moveMouse, camera)
        const found= raycaster.intersectObjects( scene.children );
        if (found.length>0){
            for(let o of found){
                if(o.userData.ground)  
                continue
                
                draggable.clientX= o.point.x
                draggable.clientY= o.point.z

            }
        }
    }
}

*/

/*
function dragObject(event){ 

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    raycaster.ray.intersectPlane(plane, intersects);
    mesh.position.set(intersects.x, intersects.y, intersects.z);
  
}
* */


	
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
	plane();
	cubeBlue();
	cubeGreen();
