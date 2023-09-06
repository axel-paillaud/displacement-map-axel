import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl';
import vertex from '../glsl/main.vert';
import fragment from '../glsl/main.frag';

{
    const canvasEl = document.getElementById('canvas');
    const sceneEl = document.querySelector('.scene');
    const renderer = new Renderer({dpr: Math.min(window.devicePixelRatio, 2), canvas: canvasEl});
    const gl = renderer.gl;
    //gl.clearColor(1, 1, 1, 1)

    const camera = new Camera(gl);
    camera.position.z = 5;

    function resize() {
        renderer.setSize(sceneEl.offsetWidth, sceneEl.offsetHeight);
        camera.perspective({
            aspect: gl.canvas.width / gl.canvas.height,
        });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    const geometry = new Box(gl);

    const program = new Program(gl, {
        vertex: vertex, 
        fragment: fragment,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    requestAnimationFrame(update);
    function update(t) {
        requestAnimationFrame(update);

        mesh.rotation.y -= 0.04;
        mesh.rotation.x += 0.03;
        renderer.render({ scene, camera });
    }
}
