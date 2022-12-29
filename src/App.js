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
		camera.position.z = 5;

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		

		const planeSize = 10;
		const side = 3; 
		amount = Math.pow(side, 2); 
		data = new Uint8Array(amount * 4);

		for (var i = 0; i < amount  ; i++) {

			if (i % 2 === 0){	
				var stride = (i) * side / (side/4);

				data[ stride ] 		= 255 ;// red
				data[ stride + 1 ] 	= 255 ;// green
				data[ stride + 2 ] 	= 0;// blue
				data[ stride + 3 ] 	= 254;// alpha
				
			}
			else{
				stride = (i) * side / (side/4);

				data[ stride ] 		= 255 ;// red
				data[ stride + 1 ] 	= 0 ;// green
				data[ stride + 2 ] 	= 0;// blue
				data[ stride + 3 ] 	= 254;// alpha
			}                       			

		}

		var dataTex = new THREE.DataTexture(data, side, side);
		//dataTex.rotation = 0.7;
		dataTex.magFilter = THREE.NearestFilter;
		dataTex.needsUpdate = true;

		var planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
		var planeMat = new THREE.MeshBasicMaterial({  map: dataTex, transparent: true, side: DoubleSide});
		plane = new THREE.Mesh(planeGeo, planeMat);
		plane.position.z = -5;
		scene.add(plane);

		geometry = new THREE.BoxGeometry(1, 1, 1);
		material = new THREE.MeshBasicMaterial({ map: dataTex});	
		cube = new THREE.Mesh(geometry, material);
		cube.position.x = -3;
		scene.add(cube);
		
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