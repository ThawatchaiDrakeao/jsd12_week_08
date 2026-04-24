import { useState, useContext } from "react";
// 1. ดึง Context ที่ฟงมีอยู่แล้ว
import { MessageContext } from "./contexts/messageContext/MessageContext";
import Castle from "./components/01_Castle";

// 2. ดึง Navbar และ PlayerContext ของเราเข้ามา (เช็ค Path ให้ตรงกับของฟงด้วยนะ)
import Navbar from "./components/10_Navbar";
import { PlayerContext } from "./contexts/PlayerContext";

export default function App() {
  // --- ส่วนที่ 1: ระบบจัดการชื่อผู้เล่น (ของเรา) ---
  const [playerName, setPlayerName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);

  // --- ส่วนที่ 2: ระบบจัดการข้อความ (ของฟง) ---
  const { question, handleQuestion, answer } = useContext(MessageContext);

  // ฟังก์ชันกดเข้าเกม
  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      setIsGameStarted(true);
    } else {
      alert("กรุณากรอกชื่อก่อนเริ่มเกมนะครับฟง!");
    }
  };

  // --------------------------------------------------
  // หน้าจอ 1: Login Screen (พี่ปรับใช้ Tailwind ให้เข้ากับธีมฟง)
  // --------------------------------------------------
  if (!isGameStarted) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
        <h2 className="text-2xl font-bold mb-6">
          กรอกชื่อเพื่อเข้าสู่ Secret Room
        </h2>
        <form onSubmit={handleStartGame} className="flex gap-4">
          <input
            type="text"
            placeholder="ใส่ชื่อของคุณ..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="px-4 py-2 text-black rounded outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold transition"
          >
            ลุยเลย!
          </button>
        </form>
      </div>
    );
  }

  // --------------------------------------------------
  // หน้าจอ 2: Game Screen (โค้ดเดิมของฟง + Navbar + Context)
  // --------------------------------------------------
  return (
    // 3. หุ้มด้วย Provider เพื่อส่งชื่อผู้เล่นเจาะกำแพง
    <PlayerContext.Provider value={playerName}>
      {/* 4. วาง Navbar ไว้ด้านบนสุด */}
      <Navbar playerName={playerName} />

      {/* 5. โค้ดเดิมของฟงทั้งหมด เอามาวางต่อด้านล่างได้เลย */}
      <div className="pb-80 py-10 gap-y-4 flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white">
        <p className="text-purple-300">
          Message for Secret Room:{" "}
          <span className="text-yellow-300">
            {question ? `✅ ${question}` : "⏳ Waiting for a message..."}
          </span>
        </p>

        <textarea
          value={question}
          onChange={handleQuestion}
          className="bg-white text-black rounded px-2 py-1"
          placeholder="Type your message here..."
        />

        <p className="text-green-300">
          Reply from Secret Room:{" "}
          <span className="text-yellow-300">
            {answer ? `✅ ${answer}` : "⏳ Waiting for a reply..."}
          </span>
        </p>

        <Castle />
      </div>
    </PlayerContext.Provider>
  );
}
