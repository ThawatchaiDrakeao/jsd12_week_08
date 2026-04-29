import Hall from "./05_Hall";

export default function Room(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-green-500 pt-10">
      <h1>Room</h1>
      <Hall {...props} />
    </div>
  );
}
