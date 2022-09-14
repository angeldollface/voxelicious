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
            this.meshSize = 0.3;
            this.meshSpacing = 0.3;
            this.textureUrl = 'https://angeldollface.art/assets/images/matcaps/01.png';
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);
            this.camera.position.z = 5;
            this.camera.position.x = 0;
            this.camera.position.y = 0;
            this.vFOV = (this.camera.fov * Math.PI) / 180;
            this.height = 2 * Math.tan(this.vFOV / 2) * Math.abs(this.camera.position.z);
            this.width = this.height * this.camera.aspect;

            this.textureLoader = new THREE.TextureLoader();
            this.texture = this.textureLoader.load(this.textureUrl);

            var maxY = this.height/2.8;
            var minY = maxY * -1;

            this.maxX = this.width/2.8;
            this.minX = this.maxX * -1;

            this.rangeX = this.maxX * 2;
            this.rangeY = this.maxY * 2;

            this.lateralUnit = this.rangeX/this.meshSize;            
            this.meshNumber = Math.floor(this.rangeX/this.meshSize);

            this.geometry = new THREE.DodecahedronGeometry(this.meshSize);
            this.material = new THREE.MeshMatcapMaterial({matcap: this.texture});

            for(var i = 1; i < this.meshNumber+1; i++){
                if (i%2 === 0){
                    var mesh = new THREE.Mesh(this.geometry, this.material);
                    mesh.position.x = this.minX + (this.meshSpacing * i);
                    mesh.position.y = maxY;
                    mesh.rotation.y = 0.5;
                    this.scene.add(mesh);
                }
                else {}
            }

            this.renderer = new THREE.WebGLRenderer({alpha:true});
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            document.body.append(this.renderer.domElement);
            this.renderer.render(this.scene, this.camera);
            const tick = () => {
                window.requestAnimationFrame(tick);
                this.scene.traverse( 
                    function ( object ) {
                        if (object.isMesh ){
                            
                            object.position.y = object.position.y - 0.01;
                            object.rotation.y = object.rotation.y + 0.01;
                            object.rotation.x = object.rotation.x + 0.01;
                            if (object.position.y < minY) {
                                object.position.y = maxY;
                            }
                            else {}                            
                        }
                        else {}
                    }
                );
                this.renderer.render(this.scene, this.camera);
            }
            tick();
        },
    },

    mounted () {
        this.desktopModel();
    }
};

</script>