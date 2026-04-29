import Tower from "./02_Tower";

export default function Castle(props) {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-red-500 pt-10">
      <h1>Castle</h1>
      <Tower {...props} />
    </div>
  );
}
