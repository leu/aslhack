import { useEffect, useState } from "react";

export default function Stats() {
    const [studentAverage, setStudentAverage]: any = useState([]);
    const [questionAverage, setQuestionAverage]: any = useState([]);

    function updateStats() {
        const newStudentAverage = [{student: "Daniel", score: 50}]
        setStudentAverage(newStudentAverage);

        const newQuestionAverage = [{question: "A", score: 37}]
        setQuestionAverage(newQuestionAverage);
    }

    useEffect(() => {
        updateStats()
    }, [])

    return (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div className="bg-orange-600 py-2 px-12 w-60 rounded-lg">Classroom ID: {localStorage.getItem("code")}</div>
        <div className="mt-6">Student Averages</div>
        {studentAverage.map((studentAvg: { student: string; score: string; }) => (
            <div>{studentAvg.student + ": " + studentAvg.score + "%"}</div>
        ))}
        <div className="mt-6">Question Averages</div>
        {questionAverage.map((questionAvg: { question: string; score: string; }) => (
            questionAvg.question + ": " + questionAvg.score + "%"
        ))}
      </main>
  );
}
