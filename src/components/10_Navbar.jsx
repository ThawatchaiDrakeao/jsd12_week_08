import React, { useState } from "react";
// 1. Import Navbar ที่เราเพิ่งแยกไฟล์ออกมา


function App() {
  const [playerName, setPlayerName] = useState("");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      setIsGameStarted(true);
    } else {
      alert("กรุณากรอกชื่อก่อนเริ่มเกมนะครับฟง!");
    }
  };

  if (!isGameStarted) {
    return (
      <div
        className="login-screen"
        style={{ textAlign: "center", marginTop: "50px" }}
      >
        <h2>กรอกชื่อเพื่อเข้าสู่ Secret Room</h2>
        <form onSubmit={handleStartGame}>
          <input
            type="text"
            placeholder="ใส่ชื่อของคุณ..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{ padding: "10px", fontSize: "16px" }}
          />
          <button
            type="submit"
            style={{ padding: "10px 20px", marginLeft: "10px" }}
          >
            ลุยเลย!
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="game-screen">
      {/* 2. เรียกใช้งาน Navbar ตรงนี้ และโยน State playerName ให้มัน */}
      <Navbar playerName={playerName} />

      <div style={{ padding: "20px", textAlign: "center" }}>
        <h3>ยินดีต้อนรับสู่ห้องลับ!</h3>
        <p>ด่านที่ 1 กำลังเริ่มต้นขึ้น...</p>
      </div>
    </div>
  );
}

export default App;
