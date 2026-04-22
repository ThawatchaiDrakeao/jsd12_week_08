import Tower from "./02_Tower";

export default function Castle(banana) {
  console.log(banana);
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-red-500 w-full">
      <h1>Castle</h1>
      <Tower
        question={banana.question}
        handleAnswer={banana.handleAnswer}
        answer={banana.answer}
        vehicle={banana.vehicle}
        gamePhase={banana.gamePhase}
        handleSecretRoomAction={banana.handleSecretRoomAction}
      />
    </div>
  );
}
