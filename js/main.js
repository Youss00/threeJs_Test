// Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Create a Three.JS Scene
const scene = new THREE.Scene();
// Create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



// Keep the 3D object on a global variable so we can access it later
let object;

// Set which object to render
let objToRender = 'Model';

// Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

// Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    // If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // If there is an error, log it
    console.error(error);
  }
);

// Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// Set how far the camera will be from the 3D model
camera.position.z = 5;

// Add a second light with a red color and low intensity
const redLight = new THREE.DirectionalLight(0xAA1B52, 4.5); // (color, intensity)
scene.add(redLight);

// Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 2); // (color, intensity)
topLight.position.set(500, 0, 500); // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 6);
scene.add(ambientLight);

// Variable to keep track of rotation speed
let scrollY = 0;
let mouseX = 0;
let smoothScrollY = 10;
let smoothMouseX = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1; // Normalize mouseX to range [-1, 1]
});

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function animate() {
    requestAnimationFrame(animate);

    // Interpolate the values for smooth scrolling
    smoothScrollY = lerp(smoothScrollY, scrollY, 0.08);
    smoothMouseX = lerp(smoothMouseX, mouseX, 0.1);

    if (object) {
        object.rotation.y = -smoothScrollY * 0.0008; // Adjust the rotation speed as needed
        object.position.x = -smoothMouseX * 0.5; // Invert the direction by adding a negative sign
    }

    // Adjust the zoom speed as needed and limit the zoom range
    camera.position.z = Math.min(5, Math.max(8, 12 - smoothScrollY * 0.0001));
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();