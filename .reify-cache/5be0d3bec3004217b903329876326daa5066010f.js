"use strict";var test;module.link('tape-catch',{default(v){test=v}},0);var GL;module.link('@luma.gl/constants',{default(v){GL=v}},1);var VertexArray,VertexArrayObject,Buffer;module.link('@luma.gl/webgl',{VertexArray(v){VertexArray=v},VertexArrayObject(v){VertexArrayObject=v},Buffer(v){Buffer=v}},2);var fixture;module.link('test/setup',{fixture(v){fixture=v}},3);





const BUFFER_DATA = new Float32Array([0, 1, 0, -1, -1, 0, 1, -1, 0]);

test('WebGL#VertexArray construct/delete', t => {
  const {gl} = fixture;

  t.throws(() => new VertexArray(), 'VertexArray throws on missing gl context');

  const vao = new VertexArray(gl);
  t.ok(vao instanceof VertexArray, 'VertexArray construction successful');

  vao.delete();
  t.ok(vao instanceof VertexArray, 'VertexArray delete successful');

  vao.delete();
  t.ok(vao instanceof VertexArray, 'VertexArray repeated delete successful');

  t.end();
});

test('WebGL#VertexArray#enable', t => {
  const {gl} = fixture;

  const vertexArray = new VertexArray(gl);

  const MAX_ATTRIBUTES = VertexArrayObject.getMaxAttributes(gl);
  t.ok(MAX_ATTRIBUTES >= 8, 'vertexArray.getMaxAttributes() >= 8');

  for (let i = 1; i < MAX_ATTRIBUTES; i++) {
    const param = vertexArray.vertexArrayObject.getParameter(GL.VERTEX_ATTRIB_ARRAY_ENABLED, {
      location: i
    });
    t.equal(param, false, `vertex attribute ${i} should initially be disabled`);
  }

  t.end();
});

test('WebGL#VertexArray#setAttributes(unused)', t => {
  const {gl} = fixture;

  const vertexArray = new VertexArray(gl);
  vertexArray.setAttributes({
    unusedAttributeName: new Buffer(gl, {
      target: GL.ARRAY_BUFFER,
      data: BUFFER_DATA,
      accessor: {size: 3}
    })
  });
  t.ok(vertexArray instanceof VertexArray, 'VertexArray set buffers successful');

  t.end();
});

test('WebGL#VertexArray#_getAttributeIndex', t => {
  const {gl} = fixture;

  const vertexArray = new VertexArray(gl);
  vertexArray.setProps({
    configuration: {
      getAttributeLocation: () => 1
    }
  });

  const matrix = vertexArray._getAttributeIndex('matrix');
  t.equal(matrix.location, 1, 'Bad location');
  t.equal(matrix.name, 'matrix', 'Bad name');

  const matrix0 = vertexArray._getAttributeIndex('matrix__LOCATION_0');
  t.equal(matrix0.location, 1, 'Bad location');
  t.equal(matrix0.name, 'matrix', 'Bad name');

  const matrix1 = vertexArray._getAttributeIndex('matrix__LOCATION_1');
  t.equal(matrix1.location, 2, 'Bad location');
  t.equal(matrix1.name, 'matrix', 'Bad name');

  t.end();
});
