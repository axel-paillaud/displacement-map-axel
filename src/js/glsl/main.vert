attribute vec2 uv;
attribute vec2 position;

uniform vec2 uvRepeat1;
uniform vec2 uvOffset1;

varying vec2 vUv;
varying vec2 vUvMap1;

void main() {
    vUv = uv;

    vUvMap1 = uv;

    // Get the background-cover effect
    vUvMap1 *= uvRepeat1;
    vUvMap1 += uvOffset1;
    gl_Position = vec4(position, 0, 1);
}

