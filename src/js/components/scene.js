import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl';
import GUI from 'lil-gui'
import vertex from '../glsl/main.vert';
import fragment from '../glsl/main.frag';

class Scene {
    mesh;
    renderer;
    scene;
    camera;

    constructor() {
        this.setGUI();
        this.setScene();
        this.events();
        this.resize();
    }


    // GUI bar slider
    setGUI() {
        const gui = new GUI();
        gui.add({offset: 1}, 'offset', 0, 1);
    }

    setScene() {

        const canvasEl = document.getElementById('canvas');
        this.sceneEl = document.querySelector('.scene');
        this.renderer = new Renderer({dpr: Math.min(window.devicePixelRatio, 2), canvas: canvasEl});
        const gl = this.renderer.gl;
        //gl.clearColor(1, 1, 1, 1)

        this.camera = new Camera(this.gl);
        this.camera.position.z = 5;

        this.scene = new Transform();

        const geometry = new Box(gl);

        const program = new Program(gl, {
            vertex: vertex, 
            fragment: fragment,
        });

        this.mesh = new Mesh(gl, { geometry, program });
        this.mesh.setParent(this.scene);

    }

    events() {
        requestAnimationFrame(this.update);
        window.addEventListener('resize', this.resize, false);
    }

    update = (t) => {
        requestAnimationFrame(this.update);

        this.mesh.rotation.y -= 0.04;
        this.mesh.rotation.x += 0.03;
        this.renderer.render({ scene: this.scene, camera: this.camera });
    }

    resize() {
        this.renderer.setSize(this.sceneEl.offsetWidth, this.sceneEl.offsetHeight);
        this.camera.perspective({
            aspect: this.renderer.gl.canvas.width / this.renderer.gl.canvas.height,
        });
    }
}

export default Scene;
