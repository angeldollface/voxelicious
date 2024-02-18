/*
VOXELICIOUS by Alexander Abraham, a.k.a. "Angel Dollface".
Licensed under the MIT license.
*/

// Import the three.js library.
import * as THREE from 'three';

// The function to display the model
// for desktops.
export function renderModel(){
    let meshSize: number = 0.3;
    let meshSpacing: number = 0.3;
    let textureUrl: string = 'https://angeldollface.boo/doll-cdn/images/matcaps/01.png';
    let scene: THREE.Scene = new THREE.Scene();
    let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
    camera.position.z = 4;
    camera.position.x = 0;
    camera.position.y = 0;
    scene.background = new THREE.Color(0xFFACA5);
    let vFOV: number = (camera.fov * Math.PI) / 180;
    let height: number = 2 * Math.tan(vFOV / 2) * Math.abs(camera.position.z);
    let width: number = height * camera.aspect;
    let textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
    let texture: THREE.Texture = textureLoader.load(textureUrl);
    let maxY: number = height/2.8;
    let maxX: number = width/2.8;
    let minX: number= maxX * -1;
    let rangeX: number = maxX * 2;       
    let meshNumber: number = Math.floor(rangeX/meshSize);
    let geometry: THREE.DodecahedronGeometry = new THREE.DodecahedronGeometry(meshSize);
    let material: THREE.MeshMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: texture});
    for(let i = 1; i < meshNumber+1; i++){
        if (i%2 === 0){
            let mesh: THREE.Mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = minX + (meshSpacing * i);
            mesh.position.y = maxY;
            mesh.rotation.y = 0.5;
            scene.add(mesh);
        }
        else {}
    }
    let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.append(renderer.domElement);
    renderer.render(scene, camera);
    let moveConstant: number = 0.005;
    let dYPerFrame: number = moveConstant;
    const tick = () => {
        window.requestAnimationFrame(tick);
        window.addEventListener('resize', resize);
        scene.traverse( 
            function ( object ) {
                let myObject: THREE.Mesh = object as THREE.Mesh;
                    if (myObject.isMesh ){   
                        myObject.position.y += dYPerFrame;
                        myObject.rotation.y = myObject.rotation.y + moveConstant;
                        myObject.rotation.x = myObject.rotation.x + moveConstant;                    
                        myObject.position.y += dYPerFrame; // move ball
                        if(myObject.position.y > 1.5) dYPerFrame = -1 * moveConstant; // if we're too far right, move towards the left
                        if(myObject.position.y < -1.5) dYPerFrame =  moveConstant; // if we're too far left, move towards the right again
                    };          
            }
        );
        renderer.render(scene, camera);
    }

    // Defining a nested function to adjust some renderer
    // and camera settings.
    const resize = () => {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    tick();
}

export default renderModel;
