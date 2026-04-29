import { useContext, useEffect, useState } from "react";
import confetti from "canvas-confetti";
import Castle from "./components/01_Castle";
import { MessageContext } from "./contexts/messageContext/MessageContext";
import { PlayerContext } from "./contexts/messageContext/PlayerContext";

const INITIAL_POKEMON = {
  name: "pikachu",
  sprite:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [helpReceived, setHelpReceived] = useState(false);
  const [rescuePokemon, setRescuePokemon] = useState([]);
  const [gamePhase, setGamePhase] = useState("idle");
  const [podProgress, setPodProgress] = useState(0);
  const [showBuildModal, setShowBuildModal] = useState(false);

  const { question, answer, handleQuestion, handleAnswer } =
    useContext(MessageContext);

  useEffect(() => {
    if (!helpReceived && /help/i.test(answer)) {
      setHelpReceived(true);
    }
  }, [answer, helpReceived]);

  useEffect(() => {
    if (gamePhase !== "building") return;

    const timer = setTimeout(() => {
      if (podProgress < 100) {
        setPodProgress((progress) => Math.min(progress + 4, 100));
        return;
      }

      setShowBuildModal(false);
      setGamePhase("pod_built");
    }, 80);

    return () => clearTimeout(timer);
  }, [gamePhase, podProgress]);

  useEffect(() => {
    if (gamePhase !== "rescued") return;

    confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 } });
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        angle: 60,
        origin: { y: 0.6 },
      });
    }, 300);
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 120,
        angle: 120,
        origin: { y: 0.6 },
      });
    }, 600);
  }, [gamePhase]);

  const allPokemon = [INITIAL_POKEMON, ...rescuePokemon];

  const vehicle = {
    name: "Escape Pod",
    pokemon: allPokemon,
    isBuilt: ["pod_built", "pod_in_room", "in_pod", "rescued"].includes(
      gamePhase
    ),
  };

  const handleStartGame = (event) => {
    event.preventDefault();

    if (playerName.trim()) {
      setIsGameStarted(true);
      return;
    }

    alert("กรุณากรอกชื่อก่อนเริ่มเกมนะครับ!");
  };

  const handleCallReinforcements = async () => {
    setGamePhase("fetching");

    try {
      const names = ["bulbasaur", "charmander", "squirtle"];
      const results = await Promise.all(
        names.map(async (name) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          return response.json();
        })
      );

      setRescuePokemon(
        results.map((pokemon) => ({
          name: pokemon.name,
          sprite: pokemon.sprites.front_default,
        }))
      );
      setGamePhase("reinforcements_ready");
    } catch (error) {
      console.error("Failed to fetch reinforcements", error);
      setGamePhase("idle");
    }
  };

  const handleBuildPod = () => {
    setPodProgress(0);
    setShowBuildModal(true);
    setGamePhase("building");
  };

  const handleSecretRoomAction = () => {
    if (gamePhase === "pod_built") setGamePhase("pod_in_room");
    else if (gamePhase === "pod_in_room") setGamePhase("in_pod");
    else if (gamePhase === "in_pod") setGamePhase("rescued");
  };

  const isRescued = gamePhase === "rescued";

  if (!isGameStarted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-800 p-0 text-white">
        <h2 className="mb-10 text-4xl font-bold text-blue-400">SECRET ROOM</h2>

        <form
          onSubmit={handleStartGame}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xl text-gray-300">ใส่ชื่อของคุณเพื่อเริ่มเกม:</label>
            <input
              type="text"
              placeholder="พิมพ์ชื่อตรงนี้..."
              value={playerName}
              onChange={(event) => setPlayerName(event.target.value)}
              className="w-96 rounded-xl border-none px-6 py-5 text-3xl font-bold text-white shadow-2xl outline-none transition-all focus:ring-4 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-12 py-4 text-2xl font-bold transition hover:bg-blue-500 active:scale-95"
          >
            ลุยเลยงับเหมียว !
          </button>
        </form>
      </div>
    );
  }

  return (
    <PlayerContext.Provider value={playerName}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-y-4 bg-gray-800 px-4 py-10 text-white">
        <h1 className="text-center text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
          PLAYER: {playerName}
        </h1>

        <h2 className="text-2xl font-bold text-yellow-300">Outside the Castle</h2>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-400">
            {vehicle.isBuilt
              ? `All aboard the ${vehicle.name}!`
              : "Pokemon outside:"}
          </p>
          <div
            className={`flex flex-wrap justify-center gap-3 rounded-xl p-3 ${
              vehicle.isBuilt ? "border-2 border-yellow-400 bg-gray-700" : ""
            }`}
          >
            {allPokemon.map((pokemon) => (
              <div key={pokemon.name} className="flex flex-col items-center">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="h-16 w-16"
                />
                <span className="text-xs capitalize">{pokemon.name}</span>
              </div>
            ))}
            {isRescued && (
              <div className="flex flex-col items-center">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png"
                  alt="mewtwo"
                  className="h-16 w-16"
                />
                <span className="text-xs capitalize text-yellow-300">
                  mewtwo
                </span>
              </div>
            )}
          </div>
        </div>

        {!helpReceived && gamePhase === "idle" && (
          <div className="max-w-xl rounded-lg border border-yellow-400/60 bg-yellow-400/10 px-4 py-3 text-center">
            <p className="text-sm font-semibold text-yellow-200">
              คำใบ้: ให้คนใน Secret Room พิมพ์คำว่า help ในช่องตอบกลับ
              แล้วจะสามารถเรียกเพื่อนลงมาช่วยได้
            </p>
          </div>
        )}

        {helpReceived && gamePhase === "idle" && (
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm text-yellow-300">
              Help signal received from inside!
            </p>
            <button
              onClick={handleCallReinforcements}
              className="rounded bg-blue-500 px-4 py-2 font-bold transition-colors hover:bg-blue-400"
            >
              Call for Reinforcements!
            </button>
          </div>
        )}

        {gamePhase === "fetching" && (
          <p className="animate-pulse text-blue-300">Assembling rescue team...</p>
        )}

        {gamePhase === "reinforcements_ready" && (
          <button
            onClick={handleBuildPod}
            className="rounded bg-green-500 px-4 py-2 font-bold transition-colors hover:bg-green-400"
          >
            Build Escape Pod!
          </button>
        )}

        {isRescued && (
          <p className="text-xl font-bold text-yellow-300">
            Mewtwo has been rescued!
          </p>
        )}

        <p className="text-center text-2xl font-medium text-purple-300">
          Message for Secret Room:{" "}
          <span className="text-yellow-300">
            {question || "Waiting for a message..."}
          </span>
        </p>

        <textarea
          value={question}
          onChange={handleQuestion}
          className="h-40 w-full max-w-xl rounded-2xl bg-white px-6 py-4 text-xl font-semibold text-black outline-none shadow-2xl focus:ring-4 focus:ring-purple-500"
          placeholder="พิมพ์ข้อความของคุณที่นี่..."
        />

        <p className="text-center text-2xl font-medium text-green-300">
          Reply from Secret Room:{" "}
          <span className="text-yellow-300">
            {answer || "Waiting for a reply..."}
          </span>
        </p>

        <Castle
          question={question}
          answer={answer}
          handleAnswer={handleAnswer}
          vehicle={vehicle}
          gamePhase={gamePhase}
          handleSecretRoomAction={handleSecretRoomAction}
        />

        {showBuildModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="flex w-80 flex-col items-center gap-4 rounded-2xl border-2 border-yellow-400 bg-gray-800 p-8">
              <p className="text-xl font-bold text-yellow-300">
                Building Escape Pod...
              </p>
              <div className="h-6 w-full overflow-hidden rounded-full bg-gray-600">
                <div
                  className="h-6 rounded-full bg-yellow-400 transition-all duration-75"
                  style={{ width: `${podProgress}%` }}
                />
              </div>
              <p className="font-mono text-2xl font-bold text-white">
                {podProgress}%
              </p>
            </div>
          </div>
        )}
      </div>
    </PlayerContext.Provider>
  );
}
