import Gallery from "./07_Gallery";

export default function Corridor(props) {
  return (
    <div className="flex w-[90%] flex-col items-center justify-center bg-blue-500 pt-10">
      <h1>Corridor</h1>
      <Gallery {...props} />
    </div>
  );
}
