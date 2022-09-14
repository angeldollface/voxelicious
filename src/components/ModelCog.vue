<!--
VOXELICIOUS by Alexander Abraham, a.k.a. "Angel Dollface".
Licensed under the MIT license.
-->

<!--
This section holds the actual
three.js content.
We have two seperate functions to handle
the model for different screen sizes.
-->
<script>

// Import the three.js library.
import * as THREE from 'three';

// Naming and registering the
// component.
export default {

    // Naming the component.
    name: 'ModelCog',

    // Initializing empty data for
    // the model to be handled.
    data () {
        return {}
    },

    // Defining the component's methods.
    methods: {
        // The function to display the model
        // for desktops.
        desktopModel(){
            this.textureUrl = 'https://angeldollface.art/assets/images/matcaps/01.png';
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
            this.camera.position.z = 5;
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.vFOV = (this.camera.fov * Math.PI) / 180;
            this.height = 2 * Math.tan(this.vFOV / 2) * Math.abs(this.camera.position.z);
            this.width = this.height * this.camera.aspect;
            this.maxY = this.height/2.8;
            this.minY = this.maxY * -1;
            this.scene.add(this.camera);
            this.textureLoader = new THREE.TextureLoader();
            this.texture = this.textureLoader.load(this.textureUrl);

            this.geometry = new THREE.DodecahedronGeometry(0.5);
            this.material = new THREE.MeshMatcapMaterial({matcap: this.texture});
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.mesh.position.x = 0;
            this.mesh.position.y = this.maxY;
            this.mesh.rotation.y = 0.5;
            this.scene.add(this.mesh);

            this.renderer = new THREE.WebGLRenderer({alpha:true});
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.append(this.renderer.domElement);
            this.renderer.render(this.scene, this.camera);
            const tick = () => {
                this.mesh.position.y = this.mesh.position.y - 0.01;
                this.mesh.rotation.y += 0.01;
                this.mesh.rotation.x += 0.01;
                this.renderer.render(this.scene, this.camera);
                window.requestAnimationFrame(tick);
                if (this.mesh.position.y < this.minY) {
                    this.mesh.position.y = this.maxY;
                }
                else {}
            }
            tick();
        },
    },

    mounted () {
        this.desktopModel();
    }
};

</script>