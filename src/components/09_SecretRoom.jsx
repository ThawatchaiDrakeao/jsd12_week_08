export default function SecretRoom({
  question,
  answer,
  handleAnswer,
  vehicle,
  gamePhase,
  handleSecretRoomAction,
}) {
  const isRescued = gamePhase === "rescued";

  // Pod is physically inside the room during these phases
  const podIsHere = ["pod_in_room", "in_pod", "rescued"].includes(gamePhase);

  // The single SecretRoom button morphs through 3 labels as phases progress
  const secretButtonConfig = {
    pod_built: { label: "Call the Pod!", color: "bg-purple-500 hover:bg-purple-400" },
    pod_in_room: { label: "Enter the Pod!", color: "bg-blue-500 hover:bg-blue-400" },
    in_pod: { label: "Transport Outside!", color: "bg-yellow-400 hover:bg-yellow-300 text-black" },
  }[gamePhase];

  return (
    <div className="flex flex-col justify-center items-center py-10 gap-y-4 bg-gray-700 w-[100%]">
      <h1>SecretRoom</h1>

      {/* The captive character */}
      {!isRescued ? (
        <div className="flex flex-col items-center gap-2 border-4 border-red-400 rounded-xl p-4">
          <p className="text-red-300 font-bold">
            {gamePhase === "in_pod" ? "Entering the pod..." : "A prisoner is trapped here!"}
          </p>
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
            alt="Mewtwo - captured"
            className={`w-28 h-28 transition-all duration-500 ${
              gamePhase === "in_pod" ? "opacity-30 scale-75" : "grayscale"
            }`}
          />
          <p className="text-gray-400 text-sm capitalize">Mewtwo</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <p className="text-green-300 font-bold text-lg">The prisoner has escaped!</p>
          <p className="text-gray-400 text-sm">The Secret Room is empty.</p>
        </div>
      )}

      {/* Pod built outside — hint to the prisoner */}
      {gamePhase === "pod_built" && (
        <p className="text-purple-300 text-sm animate-pulse">
          You sense something waiting just outside...
        </p>
      )}

      {/* The Escape Pod arrives inside the room */}
      {podIsHere && !isRescued && (
        <div className="flex flex-col items-center gap-3 border-2 border-yellow-400 rounded-xl p-4 w-[80%] bg-gray-600">
          <p className="text-yellow-300 font-semibold">
            The {vehicle.name} is here!
          </p>
          <div className="flex gap-3 flex-wrap justify-center">
            {vehicle.pokemon.map((p) => (
              <div key={p.name} className="flex flex-col items-center">
                <img src={p.sprite} alt={p.name} className="w-12 h-12" />
                <span className="text-xs capitalize text-white">{p.name}</span>
              </div>
            ))}
            {/* Mewtwo boards the pod */}
            {gamePhase === "in_pod" && (
              <div className="flex flex-col items-center">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
                  alt="mewtwo"
                  className="w-12 h-12"
                />
                <span className="text-xs capitalize text-yellow-300">mewtwo ✓</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Morphing action button — only shown during pod_built, pod_in_room, in_pod */}
      {secretButtonConfig && (
        <button
          onClick={handleSecretRoomAction}
          className={`px-5 py-2 rounded font-bold transition-colors ${secretButtonConfig.color}`}
        >
          {secretButtonConfig.label}
        </button>
      )}

      {/* Message exchange */}
      <p className="text-purple-300">
        Message from outside:{" "}
        <span className="text-yellow-300">
          {question || "Waiting for a message..."}
        </span>
      </p>
      <textarea
        className="bg-white text-black rounded px-2 py-1"
        value={answer}
        onChange={handleAnswer}
        placeholder="Type your reply here..."
      />
      <p className="text-green-300">
        Your reply:{" "}
        <span className="text-yellow-300">{answer || "..."}</span>
      </p>
    </div>
  );
}
