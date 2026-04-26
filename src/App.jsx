import { useState, useContext } from "react";
// 1. ดึง Context ที่มีอยู่แล้ว
import { MessageContext } from "./contexts/messageContext/MessageContext";
import Castle from "./components/01_Castle";

// 🔴 ลบ Import Navbar ออกไปแล้วตามที่ฟงต้องการ
import { PlayerContext } from "./contexts/messageContext/PlayerContext";

export default function App() {
  const [playerName, setPlayerName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { question, handleQuestion, answer } = useContext(MessageContext);

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      setIsGameStarted(true);
    } else {
      alert("กรุณากรอกชื่อก่อนเริ่มเกมนะครับฟง!");
    }
  };

  // --------------------------------------------------
  // หน้าจอ 1: Login Screen (ปรับปรุงช่องใส่ชื่อให้ใหญ่และชัด)
  // --------------------------------------------------
  if (!isGameStarted) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-800 text-white m-0 p-0">
        {/* ขยายหัวข้อให้เด่นขึ้น */}
        <h2 className="text-4xl font-bold mb-10 text-blue-400">SECRET ROOM</h2>

        <form
          onSubmit={handleStartGame}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xl text-gray-300">
              ใส่ชื่อของคุณเพื่อเริ่มเกม:
            </label>
            <input
              type="text"
              placeholder="พิมพ์ชื่อตรงนี้..."
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              /* ✅ แก้ไขตรงนี้: 
                - w-96: กว้างขึ้นมาก 
                - py-5: สูงขึ้น 
                - text-3xl: ตัวหนังสือใหญ่สะใจ 
                - font-bold: ตัวหนาเห็นชัด
                - border-4: เพิ่มขอบหนาเวลาพิมพ์
              */
              className="w-96 px-6 py-5 text-3xl text-white font-bold rounded-xl shadow-2xl outline-none focus:ring-4 focus:ring-blue-500 transition-all border-none"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 px-12 py-4 rounded-xl text-2xl font-bold transition shadow-lg active:scale-95"
          >
            ลุยเลยงับเหมียว !
          </button>
        </form>
      </div>
    );
  }

  // --------------------------------------------------
  // หน้าจอ 2: Game Screen (เอา Navbar ออก 100%)
  // --------------------------------------------------
  return (
    <PlayerContext.Provider value={playerName}>
      <div className="min-h-screen bg-gray-800 text-white flex flex-col m-0 p-0">
        {/* ✅ ลบ Navbar ออกไปเรียบร้อยแล้ว พื้นที่ตรงนี้จะว่างและสะอาดตาขึ้น */}

        <div className="flex-1 flex flex-col justify-center items-center py-10 gap-y-6">
          {/* พี่เพิ่มชื่อผู้เล่นโชว์ไว้ตรงนี้แทน เผื่อนายอยากเห็นชื่อตัวเองตอนเล่น */}
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            PLAYER: {playerName}
          </h1>

          <p className="text-2xl text-purple-300 font-medium">
            Message for Secret Room:{" "}
            <span className="text-yellow-300">
              {question ? `✅ ${question}` : "⏳ Waiting for a message..."}
            </span>
          </p>

          <textarea
            value={question}
            onChange={handleQuestion}
            className="w-full max-w-xl h-40 bg-white text-black rounded-2xl px-6 py-4 text-xl font-semibold outline-none focus:ring-4 focus:ring-purple-500 shadow-2xl"
            placeholder="พิมพ์ข้อความของคุณที่นี่..."
          />

          <p className="text-2xl text-green-300 font-medium">
            Reply from Secret Room:{" "}
            <span className="text-yellow-300">
              {answer ? `✅ ${answer}` : "⏳ Waiting for a reply..."}
            </span>
          </p>

          <Castle />
        </div>

        <div className="pb-20"></div>
      </div>
    </PlayerContext.Provider>
  );
}
