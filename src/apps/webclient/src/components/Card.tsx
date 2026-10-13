function FormCard({
  children,
  className
  ,
}: {
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLElement>[ 'className' ];
}) {
  return <div onPointerMove={e => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--dot-x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--dot-y', `${e.clientY - r.top}px`);
  }} className={`card ${className}`}>{children}</div>;
}

export { FormCard };