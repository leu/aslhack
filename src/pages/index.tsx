export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-24`}>
      <a href="/teacher/setup">
        <div className={`text-xl font-bold bg-orange-600 text-black border-orange-950 border-0 px-6 py-4 rounded-lg w-60 mb-10`}>
          Create Classroom
        </div>
      </a>
      <a href="#">
        <div className={`text-xl font-bold bg-orange-600 text-black border-orange-950 border-0 px-6 py-4 rounded-lg w-60`}>
          Join Classroom
        </div>
      </a>
    </main>
  );
}
