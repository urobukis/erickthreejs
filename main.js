import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background= new THREE.Color(0xcdcdcd)

camera.position.z = 5;

//plano


//cubo 1
const segundoCubo= new THREE.BoxGeometry(1,1,1)
const materialCubo=new THREE.MeshBasicMaterial({color:0x4169e1})
const segundoC= new THREE.Mesh(segundoCubo, materialCubo)
const posC1={x:1.2, y:0, z:0}
scene.add( segundoC )
segundoC.position.set(posC1.x, posC1.y, posC1.z)


//cubo 2
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


const plano= new THREE.PlaneGeometry(10,10)
const meshMaterial= new THREE.MeshBasicMaterial({color: 0xf9e37c, side: THREE.th})
const meshPlano= new THREE.Mesh(plano, meshMaterial)
const posPlano={x:0,y:-0.5,z:0}
meshPlano.rotateX( - Math.PI / 2);
meshPlano.position.set(posPlano.x, posPlano.y, posPlano.z)
scene.add(meshPlano)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );






const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();


function animate() {
	requestAnimationFrame( animate );

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}



animate();
