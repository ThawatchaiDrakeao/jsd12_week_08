import SecretRoom from "./09_SecretRoom";

export default function Nook({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-violet-500 w-[90%]">
      <h1>Nook</h1>

      <SecretRoom
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
