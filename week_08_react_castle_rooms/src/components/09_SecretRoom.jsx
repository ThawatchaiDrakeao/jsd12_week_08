export default function SecretRoom({
  question,
  answer,
  handleAnswer,
  vehicle,
  gamePhase,
  handleSecretRoomAction,
}) {
  const isRescued = gamePhase === "rescued";
  const podIsHere = ["pod_in_room", "in_pod", "rescued"].includes(gamePhase);

  const secretButtonConfig = {
    pod_built: {
      label: "Call the Pod!",
      color: "bg-purple-500 hover:bg-purple-400",
    },
    pod_in_room: {
      label: "Enter the Pod!",
      color: "bg-blue-500 hover:bg-blue-400",
    },
    in_pod: {
      label: "Transport Outside!",
      color: "bg-yellow-400 hover:bg-yellow-300 text-black",
    },
  }[gamePhase];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 bg-gray-700 py-10">
      <h1>SecretRoom</h1>

      {!isRescued ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border-4 border-red-400 p-4">
          <p className="font-bold text-red-300">
            {gamePhase === "in_pod"
              ? "Entering the pod..."
              : "A prisoner is trapped here!"}
          </p>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
            alt="Mewtwo - captured"
            className={`h-28 w-28 transition-all duration-500 ${
              gamePhase === "in_pod" ? "scale-75 opacity-30" : "grayscale"
            }`}
          />
          <p className="text-sm capitalize text-gray-400">Mewtwo</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <p className="text-lg font-bold text-green-300">
            The prisoner has escaped!
          </p>
          <p className="text-sm text-gray-400">The Secret Room is empty.</p>
        </div>
      )}

      {gamePhase === "pod_built" && (
        <p className="animate-pulse text-sm text-purple-300">
          You sense something waiting just outside...
        </p>
      )}

      {podIsHere && !isRescued && (
        <div className="flex w-[80%] flex-col items-center gap-3 rounded-xl border-2 border-yellow-400 bg-gray-600 p-4">
          <p className="font-semibold text-yellow-300">
            The {vehicle.name} is here!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {vehicle.pokemon.map((pokemon) => (
              <div key={pokemon.name} className="flex flex-col items-center">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="h-12 w-12"
                />
                <span className="text-xs capitalize text-white">
                  {pokemon.name}
                </span>
              </div>
            ))}
            {gamePhase === "in_pod" && (
              <div className="flex flex-col items-center">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
                  alt="mewtwo"
                  className="h-12 w-12"
                />
                <span className="text-xs capitalize text-yellow-300">
                  mewtwo
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {secretButtonConfig && (
        <button
          onClick={handleSecretRoomAction}
          className={`rounded px-5 py-2 font-bold transition-colors ${secretButtonConfig.color}`}
        >
          {secretButtonConfig.label}
        </button>
      )}

      <p className="text-purple-300">
        Message from outside:{" "}
        <span className="text-yellow-300">
          {question || "Waiting for a message..."}
        </span>
      </p>
      <textarea
        className="rounded bg-white px-2 py-1 text-black"
        value={answer}
        onChange={handleAnswer}
        placeholder="Type your reply here..."
      />
      <p className="text-green-300">
        Your reply: <span className="text-yellow-300">{answer || "..."}</span>
      </p>
    </div>
  );
}
