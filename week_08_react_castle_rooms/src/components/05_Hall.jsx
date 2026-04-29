import Corridor from "./06_Corridor";

export default function Hall(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-emerald-500 pt-10">
      <h1>Hall</h1>
      <Corridor {...props} />
    </div>
  );
}
