import { Renderer, Camera, Transform, Triangle, Program, Mesh } from 'ogl';
import LoaderManager from '../managers/LoaderManager.js';
import GUI from 'lil-gui'
import vertex from '../glsl/main.vert';
import fragment from '../glsl/main.frag';

class Scene {
    mesh;
    renderer;
    scene;

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

    async setScene() {

        const canvasEl = document.getElementById('canvas');
        this.sceneEl = document.querySelector('.scene');
        this.renderer = new Renderer({dpr: Math.min(window.devicePixelRatio, 2), canvas: canvasEl});
        const gl = this.renderer.gl;
        gl.clearColor(1, 0.8, 1, 1)

        const geometry = new Triangle(gl);

        // to load images textures, do
        await LoaderManager.load(
        [
            {
                name: 'img1',
                texture: './images/image-1.JPG',
            },
        ], gl);
        
        const program = new Program(gl, {
            vertex, 
            fragment,
            uniforms: {
                uTexture1: { value: LoaderManager.assets['img1'] },
            },
        });

        this.mesh = new Mesh(gl, { geometry, program });
    }

    events() {
        requestAnimationFrame(this.update);
        window.addEventListener('resize', this.resize, false);
    }

    update = (t) => {
        requestAnimationFrame(this.update);

        if (this.mesh) {
            this.renderer.render({ scene: this.mesh });
        }
    }

    resize = () => {
        this.renderer.setSize(this.sceneEl.offsetWidth, this.sceneEl.offsetHeight);
    }
}

export default Scene;
