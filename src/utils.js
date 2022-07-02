const playlistFileExtension = 'm3u8';


// ex pathToLocalSegment: '/videos/output0.ts'
const extractSegmentNumber = (pathToLocalSegment) => {
  const numberOfCharactersBeforeNum = '/videos/output'.length;
  const indexOfDot = pathToLocalSegment.indexOf('.');
  return pathToLocalSegment.substring(numberOfCharactersBeforeNum, indexOfDot)
}

const getFilepathAsRemote = (remoteUrl, localUrl) => {
  let localUrlSplits = localUrl.split('.');
  let fileExtension = localUrlSplits[localUrlSplits.length - 1];
  if (fileExtension == playlistFileExtension) {
    return remoteUrl;
  }
  return remoteUrl.substring(0, remoteUrl.length - (playlistFileExtension.length + 1)) + '/' + extractSegmentNumber(localUrl) + '.ts';
}

exports.getFilepathAsRemote = getFilepathAsRemote;
exports.extractSegmentNumber = extractSegmentNumber;