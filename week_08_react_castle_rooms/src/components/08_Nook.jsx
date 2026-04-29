import SecretRoom from "./09_SecretRoom";

export default function Nook(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-violet-500 pt-10">
      <h1>Nook</h1>
      <SecretRoom {...props} />
    </div>
  );
}
