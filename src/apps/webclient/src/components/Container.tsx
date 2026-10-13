export default function Container({ children, className }: { children?: React.ReactNode, className?: HTMLElement[ "className" ] }) {
  return <div className={`${className} container container-lg mx-auto h-screen`}>
    {children}
  </div>
}