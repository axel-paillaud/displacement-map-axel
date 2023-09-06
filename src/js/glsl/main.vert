attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;
//varying vec2 vUvMap1;

void main() {
    vUv = uv;

    //vUvMap1 = uv;
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vec4(position, 0, 1);
}

