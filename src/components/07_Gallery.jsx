import Nook from "./08_Nook";

export default function Gallery({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-indigo-500 w-[90%]">
      <h1>Gallery</h1>

      <Nook question={question} handleAnswer={handleAnswer} answer={answer} vehicle={vehicle} gamePhase={gamePhase} handleSecretRoomAction={handleSecretRoomAction} />
    </div>
  );
}
