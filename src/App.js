import React,{Component} from 'react';
import './App.css';
import * as THREE from "three";
import { DoubleSide } from 'three';

let scene, camera, renderer, cube, data;
let geometry, material, plane, amount;

class App extends Component{
	constructor(props){
		super(props);
		this.animate = this.animate.bind(this);
	}


	init(){

		scene = new THREE.Scene();
		scene.background = new THREE.Color (0x556B2F);

		camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		//document.body.appendChild(renderer.domElement);

		geometry = new THREE.BoxGeometry();
		material = new THREE.MeshBasicMaterial({color: 0xDEB887, wireframe: false});	
		cube = new THREE.Mesh(geometry, material);

		scene.add(cube);
		camera.position.z = 5;

		/*Data texture*/
		var side = 32; // power of two textures are better cause powers of two are required by some algorithms. Like ones that decide what color will pixel have if amount of pixels is less than amount of textels (see three.js console error when given non-power-of-two texture)

		amount = Math.pow(side, 2); // you need 4 values for every pixel in side*side plane
		data = new Uint8Array(amount);
		/* 
  		You can also use any js typed array or ArrayBuffer itself
  		Most popular is Uint8Array (it can contain itegers from 0 to 255)
		*/
		for (var i = 0; i < amount; i++) {
  		data[i] = Math.random()*256; // generates random r,g,b,a values from 0 to 1
 		 /*  
  		  When using Uint8Array multiply the random value by 255 to get same results
  		  'cause in that case you use integers from 0 to 255 to represent colors
  		  which is limiting but is more widely supported (see comment below)
 		 */
		}
		console.log(renderer.context.getExtension('OES_texture_float'));
		console.log(renderer.context.getExtension('OES_texture_float_linear'));
		/* 
		   If you got nothing, check console to see if you have this extension
		   If not: use Uint8Array instead of Float32Array and THREE.UnsignedByteType istead of 
		   THREE.FloatType in texture constructor
		*/
		var dataTex = new THREE.DataTexture(data, side, side, THREE.LuminanceFormat, THREE.UnsignedByteType);
		console.log(dataTex);
		/* 
		In order to use the types THREE.FloatType and THREE.HalfFloatType, the WebGL implementation must support the respective extensions OES_texture_float and OES_texture_half_float.
		https://threejs.org/docs/index.html#Reference/Textures/DataTexture
		https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Using_Extensions
		*/
		dataTex.magFilter = THREE.NearestFilter; // also check out THREE.LinearFilter just to see the results
		dataTex.needsUpdate = true; // somehow this line is required for this demo to work. I have not figured that out yet. 

		/*Plane*/
		var planeGeo = new THREE.PlaneBufferGeometry(15, 15);
		var planeMat = new THREE.MeshStandardMaterial({ color: 0x4422ff, alphaMap: dataTex, transparent: true, side: DoubleSide });
		plane = new THREE.Mesh(planeGeo, planeMat);
		plane.position.z = -1;
		scene.add(plane);
		
		

		return renderer.domElement;
	
	}
	
	animate() {
  		requestAnimationFrame(this.animate);

  		cube.rotation.x += 0.01;
  		cube.rotation.y += 0.01;
		plane.rotation.x += 0.01;
		
		

  		renderer.render(scene, camera);
	}

	componentDidMount(){
		document.getElementById("Render").appendChild(this.init());
		this.animate();

	}
	render() {
  		return <div id="Render" className="App"></div>;
	}
}
export default App;