import Room from "./04_Room";

export default function Chamber({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-yellow-400 w-[90%]">
      <h1>Chamber</h1>

      <Room question={question} handleAnswer={handleAnswer} answer={answer} vehicle={vehicle} gamePhase={gamePhase} handleSecretRoomAction={handleSecretRoomAction} />
    </div>
  );
}
