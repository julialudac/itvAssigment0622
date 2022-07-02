const assert = require('assert');

const utils = require('../utils');


describe('Rebuild URL from local segment or manifest file tests', () => {
  it('Given local segment file /videos/output0.ts, number to extract is 0', () => {
    assert.equal('0', utils.extractSegmentNumber('/videos/output0.ts'));
  });
  it('Given local segment file /videos/output117.ts, number to extract is 117', () => {
    assert.equal('117', utils.extractSegmentNumber('/videos/output117.ts'));
  });

  it('Given remote url http://test.io/manifest.m3u8 and local url /videos/output.m3u8, output http://test.io/manifest.m3u8', () => {
    assert.equal('http://test.io/manifest.m3u8', utils.getFilepathAsRemote('http://test.io/manifest.m3u8', '/videos/output.m3u8'));
  });

  it('Given remote url http://test.io/manifest.m3u8 and local url /videos/output0.ts, output http://test.io/manifest/0.ts', () => {
    assert.equal('http://test.io/manifest/0.ts', utils.getFilepathAsRemote('http://test.io/manifest.m3u8', '/videos/output0.ts'));
  });
});