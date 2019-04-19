"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = "#define SHADER_NAME luma_modular_vertex\n\n// object attributes\nattribute vec3 positions;\nattribute vec3 normals;\nattribute vec4 colors;\nattribute vec2 texCoords;\nattribute vec3 pickingColors;\n\nvoid main(void) {\n\n  // Set up position\n#ifdef MODULE_GEOMETRY\n  geometry_setPosition(positions);\n  geometry_setNormal(normals);\n#endif\n\n#ifdef MODULE_PROJECT\n  project_setPositionAndNormal_Model(positions, normals);\n  gl_Position = project_model_to_clipspace(positions);\n#endif\n\n  // Set up depth\n#ifdef MODULE_LOGDEPTH\n  logdepth_adjustPosition(gl_Position);\n#endif\n\n#ifdef MODULE_DIFFUSE\n  diffuse_setTextureCoordinate(texCoords);\n#endif\n\n  // Set up color calculations\n#ifdef MODULE_MATERIAL\n  material_setDiffuseColor(colors);\n  material_setDiffuseTextureCoordinates(texCoords);\n#endif\n\n#ifdef MODULE_LIGHTING\n  lighting_setPositionAndNormal(positions, normals);\n  lighting_apply_light(positions);\n  lighting_apply_reflection(positions);\n#endif\n\n#ifdef MODULE_PICKING\n  picking_setPickingColor(pickingColors);\n#endif\n\n}\n";
exports["default"] = _default;
//# sourceMappingURL=modular-vertex.glsl.js.map