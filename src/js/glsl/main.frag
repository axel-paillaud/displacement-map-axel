precision highp float;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

varying vec2 vUv;
varying vec2 vUvMap1;
varying vec2 vUvMap2;

void main() {
  //gl_FragColor = vec4(1.0);
  gl_FragColor = texture2D(uTexture2, vUvMap2);
}

