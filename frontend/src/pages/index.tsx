import { fetchCreateScore } from "@/lib/backend/use";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState('')

  const handleTakeQuiz = async () => {
    const quiz_id_element = document.getElementById("quiz_id") as HTMLInputElement
    const name_element = document.getElementById("name") as HTMLInputElement
    const myJson = await fetchCreateScore(quiz_id_element.value, name_element.value)
		
		if (myJson.error) {
			setMessage(myJson.error)
		} else {
			setMessage('')
      window.location.href = "/student/quiz"
		}
  }

  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <a href="/teacher/setup">
        <div className={`text-xl font-bold bg-orange-600 text-white border-orange-950 border-0 px-6 py-4 rounded-lg w-60 mb-10`}>
          Create Quiz
        </div>
      </a>
      <div className="mb-6">OR</div>
      <input type="text" className="mb-0 text-black w-60 h-8 px-2 mt-2" id="quiz_id" placeholder="Quiz ID"/>
      <input type="text" className="mb-4 text-black w-60 h-8 px-2 mt-2" id="name" placeholder="Your Name"/>
      <button onClick={handleTakeQuiz} className={`text-xl font-bold bg-orange-600 text-white border-orange-950 border-0 px-6 py-4 rounded-lg w-60`}>
        Take Quiz
      </button>
      <div className={`text-red-600 font-semibold mt-3 text-center`}>{message}</div>
    </main>
  );
}
