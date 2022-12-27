import React,{Component} from 'react';
import './App.css';
import * as THREE from "three";
//import { DoubleSide } from 'three';

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
		var side = 64; 
		amount = Math.pow(side, 2); 
		data = new Uint8Array(amount);


		for (var i = 0; i < amount; i++) {
			for ( var j = 0; j < amount; j++){
				data[i * amount + j] = (i - j) % 2;
			}
		}

		var dataTex = new THREE.DataTexture(data, side, side, THREE.LuminanceFormat);
		//dataTex.rotation = 0.7;
		dataTex.magFilter = THREE.NearestFilter;
		dataTex.needsUpdate = true;

		var planeGeo = new THREE.PlaneBufferGeometry(10, 10);
		var planeMat = new THREE.MeshBasicMaterial({  map: dataTex });
		plane = new THREE.Mesh(planeGeo, planeMat);
		plane.position.z = -5;
		scene.add(plane);
		
		

		return renderer.domElement;
	
	}
	
	animate() {
  		requestAnimationFrame(this.animate);

  		cube.rotation.x += 0.01;
  		cube.rotation.y += 0.01;
		//plane.rotation.x += 0.01;
		
		

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