import random from '../utils/random';
var fs = "uniform float blurRadius;\nuniform float gradientRadius;\nuniform vec2 start;\nuniform vec2 end;\nuniform bool invert;\n\nvec2 tiltShift_getDelta() {\n  vec2 vector = normalize(end - start);\n  return invert ? vec2(-vector.y, vector.x) : vector;\n}\n\nvec4 tiltShift_sampleColor(sampler2D texture, vec2 texSize, vec2 texCoord) {\n  vec4 color = vec4(0.0);\n  float total = 0.0;\n\n  /* randomize the lookup values to hide the fixed number of samples */\n  float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n  vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n  float radius = smoothstep(0.0, 1.0,\n    abs(dot(texCoord * texSize - start, normal)) / gradientRadius) * blurRadius;\n\n  for (float t = -30.0; t <= 30.0; t++) {\n    float percent = (t + offset - 0.5) / 30.0;\n    float weight = 1.0 - abs(percent);\n    vec4 sample = texture2D(texture, texCoord + tiltShift_getDelta() / texSize * percent * radius);\n\n    /* switch to pre-multiplied alpha to correctly blur transparent images */\n    sample.rgb *= sample.a;\n\n    color += sample * weight;\n    total += weight;\n  }\n\n  color = color / total;\n\n  /* switch back from pre-multiplied alpha */\n  color.rgb /= color.a + 0.00001;\n\n  return color;\n}\n";
var uniforms = {
  blurRadius: {
    value: 15,
    min: 0,
    max: 50
  },
  gradientRadius: {
    value: 200,
    min: 0,
    max: 400
  },
  start: [0, 0],
  end: [1, 1],
  invert: {
    value: false,
    "private": true
  }
};
export default {
  name: 'tiltShift',
  uniforms: uniforms,
  fs: fs,
  dependencies: [random],
  passes: [{
    sampler: true,
    uniforms: {
      invert: false
    }
  }, {
    sampler: true,
    uniforms: {
      invert: true
    }
  }]
};
//# sourceMappingURL=tiltshift.js.map