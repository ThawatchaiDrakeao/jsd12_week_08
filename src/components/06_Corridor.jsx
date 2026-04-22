import Gallery from "./07_Gallery";

export default function Corridor({ question, handleAnswer, answer, vehicle, gamePhase, handleSecretRoomAction }) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-blue-500 w-[90%]">
      <h1>Corridor</h1>

      <Gallery
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
