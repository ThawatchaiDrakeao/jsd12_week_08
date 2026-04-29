import Nook from "./08_Nook";

export default function Gallery(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-indigo-500 pt-10">
      <h1>Gallery</h1>
      <Nook {...props} />
    </div>
  );
}
