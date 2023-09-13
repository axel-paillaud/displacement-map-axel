precision highp float;
uniform float uTime;
uniform float uOffset;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacementTexture;

varying vec2 vUv;
varying vec2 vUvMap1;
varying vec2 vUvMap2;

const float displacementCoef = 0.3;

void main() {
  vec4 displacementTexture = texture2D(uDisplacementTexture, vUv);

  float displaceForce1 = displacementTexture.r * uOffset * displacementCoef;
  vec2 uvDisplaced1 = vec2(vUvMap1.x + displaceForce1, vUvMap1.y + displaceForce1);
  vec4 displacedTexture1 = texture2D(uTexture1, uvDisplaced1);

  float displaceForce2 = displacementTexture.r * (1. - uOffset ) * displacementCoef;
  vec2 uvDisplaced2 = vec2(vUvMap2.x - displaceForce2, vUvMap2.y - displaceForce2);
  vec4 displacedTexture2 = texture2D(uTexture2, uvDisplaced2);

  //gl_FragColor = (displacedTexture1);
  gl_FragColor = (displacedTexture1 * (1. - uOffset) + displacedTexture2 * uOffset);
  //gl_FragColor = texture2D(uTexture2, vUvMap2);
}
