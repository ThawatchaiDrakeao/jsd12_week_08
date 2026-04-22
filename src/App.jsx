import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Castle from "./components/01_Castle";

// The one pokemon already waiting outside before any rescue attempt
const INITIAL_POKEMON = {
  name: "pikachu",
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

// Game phases (in order):
// "idle" → (answer contains "help") → helpReceived flag set
// → click "Call Reinforcements" → "fetching"
// → fetch resolves → "reinforcements_ready"
// → click "Build Escape Pod" → "building" (modal open, progress 0→100%)
// → progress hits 100% → "pod_built" (modal closes)
// → SecretRoom: "Call the Pod!" → "pod_in_room"
// → SecretRoom: "Enter the Pod!" → "in_pod"
// → SecretRoom: "Transport Outside!" → "rescued" (confetti!)

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [helpReceived, setHelpReceived] = useState(false);
  const [rescuePokemon, setRescuePokemon] = useState([]);
  const [gamePhase, setGamePhase] = useState("idle");
  const [podProgress, setPodProgress] = useState(0);
  const [showBuildModal, setShowBuildModal] = useState(false);

  // useEffect 1: Watch the answer — if it contains "help", unlock the rescue
  useEffect(() => {
    if (!helpReceived && /help/i.test(answer)) {
      setHelpReceived(true);
    }
  }, [answer, helpReceived]);

  // useEffect 2: Drive the progress bar using chained setTimeouts
  // Runs every time podProgress changes while in "building" phase
  useEffect(() => {
    if (gamePhase !== "building") return;

    const timer = setTimeout(() => {
      if (podProgress < 100) {
        setPodProgress((p) => Math.min(p + 4, 100));
      } else {
        setShowBuildModal(false);
        setGamePhase("pod_built");
      }
    }, 80);

    return () => clearTimeout(timer); // cleanup: cancel if re-render fires before timeout
  }, [podProgress, gamePhase]);

  // useEffect 3: Trigger confetti when the rescue is complete
  useEffect(() => {
    if (gamePhase !== "rescued") return;
    confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 } });
    setTimeout(
      () => confetti({ particleCount: 150, spread: 120, angle: 60, origin: { y: 0.6 } }),
      300
    );
    setTimeout(
      () => confetti({ particleCount: 150, spread: 120, angle: 120, origin: { y: 0.6 } }),
      600
    );
  }, [gamePhase]);

  // All pokemon currently outside (grows after reinforcements arrive)
  const allPokemon = [INITIAL_POKEMON, ...rescuePokemon];

  const vehicle = {
    name: "Escape Pod",
    pokemon: allPokemon,
    isBuilt: ["pod_built", "pod_in_room", "in_pod", "rescued"].includes(gamePhase),
  };

  const handleQuestion = (e) => setQuestion(e.target.value);
  const handleAnswer = (e) => setAnswer(e.target.value);

  // Fetch reinforcements when the button is clicked (async event handler — no useEffect needed)
  const handleCallReinforcements = async () => {
    setGamePhase("fetching");
    const names = ["bulbasaur", "charmander", "squirtle"];
    const results = await Promise.all(
      names.map(async (name) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return res.json();
      })
    );
    setRescuePokemon(
      results.map((p) => ({ name: p.name, sprite: p.sprites.front_default }))
    );
    setGamePhase("reinforcements_ready");
  };

  const handleBuildPod = () => {
    setPodProgress(0);
    setShowBuildModal(true);
    setGamePhase("building");
  };

  // Single handler for all 3 SecretRoom button presses
  const handleSecretRoomAction = () => {
    if (gamePhase === "pod_built") setGamePhase("pod_in_room");
    else if (gamePhase === "pod_in_room") setGamePhase("in_pod");
    else if (gamePhase === "in_pod") setGamePhase("rescued");
  };

  const isRescued = gamePhase === "rescued";

  return (
    <div className="pb-80 py-10 gap-y-4 flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl font-bold text-yellow-300">Outside the Castle</h2>

      {/* Pokemon currently outside */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm text-gray-400">
          {vehicle.isBuilt ? `All aboard the ${vehicle.name}!` : "Pokemon outside:"}
        </p>
        <div
          className={`flex gap-3 flex-wrap justify-center p-3 rounded-xl ${
            vehicle.isBuilt ? "border-2 border-yellow-400 bg-gray-700" : ""
          }`}
        >
          {allPokemon.map((p) => (
            <div key={p.name} className="flex flex-col items-center">
              <img src={p.sprite} alt={p.name} className="w-16 h-16" />
              <span className="text-xs capitalize">{p.name}</span>
            </div>
          ))}
          {/* Mewtwo joins the pod after being transported outside */}
          {isRescued && (
            <div className="flex flex-col items-center">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
                alt="mewtwo"
                className="w-16 h-16"
              />
              <span className="text-xs capitalize text-yellow-300">mewtwo ✓</span>
            </div>
          )}
        </div>
      </div>

      {/* Step 1 unlocked: Call reinforcements (visible after "help" detected) */}
      {helpReceived && gamePhase === "idle" && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-yellow-300 text-sm">Help signal received from inside!</p>
          <button
            onClick={handleCallReinforcements}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded font-bold transition-colors"
          >
            Call for Reinforcements!
          </button>
        </div>
      )}

      {/* Fetching state */}
      {gamePhase === "fetching" && (
        <p className="text-blue-300 animate-pulse">Assembling rescue team...</p>
      )}

      {/* Step 2 unlocked: Build the pod (visible after reinforcements ready) */}
      {gamePhase === "reinforcements_ready" && (
        <button
          onClick={handleBuildPod}
          className="px-4 py-2 bg-green-500 hover:bg-green-400 rounded font-bold transition-colors"
        >
          Build Escape Pod!
        </button>
      )}

      {/* Rescued! Banner */}
      {isRescued && (
        <p className="text-yellow-300 font-bold text-xl">Mewtwo has been rescued!</p>
      )}

      {/* Message exchange */}
      <p className="text-purple-300">
        Message to the Secret Room:{" "}
        <span className="text-yellow-300">{question || "Waiting..."}</span>
      </p>
      <textarea
        value={question}
        onChange={handleQuestion}
        className="bg-white text-black rounded px-2 py-1"
        placeholder="Type your message here..."
      />
      <p className="text-green-300">
        Reply from the Secret Room:{" "}
        <span className="text-yellow-300">{answer || "Waiting for a reply..."}</span>
      </p>

      <Castle
        question={question}
        answer={answer}
        handleAnswer={handleAnswer}
        vehicle={vehicle}
        gamePhase={gamePhase}
        handleSecretRoomAction={handleSecretRoomAction}
      />

      {/* Build progress modal */}
      {showBuildModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border-2 border-yellow-400 rounded-2xl p-8 flex flex-col items-center gap-4 w-80">
            <p className="text-yellow-300 font-bold text-xl">Building Escape Pod...</p>
            <div className="w-full bg-gray-600 rounded-full h-6 overflow-hidden">
              <div
                className="bg-yellow-400 h-6 rounded-full transition-all duration-75"
                style={{ width: `${podProgress}%` }}
              />
            </div>
            <p className="text-white text-2xl font-mono font-bold">{podProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
