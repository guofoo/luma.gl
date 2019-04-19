"use strict";var module1=module;module1.export({normalizeShaderModule:()=>normalizeShaderModule});var parsePropTypes;module1.link('./prop-types',{parsePropTypes(v){parsePropTypes=v}},0);

function defaultGetUniforms(module, props) {
  const uniforms = {};

  if (props === undefined) {
    for (const key in module.uniforms) {
      uniforms[key] = module.uniforms[key].value;
    }
    return uniforms;
  }

  for (const key in props) {
    // TODO validate, clamp etc
    uniforms[key] = props[key];
  }

  return uniforms;
}

// Note: modifies and returns the same module
function normalizeShaderModule(module) {
  if (!module.normalized) {
    module.normalized = true;

    // Normalize uniforms
    if (module.uniforms) {
      // ocular linter gets confused
      // eslint-disable-next-line
      const {propTypes} = parsePropTypes(module.uniforms);
      module.uniforms = propTypes;
    }

    // Build a getUniforms from the uniforms array
    if (module.uniforms && !module.getUniforms) {
      module.getUniforms = defaultGetUniforms.bind(null, module);
    }
  }

  return module;
}
