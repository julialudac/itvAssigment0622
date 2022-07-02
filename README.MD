# Use

Launch the server by going into src and then enter
`node server.js <url to resource>`

Example: `node server.js https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8`


The server will first download the files and then it can send the response to the client. With a client that supports HLS like VLC Player, target the server at 
`http://127.0.0.1:3000/videos/output.m3u8`
The effect is that VLC will first target the playlist/manifest 'output.m3u8', then it will automatically ask for its segments readable from the file.


# TODO
* Exercise 2 track switch
* Exercise 3
* Do it in C++
* reformat file