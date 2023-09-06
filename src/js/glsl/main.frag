precision highp float;
uniform sampler2D uTexture1;

varying vec2 vUv;
//varying vec2 vUvMap1;

void main() {
  //gl_FragColor = vec4(1.0);
  vec4 texture1 = texture2D(uTexture1, vUv);
  gl_FragColor = texture1;
}

