// Adapted to the procedure-hero dark palette (ink/charcoal/tobacco/vanilla)

export const ServicesHeroBackground = () => {
  return (
    <div
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(246,239,227,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(246,239,227,0.04) 1px, transparent 1px)",
        backgroundSize: "6rem 4rem",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 800px at 100% 200px, rgba(159,118,87,0.22), transparent)",
        }}
      />
    </div>
  )
}

export const ProcedureHeroDark = () => {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "rgb(31,29,26)" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 560px at 50% 200px, rgba(84,67,54,0.8), transparent)",
        }}
      />
    </div>
  )
}
