import Chamber from "./03_Chamber";

export default function Tower({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-orange-500 w-[90%]">
      <h1>Tower</h1>
      <Chamber
        question={question}
        handleAnswer={handleAnswer}
        answer={answer}
        vehicle={vehicle}
        gamePhase={gamePhase}
        handleSecretRoomAction={handleSecretRoomAction}
      />
    </div>
  );
}
