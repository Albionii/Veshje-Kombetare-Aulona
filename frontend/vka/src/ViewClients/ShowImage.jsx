export default function ShowImage ({src}) {
  return (
    <div className="w-2/3 opacity-35 bg-black h-full flex justify-center items-center">
      <img src={src} />
    </div>
  )
}