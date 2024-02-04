import { fetchNextWord } from "@/lib/backend/use";
import { useEffect, useState } from "react";
import imageCompression from 'browser-image-compression'
import { backend_ip } from "@/lib/constants";

export default function Quiz() {
    const [word, setWord] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchFirstWord = async () => {
            const firstWord = await fetchNextWord(localStorage.getItem("quiz_id")!, localStorage.getItem("name")!)

            setWord(firstWord.nextWord)
        }

        fetchFirstWord()
    }, [])

    useEffect(() => {
		const form = document.querySelector('form')!
		form.addEventListener('submit', handleSubmit);

		/** @param {Event} event */
		async function handleSubmit(event: Event) {
			event.preventDefault();

			const url = new URL(form.action);
			const formData = new FormData(form);

            var photo: HTMLImageElement = document.getElementById('photo') as HTMLImageElement;

            const response = await fetch(photo.src);
            // here image is url/location of image
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', {type: blob.type});

			const options = {
				maxSizeMB: 1,
				maxWidthOrHeight: 1920,
				useWebWorker: true,
			}
			try {
				setErrorMessage("Compressing images! (1/2)")

				const compressed_file = await imageCompression(file, options);

				// compressed files lose file type info for some reason; recover file type info below.

				const named_compressed_file = new File(
						[await compressed_file.arrayBuffer()], 
						file.name,
						{type: file.type, lastModified: file.lastModified}
					)

				formData.set("image", named_compressed_file)
                formData.set("quiz_id", localStorage.getItem("quiz_id")!)
                formData.set("name", localStorage.getItem("name")!)
                formData.set("word", word)
			} catch (error) {
				console.log(error);
			}
		
			/** @type {Parameters<fetch>[1]} */
			const fetchOptions = {
				method: form.method,
				body: formData,
				// headers: {
				// 	'authorization': localStorage.getItem("token")
				// }
			};

			setErrorMessage("Uploading files! Please wait. (2/2)")
		
			const myJson = await (await fetch(url, fetchOptions)).json();
			
			if (myJson.error) {
				setErrorMessage(myJson.error)
			} else {
                setErrorMessage("")
                const correct_sign = document.getElementById("correct_sign")!
                const wrong_sign = document.getElementById("wrong_sign")!
                const next_button = document.getElementById("next_button")!
                const submit = document.getElementById("submit")! as HTMLButtonElement

                if (myJson.correct) {
                    correct_sign.hidden = false;
                    wrong_sign.hidden = true;
                    next_button.hidden = false;
                } else {
                    wrong_sign.hidden = false;
                    correct_sign.hidden = true;
                    next_button.hidden = false;
                }

                submit.disabled = true;
			}
		}
	}, [word])

    useEffect(() => {
        var width = 320; // We will scale the photo width to this
        var height = 0; // This will be computed based on the input stream

        var streaming = false;

        var video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement;
        var canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
        var photo: HTMLImageElement = document.getElementById('photo') as HTMLImageElement;
        // var startbutton: HTMLButtonElement = document.getElementById('startbutton') as HTMLButtonElement;

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
                    takevideo();
                    streaming = true;

                }
            }, false);

            // startbutton!.addEventListener('click', function(ev) {
            //     takepicture();
            //     ev.preventDefault();
            // }, false);

            // clearphoto();
        }

        function delay(ms: number) {
            return new Promise( resolve => setTimeout(resolve, ms) );
        }


        function clearphoto() {
            var context = canvas.getContext('2d')!;
            context.fillStyle = "#AAA";
            context.fillRect(0, 0, canvas.width, canvas.height);

            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
        }

        async function takevideo() {
            var context = canvas.getContext('2d')!;
            for (let i = 0; i < 8; i++) {
                if (width && height) {
                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(video, 0, 0, width, height);
                    var data = canvas.toDataURL('image'+i+'/png');
                    photo.setAttribute('src', data);
                } else {
                    clearphoto();
                }
                await delay(10);
        }
        }

        startup()
    }, [])

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
            <div className="flex justify-center mt-10"><button id="correct_sign" className="bg-green-600 py-2 px-6 font-bold rounded-lg" disabled hidden>Correct!</button></div>
            <div className="flex justify-center mt-10"><button id="wrong_sign" className="bg-red-600 py-2 px-6 font-bold rounded-lg" disabled hidden>Wrong!</button></div>
            <div className="flex justify-center mt-4"><button id="next_button" className="bg-orange-600 py-2 px-6 font-bold rounded-lg" onClick={fetchNextQuestion} hidden>Next</button></div>
            <p className="red">{errorMessage}</p>
        </div>
      </main>
  );
}
