import { useEffect, useState } from "react";

export default function Stats() {
    const [studentAverage, setStudentAverage]: any = useState([]);
    const [questionAverage, setQuestionAverage]: any = useState([]);
    const [code, setCode] = useState("")

    function updateStats() {
        const newStudentAverage = [{student: "Daniel", score: 50}]
        setStudentAverage(newStudentAverage);

        const newQuestionAverage = [{question: "A", score: 37}]
        setQuestionAverage(newQuestionAverage);
    }

    useEffect(() => {
        updateStats()
    }, [])

    useEffect(() => {
        if (localStorage.getItem("code")) {
            setCode(localStorage.getItem("code")!)
        }
      }, [])      

    return (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div className="bg-orange-600 py-2 px-12 w-72 rounded-lg">Quiz ID: {code}</div>
        <div className="mt-6">Student Averages</div>
        {studentAverage.map((studentAvg: { student: string; score: string; }) => (
            <div>{studentAvg.student + ": " + studentAvg.score + "%"}</div>
        ))}
        <div className="mt-6">Question Averages</div>
        {questionAverage.map((questionAvg: { question: string; score: string; }) => (
            questionAvg.question + ": " + questionAvg.score + "%"
        ))}
      </main>
  )
}