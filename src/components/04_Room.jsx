import Hall from "./05_Hall"

export default function Room({question}) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-green-500 w-[90%]">
      <h1>Room</h1>
      {question ? question : "Waiting for a message..."}
      {/* Hall */}
      <Hall />
    </div>
  );
}