#ifdef GL_ES
precision mediump float;
#endif


varying vec2 vTexCoord;

uniform sampler2D cam_tx;
uniform sampler2D normal_tx;
uniform sampler2D reflection_tx;
uniform sampler2D fresnel_tx;
uniform sampler2D diffuse_tx;

vec3 blur(sampler2D texSampler, vec2 uv, vec2 resolution) {
  vec3 color = vec3(0.0);

  for(float i = -13.0; i <= 13.0; i++) {
    for(float j = -13.0; j <= 13.0; j++) {
      color += texture2D(texSampler, uv + vec2(i, j) * resolution).rgb;
    }
  }

  return color * (1.0 / pow(26.0, 2.0));
}

void main() {
  vec2 uv = vTexCoord;

  float fresnel_c = texture2D(fresnel_tx, uv).r;
  vec2 normal_pos = texture2D(normal_tx, uv).rg;
  vec3 diff_c = texture2D(diffuse_tx, uv).rgb;
  vec3 refl_c = texture2D(reflection_tx, uv).rgb;

  vec3 camera_c = texture2D(cam_tx, normal_pos).rgb;
  vec3 blur_c = blur(cam_tx, normal_pos, vec2(0.007, 0.007));
  vec3 mixed_c = mix(blur_c, camera_c, 0.3);

  vec3 color = mix(mixed_c, diff_c, 1.0 - fresnel_c * 1.8);
  color += refl_c * 0.2;

  gl_FragColor = vec4(color, 1.0);
}