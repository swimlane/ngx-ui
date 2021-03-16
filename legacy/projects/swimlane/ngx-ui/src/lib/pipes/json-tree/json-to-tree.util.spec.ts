import { jsonToTree } from './json-to-tree.util';

describe('jsonToTree', () => {
  it('should get object tree node', () => {
    expect(jsonToTree({ test: 'test' }, 'object').model.type).toEqual('object');
  });

  it('should get array tree node', () => {
    expect(jsonToTree(['test']).model.type).toEqual('array');
  });

  it('should get default tree node', () => {
    expect(jsonToTree('test').model.type).toEqual('string');
  });
});
