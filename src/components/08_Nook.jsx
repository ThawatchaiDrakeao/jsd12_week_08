import SecretRoom from "./09_SecretRoom"

export default function Nook({question}) {
  return (
    <div className="flex flex-col justify-center items-center pt-10 bg-violet-500 w-[90%]">
      <h1>Nook</h1>
      {question ? question : "Waiting for a message..."}
      {/* SecretRoom */}
      <SecretRoom />
    </div>
  );
}