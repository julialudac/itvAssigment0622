const playlistFileExtension = 'm3u8';


// ex pathToLocalSegment: '/videos/output0.ts'
const extractSegmentNumber = (pathToLocalSegment) => {
  const numberOfCharactersBeforeNum = '/videos/output'.length;
  const indexOfDot = pathToLocalSegment.indexOf('.');
  return pathToLocalSegment.substring(numberOfCharactersBeforeNum, indexOfDot)
}

class VideoFile {
  constructor(remotePath, type) { 
    this.remotePath = remotePath;
    this.type = type;
  }
}

const getFilepathAsRemote = (remoteUrl, localUrl) => {
  let localUrlSplits = localUrl.split('.');
  let fileExtension = localUrlSplits[localUrlSplits.length - 1];
  if (fileExtension == playlistFileExtension) {
    return new VideoFile(remoteUrl, 'MANIFEST');
  }
  return new VideoFile(remoteUrl.substring(0, remoteUrl.length - (playlistFileExtension.length + 1)) + '/' + extractSegmentNumber(localUrl) + '.ts', 'SEGMENT');
}

exports.getFilepathAsRemote = getFilepathAsRemote;
exports.extractSegmentNumber = extractSegmentNumber;