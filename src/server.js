const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
var http = require('http');
var fs = require('fs');

const port = 3000
const playlistFileExtension = 'm3u8'
let resourceUrl = '';
let streamIsDownloaded = false;

let getResourceUrlFromArgument = () => {
    const PROGRAM_FIRST_POSITION_ARGUMENT = 2;
    if (process.argv.length < PROGRAM_FIRST_POSITION_ARGUMENT+1)
    {
    console.log('Please launch the server with a resource url as argument, e.g. https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8');
    process.exit(1);
    }
    resourceUrl = process.argv[PROGRAM_FIRST_POSITION_ARGUMENT];
}

let generatePlaylistAndSegmentFiles = () => {
    console.log('Generating stream files...')
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    ffmpeg(resourceUrl, {timeout: 30000}).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls'
    ]).output('videos/output.m3u8').on('end', () => {
    console.log('Files have been generated!');
    streamIsDownloaded = true;
    }).run();
}

getResourceUrlFromArgument();
generatePlaylistAndSegmentFiles();
http.createServer(function (request, response) {
    if (streamIsDownloaded)
    {
        let filePath = '.' + request.url;
        let filePathSplits = filePath.split('.');
        let file_extension = filePathSplits[filePathSplits.length-1];
        let start, end;
        if (file_extension == playlistFileExtension)
        {
            start = Date.now();
            console.log('[IN] ' + resourceUrl)
        }
        
        fs.readFile(filePath, function(error, content) {
            response.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
            if (error) {
                if(error.code == 'ENOENT'){
                    console.log('Asked path: ' + filePath);
                    fs.readFile('./404.html', function(error, content) {
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Error: '+error.code);
                }
            }
            else {
                response.end(content, 'utf-8');
                if (file_extension == playlistFileExtension)
                {
                    end = Date.now();
                    console.log(`[OUT] ${resourceUrl} (${end-start}ms)`);
                }
            }
        });
    }
}).listen(port);