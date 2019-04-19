import { Matrix4 } from 'math.gl';
import { Buffer, _Accessor as Accessor, GroupNode, log } from '@luma.gl/core';
import GLTFAnimator from './gltf-animator';
import createGLTFModel from './create-gltf-model';
const ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
const DEFAULT_OPTIONS = {
  modelOptions: {},
  pbrDebug: false,
  imageBasedLightingEnvironment: null,
  lights: true
};
export default class GLTFInstantiator {
  constructor(gl) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.gl = gl;
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
  }

  instantiate(gltf) {
    this.gltf = gltf;
    const scenes = (gltf.scenes || []).map(scene => this.createScene(scene));
    return scenes;
  }

  createAnimator() {
    if (Array.isArray(this.gltf.animations)) {
      return new GLTFAnimator(this.gltf);
    }

    return null;
  }

  createScene(gltfScene) {
    const gltfNodes = gltfScene.nodes || [];
    const nodes = gltfNodes.map(node => this.createNode(node));
    const scene = new GroupNode({
      id: gltfScene.name || gltfScene.id,
      children: nodes
    });
    return scene;
  }

  createNode(gltfNode) {
    if (!gltfNode._node) {
      const gltfChildren = gltfNode.children || [];
      const children = gltfChildren.map(child => this.createNode(child));

      if (gltfNode.mesh) {
        children.push(this.createMesh(gltfNode.mesh));
      }

      const node = new GroupNode({
        id: gltfNode.name || gltfNode.id,
        children
      });

      if (gltfNode.matrix) {
        node.setMatrix(gltfNode.matrix);
      } else {
        node.matrix.identity();

        if (gltfNode.translation) {
          node.matrix.translate(gltfNode.translation);
        }

        if (gltfNode.rotation) {
          const rotationMatrix = new Matrix4().fromQuaternion(gltfNode.rotation);
          node.matrix.multiplyRight(rotationMatrix);
        }

        if (gltfNode.scale) {
          node.matrix.scale(gltfNode.scale);
        }
      }

      gltfNode._node = node;
    }

    return gltfNode._node;
  }

  createMesh(gltfMesh) {
    if (!gltfMesh._mesh) {
      const gltfPrimitives = gltfMesh.primitives || [];
      const primitives = gltfPrimitives.map((gltfPrimitive, i) => this.createPrimitive(gltfPrimitive, i, gltfMesh));
      const mesh = new GroupNode({
        id: gltfMesh.name || gltfMesh.id,
        children: primitives
      });
      gltfMesh._mesh = mesh;
    }

    return gltfMesh._mesh;
  }

  getVertexCount(attributes) {
    log.warn('getVertexCount() not found')();
  }

  createPrimitive(gltfPrimitive, i, gltfMesh) {
    return createGLTFModel(this.gl, Object.assign({
      id: gltfPrimitive.name || "".concat(gltfMesh.name || gltfMesh.id, "-primitive-").concat(i),
      drawMode: gltfPrimitive.mode || 4,
      vertexCount: gltfPrimitive.indices ? gltfPrimitive.indices.count : this.getVertexCount(gltfPrimitive.attributes),
      attributes: this.createAttributes(gltfPrimitive.attributes, gltfPrimitive.indices),
      material: gltfPrimitive.material
    }, this.options));
  }

  createAttributes(attributes, indices) {
    const loadedAttributes = {};
    Object.keys(attributes).forEach(attrName => {
      loadedAttributes[attrName] = this.createAccessor(attributes[attrName], this.createBuffer(attributes[attrName], this.gl.ARRAY_BUFFER));
    });

    if (indices) {
      loadedAttributes.indices = this.createAccessor(indices, this.createBuffer(indices, this.gl.ELEMENT_ARRAY_BUFFER));
    }

    log.info(4, 'glTF Attributes', {
      attributes,
      indices,
      generated: loadedAttributes
    })();
    return loadedAttributes;
  }

  createBuffer(attribute, target) {
    if (!attribute.bufferView) {
      attribute.bufferView = {};
    }

    const bufferView = attribute.bufferView;

    if (!bufferView.lumaBuffers) {
      bufferView.lumaBuffers = {};
    }

    if (!bufferView.lumaBuffers[target]) {
      bufferView.lumaBuffers[target] = new Buffer(this.gl, {
        id: "from-".concat(bufferView.id),
        data: bufferView.data || attribute.value,
        target
      });
    }

    return bufferView.lumaBuffers[target];
  }

  createAccessor(accessor, buffer) {
    return new Accessor({
      buffer,
      offset: accessor.byteOffset || 0,
      stride: accessor.bufferView.byteStride || 0,
      type: accessor.componentType,
      size: ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type]
    });
  }

  createSampler(gltfSampler) {
    return gltfSampler;
  }

  needsPOT() {
    return false;
  }

}
//# sourceMappingURL=gltf-instantiator.js.map