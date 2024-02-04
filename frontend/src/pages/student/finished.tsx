export default function Finished() {
    const score_percent = "54%"
    return (
      <main className={`flex min-h-screen flex-col items-center p-24`}>
        <div className="text-xl w-screen text-center font-bold">
            You've finished the quiz! {/*You got {score_percent}!*/}
        </div>
      </main>
  )
}