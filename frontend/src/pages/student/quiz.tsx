import { fetchNextWord } from "@/lib/backend/use";
import { useEffect, useState } from "react";

export default function Quiz() {
    const [word, setWord] = useState("")

    useEffect(() => {
        const fetchFirstWord = async () => {
            const firstWord = await fetchNextWord(localStorage.getItem("quiz_id")!, localStorage.getItem("name")!)

            setWord(firstWord.nextWord)
        }

        fetchFirstWord()
    }, [])

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
                    video.play().catch(() => {});
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

        startup()
    }, [])

    function fetchAnswer() {
        const correct = false

        if (correct) {
            const correct_sign = document.getElementById("correct_sign")!
            correct_sign.hidden = false;
            const next_button = document.getElementById("next_button")!
            next_button.hidden = false;

            const take_photo = document.getElementById("startbutton")! as HTMLButtonElement
            take_photo.disabled = true;
            const submit = document.getElementById("submit")! as HTMLButtonElement
            submit.disabled = true;
        } else {
            const wrong_sign = document.getElementById("wrong_sign")!
            wrong_sign.hidden = false;
            const next_button = document.getElementById("next_button")!
            next_button.hidden = false;

            const take_photo = document.getElementById("startbutton")! as HTMLButtonElement
            take_photo.disabled = true;
            const submit = document.getElementById("submit")! as HTMLButtonElement
            submit.disabled = true;
        }
    }

    function fetchNextQuestion() {
        const fetchFirstWord = async () => {
            const nextWord = await fetchNextWord(localStorage.getItem("quiz_id")!, localStorage.getItem("name")!)

            setWord(nextWord.nextWord)
        }

        fetchFirstWord()
        
        function clearphoto() {
            var canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
            var photo: HTMLImageElement = document.getElementById('photo') as HTMLImageElement;

            var context = canvas.getContext('2d')!;
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }
        clearphoto()
        const correct_sign = document.getElementById("correct_sign")!
        correct_sign.hidden = true;
        const wrong_sign = document.getElementById("wrong_sign")!
        wrong_sign.hidden = true;
        const next_button = document.getElementById("next_button")!
        next_button.hidden = true;

        const take_photo = document.getElementById("startbutton")! as HTMLButtonElement
        take_photo.disabled = false;
        const submit = document.getElementById("submit")! as HTMLButtonElement
        submit.disabled = false;
    }
      

    return (
      <main className={`flex min-h-screen flex-col items-center p-20`}>
        <div className="mb-4 w-screen px-4 sm:text-center">What's the sign for "{word}"? Show it into your camera.</div>
        <div className="contentarea">
            <div className="camera inline mb-2">
                <video id="video">Video stream not available.</video>
            </div>

            <canvas id="canvas"></canvas>
            <div className="output inline mb-2">
                <img id="photo" alt="The screen capture will appear in this box." /> 
            </div>

            <div className="flex justify-center mt-4"><button id="startbutton" className="bg-orange-600 py-2 px-6 font-bold rounded-lg">Take photo</button></div>
            <div className="flex justify-center mt-4"><button id="submit" className="bg-orange-600 py-2 px-6 font-bold rounded-lg" onClick={fetchAnswer}>Submit Answer</button></div>
            <div className="flex justify-center mt-10"><button id="correct_sign" className="bg-green-600 py-2 px-6 font-bold rounded-lg" disabled hidden>Correct!</button></div>
            <div className="flex justify-center mt-10"><button id="wrong_sign" className="bg-red-600 py-2 px-6 font-bold rounded-lg" disabled hidden>Wrong!</button></div>
            <div className="flex justify-center mt-4"><button id="next_button" className="bg-orange-600 py-2 px-6 font-bold rounded-lg" onClick={fetchNextQuestion} hidden>Next</button></div>
        </div>
      </main>
  );
}
