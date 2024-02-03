import { useEffect } from "react";

export default function Quiz() {
    const word: string = "Car";

    useEffect(() => {
        var width = 320; // We will scale the photo width to this
        var height = 0; // This will be computed based on the input stream

        var streaming = false;

        var video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
        var canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        var photo: HTMLImageElement = document.getElementById('photo') as HTMLImageElement;
        var startbutton: HTMLButtonElement = document.getElementById('startbutton') as HTMLButtonElement;

        function startup() {
            navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                })
                .then(function(stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function(err) {
                    console.log("An error occurred: " + err);
                });

            video.addEventListener('canplay', function() {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute('width', width.toString());
                    video.setAttribute('height', height.toString());
                    canvas.setAttribute('width', width.toString());
                    canvas.setAttribute('height', height.toString());
                    streaming = true;
                }
            }, false);

            startbutton!.addEventListener('click', function(ev) {
                takepicture();
                ev.preventDefault();
            }, false);

            clearphoto();
        }


        function clearphoto() {
            var context = canvas.getContext('2d')!;
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }

        function takepicture() {
            var context = canvas.getContext('2d')!;
            if (width && height) {
                canvas.width = width;
                canvas.height = height;
                context.drawImage(video, 0, 0, width, height);

                var data = canvas.toDataURL('image/png');
                photo.setAttribute('src', data);
            } else {
                clearphoto();
            }
        }

        // window.addEventListener('load', startup, false);
        startup()
    }, [])
      

    return (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div>What's the sign for "{word}"? Show it into your camera.</div>
        <div className="contentarea">
            <h1>
                Using Javascript to capture Photo
            </h1>
            <div className="camera">
                <video id="video">Video stream not available.</video>
            </div>
            <div><button id="startbutton">Take photo</button></div>
            
            <canvas id="canvas"></canvas>
            <div className="output">
                <img id="photo" alt="The screen capture will appear in this box." /> 
            </div>
        </div>
      </main>
  );
}
