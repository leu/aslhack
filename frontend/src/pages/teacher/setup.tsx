import { fetchCreateQuiz } from "@/lib/backend/create";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function QuizSetup() {
    const [questions, setQuestions] = useState(["Boat", "Hello"]);
    const [message, setMessage] = useState('')

    function updateQuestions(newString: string, index: number) {
        const newQuestions = [...questions]
        newQuestions[index] = newString
        setQuestions(newQuestions)
    }

    function addQuestion() {
        const newQuestions = [...questions]
        newQuestions.push("")
        setQuestions(newQuestions)
    }

    const createQuiz = async () => {
        const myJson = await fetchCreateQuiz(questions)
		
		if (myJson.error) {
			setMessage(myJson.error)
		} else {
			setMessage('')
			localStorage.setItem("code", myJson.code)
            window.location.href = "/teacher/stats"
		}
    }

    return (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div className="bg-orange-600 p-6 w-60 rounded-lg">
            {questions.map((question, i) => (
            <div className="my-4">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"></InputLabel>
                    <Select
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        value={question}
                        // label=""
                        onChange={e => {if (e != null) updateQuestions(e.target.value, i)}}
                        className="bg-white"
                    >
                        <MenuItem value="Hello">Hello</MenuItem>
                        <MenuItem value="Boat">Boat</MenuItem>
                        <MenuItem value="Menu">Menu</MenuItem>
                    </Select>
                </FormControl>
            </div>))
            }
            <div className="flex justify-items">
                <button onClick={addQuestion} className="mx-auto w-32 py-2 px-2 bg-white text-black rounded-lg">Add</button>
            </div>
        </div>
        {questions}

        <button onClick={createQuiz} className="mx-auto my-4 w-32 py-2 px-2 bg-white text-black rounded-lg">Create</button>
        <div className={`text-red-600 font-semibold mt-3 text-center`}>{message}</div>
      </main>
  );
}