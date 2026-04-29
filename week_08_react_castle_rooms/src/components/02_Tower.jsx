import Chamber from "./03_Chamber";

export default function Tower(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-orange-500 pt-10">
      <h1>Tower</h1>
      <Chamber {...props} />
    </div>
  );
}
