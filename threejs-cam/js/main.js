window.addEventListener("load", event => main());
//window.addEventListener("resize", event => resize());

const getRandom = ((min, max) => Math.floor(Math.random() * (max - min) + min))

const resize = (renderer, camera) => {

	//console.log("resize", window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.updateProjectionMatrix();


};

const createCube = (color, x) => {

	// create cube geom and material
	var geometry = new THREE.BoxGeometry(x, x, x);
	var material = new THREE.MeshBasicMaterial( {color: color} );
	var cube = new THREE.Mesh( geometry, material );
	return cube;

};

const createCylinder = (color, raduisTop, raduisBot, h, segment) => {

	//create cylinder geometry and material
	var geometry = new THREE.CylinderGeometry(raduisTop, raduisBot, h, segment);
	var material = new THREE.MeshBasicMaterial( {color: color} );
	var cylinder = new THREE.Mesh(geometry, material);
	return cylinder;
};

const createCone = (color, raduis, h, segment) => {

	//create cone geometry and material
	var geometry = new THREE.ConeGeometry( raduis, h, segment);
	var material = new THREE.MeshBasicMaterial( {color: color} );
	var cone = new THREE.Mesh( geometry, material );
	return cone;
};



const main = () => {

	console.log("hello world");

	let height = 100;
	let raduis = 50;

	// random color
	let color = "rgb("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+")";

	// initialisation de la scène
	var scene = new THREE.Scene();

	// init camera
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

	// web gl renderer
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild(renderer.domElement);
	
	var cube = createCube(color,height,height);
	scene.add(cube); // add cube to scene

	color = "rgb("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+")";
	var cylinder = createCylinder(color,raduis,raduis,height,20);
	cylinder.position.x = 200; //change cylinder x position 
	scene.add(cylinder)

	color = "rgb("+getRandom(0,255)+","+getRandom(0,255)+","+getRandom(0,255)+")";
	let cone = createCone(color, raduis, height, 20);
	cone.position.x = -200; //change cone x position 
	scene.add(cone);
	

	camera.position.z = 500;

	//let firstPerson = new FirstPersonControls(camera, document.body);

	animate();

	// animate loop
	function  animate (){
		
		requestAnimationFrame(animate); // request next frame
		resize(renderer, camera); //resize 
		
		cube.rotation.x += 0.006;
		cube.rotation.y += 0.006;


		//move cylinder
		cylinder.rotation.x += 0.01;
		cylinder.rotation.y += 0.01;

		//move cone
		cone.rotation.x += 0.004;
		cone.rotation.y += 0.004;

		// render !
		renderer.render(scene, camera)
	}
	
};


