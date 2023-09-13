import { Renderer, Transform, Triangle, Program, Mesh } from 'ogl';
import { getCoverUV } from '../utils/ogl.js'
import { gsap } from 'gsap'
import LoaderManager from '../managers/LoaderManager.js';
import GUI from 'lil-gui'
import vertex from '../glsl/main.vert';
import fragment from '../glsl/main.frag';

class Scene {
    mesh;
    renderer;
    scene;
    program;
    guiObj = {
        offset: 1
    };

    constructor() {
        this.setGUI();
        this.setScene();
        this.events();
        this.resize();
    }


    // GUI bar slider
    setGUI() {
        const gui = new GUI();

        const handleChange = (value) => {
            this.program.uniforms.uOffset.value = value
          }

        
        gui.add(this.guiObj, 'offset', 0, 1).onChange(handleChange);
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
            {
                name: 'img2',
                texture: './images/image-2.JPG',
            },
            {
                name: 'displacement-map',
                texture: './images/displacement-map-2.png'
            }
        ], gl);

        const uvCover1 = getCoverUV(gl, LoaderManager.assets['img1'].image);
        const uvCover2 = getCoverUV(gl, LoaderManager.assets['img2'].image);
        
        this.program = new Program(gl, {
            vertex, 
            fragment,
            uniforms: {
                uTime: { value: 0},
                uOffset: { value: this.guiObj.offset },
                uTexture1: { value: LoaderManager.assets['img1'] },
                uvRepeat1: { value: uvCover1.repeat},
                uvOffset1: { value: uvCover1.offset},
                uTexture2: { value: LoaderManager.assets['img2'] },
                uvRepeat2: { value: uvCover2.repeat},
                uvOffset2: { value: uvCover2.offset},
                uDisplacementTexture: { value: LoaderManager.assets['displacement-map']}
            },
        });

        this.mesh = new Mesh(gl, { geometry, program : this.program });
    }

    events() {
        requestAnimationFrame(this.update);
        window.addEventListener('resize', this.resize, false);

        const { gl } = this.renderer;

        gl.canvas.addEventListener('mouseenter', this.handleMouseenter);
        gl.canvas.addEventListener('mouseleave', this.handleMouseleave);
    }

    handleMouseenter = () => {
        gsap.fromTo(
          this.program.uniforms.uOffset,
          { value: 0 },
          { value: 1, duration: 1.6, ease: 'expo.out'}
        )
      }
    
      handleMouseleave = () => {
        gsap.fromTo(
          this.program.uniforms.uOffset,
          { value: 1 },
          { value: 0, duration: 1.6, ease: 'expo.out'}
        )
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
