import Hall from "./05_Hall";

export default function Room({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-green-500 w-[90%]">
      <h1>Room</h1>

      <Hall question={question} handleAnswer={handleAnswer} answer={answer} vehicle={vehicle} gamePhase={gamePhase} handleSecretRoomAction={handleSecretRoomAction} />
    </div>
  );
}
