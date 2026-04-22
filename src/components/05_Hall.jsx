import Corridor from "./06_Corridor";

export default function Hall({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-emerald-500 w-[90%]">
      <h1>Hall</h1>

      <Corridor
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
