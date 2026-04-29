import Room from "./04_Room";

export default function Chamber(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-yellow-400 pt-10">
      <h1>Chamber</h1>
      <Room {...props} />
    </div>
  );
}
