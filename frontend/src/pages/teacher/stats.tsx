import { fetchStats } from "@/lib/backend/create";
import { useEffect, useState } from "react";

export default function Stats() {
    const [studentAverage, setStudentAverage]: any = useState({});
    const [questionAverage, setQuestionAverage]: any = useState({});
    const [code, setCode] = useState("")

    const updateStats = async () => {
        const stats = await fetchStats()
        setStudentAverage(stats.studentAverages);
        setQuestionAverage(stats.questionAverage);
    }

    useEffect(() => {
        updateStats()
    }, [])

    useEffect(() => {
        if (localStorage.getItem("code")) {
            setCode(localStorage.getItem("code")!)
        }

        window.addEventListener('load', function () {
            // Your document is loaded.
            var fetchInterval = 5000; // 5 seconds.
            
            // Invoke the request every 5 seconds.
            setInterval(updateStats, fetchInterval);
        });
      }, [])  

    return (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div className="bg-orange-600 py-2 px-12 w-72 rounded-lg">Quiz ID: {code}</div>
        {/* <div className="mt-6">Student Averages</div> */}
        {/* {Object.keys(studentAverage).forEach(function(key, i) {return <div>{key + ": " + studentAverage[key] + "%"}</div>})} */}
        
        {/* .map((studentAvg: { student: string; score: string; }) => (
            <div>{studentAvg.student + ": " + studentAvg.score + "%"}</div>
        ))} */}

        {/* <div className="mt-6">Question Averages</div> */}
        {/* {Object.keys(questionAverage).forEach(function(key, i) {return <div>{key + ": " + questionAverage[key] + "%"}</div>})} */}


        {/* {questionAverage.map((questionAvg: { question: string; score: string; }) => (
            questionAvg.question + ": " + questionAvg.score + "%"
        ))} */}
      </main>
  )
}