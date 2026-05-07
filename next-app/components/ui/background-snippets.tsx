// Adapted to the procedure-hero dark palette (ink/charcoal/tobacco/vanilla)

export const ServicesHeroBackground = () => {
  return (
    <div
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(31,29,26,0.98), rgba(67,58,50,0.96))",
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
