const assert = require('assert');

const utils = require('../utils');


describe('Rebuild URL from local segment or manifest file tests', () => {
  it('Given local segment file /videos/output0.ts, number to extract is 0', () => {
    assert.equal('0', utils.extractSegmentNumber('/videos/output0.ts'));
  });
  it('Given local segment file /videos/output117.ts, number to extract is 117', () => {
    assert.equal('117', utils.extractSegmentNumber('/videos/output117.ts'));
  });

  it('Given remote url http://test.io/manifest.m3u8 and local url /videos/output.m3u8, remote url is http://test.io/manifest.m3u8 and file type MANIFEST', () => {
    const res = utils.getFilepathAsRemote('http://test.io/manifest.m3u8', '/videos/output.m3u8');
    assert.equal('http://test.io/manifest.m3u8', res.remotePath);
    assert.equal('MANIFEST', res.type);
  });

  it('Given remote url http://test.io/manifest.m3u8 and local url /videos/output0.ts, remote url is http://test.io/manifest/0.ts and file type SEGMENT', () => {
    const res = utils.getFilepathAsRemote('http://test.io/manifest.m3u8', '/videos/output0.ts');
    assert.equal('http://test.io/manifest/0.ts', res.remotePath);
    assert.equal('SEGMENT', res.type);
  });
});