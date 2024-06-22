// script.js

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Add a simple cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add a floor
const floorGeometry = new THREE.PlaneGeometry(500, 500);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Position the camera
camera.position.z = 5;

// Render loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the cube for some basic animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

let cubeSpeed = 0.1;

function moveCube(event) {
    switch (event.key) {
        case 'ArrowUp':
            cube.position.z -= cubeSpeed;
            break;
        case 'ArrowDown':
            cube.position.z += cubeSpeed;
            break;
        case 'ArrowLeft':
            cube.position.x -= cubeSpeed;
            break;
        case 'ArrowRight':
            cube.position.x += cubeSpeed;
            break;
    }
}

document.addEventListener('keydown', moveCube);

animate();
