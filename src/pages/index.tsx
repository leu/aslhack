import { TextField } from "@mui/material";

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <a href="/teacher/setup">
        <div className={`text-xl font-bold bg-orange-600 text-white border-orange-950 border-0 px-6 py-4 rounded-lg w-60 mb-10`}>
          Create Quiz
        </div>
      </a>
      <div className="mb-6">OR</div>
      <input type="text" className="mb-4 text-black w-60 h-8 px-2 mt-2" placeholder="Classroom ID"/>
      <a href="/student/quiz">
        <div className={`text-xl font-bold bg-orange-600 text-white border-orange-950 border-0 px-6 py-4 rounded-lg w-60`}>
          Take Quiz
        </div>
      </a>
    </main>
  );
}
