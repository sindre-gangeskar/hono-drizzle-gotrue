export default function Navbar() {
  return <div className="sticky top-0 left-0 p-6 flex mx-auto mt-4 overflow-hidden rounded-2xl 
  backdrop-blur-3xl
  before:content-['']
  before:w-full
  before:absolute
  before:inset-0
  before:bg-stone-800
  before:opacity-15
  w-[95%]
  h-14
  justify-between items-center">
    <div id="left-content">more stuff</div>
    <div className="">&nbsp;</div>
    <div id="right-content"><p>stuff</p></div>
  </div>
}