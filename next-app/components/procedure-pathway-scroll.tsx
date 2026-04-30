"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

type ProcedurePathwayStep = {
  title: string
  eyebrow: string
  description: string
  visualTitle: string
  visualCopy: string
  accent: string
}

type ProcedurePathwayScrollProps = {
  label: string
  title: string
  copy: string
  steps: ProcedurePathwayStep[]
}

export function ProcedurePathwayScroll({
  label,
  title,
  copy,
  steps,
}: ProcedurePathwayScrollProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLElement | null)[]>([])
  const activeStepRef = useRef(0)
  const frameRef = useRef(0)
  const measureFrameRef = useRef(0)
  const progressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const animateProgress = () => {
      const current = progressRef.current
      const target = targetProgressRef.current
      const next = current + (target - current) * 0.22
      const settled = Math.abs(target - next) < 0.001

      progressRef.current = settled ? target : next
      shell.style.setProperty(
        "--pathway-progress",
        progressRef.current.toFixed(4)
      )

      if (!settled) {
        frameRef.current = window.requestAnimationFrame(animateProgress)
      } else {
        frameRef.current = 0
      }
    }

    const startProgressAnimation = () => {
      if (frameRef.current) return

      frameRef.current = window.requestAnimationFrame(animateProgress)
    }

    const measure = () => {
      measureFrameRef.current = 0

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[]
      if (!cards.length) return

      const focusY = window.innerHeight * 0.5
      const centers = cards.map((card) => {
        const rect = card.getBoundingClientRect()
        return rect.top + rect.height * 0.5
      })
      const firstCenter = centers[0] ?? focusY
      const lastCenter = centers[centers.length - 1] ?? firstCenter
      const distance = Math.max(lastCenter - firstCenter, 1)
      const progress = Math.min(
        1,
        Math.max(0, (focusY - firstCenter) / distance)
      )
      const nextIndex = centers.reduce((bestIndex, center, index) => {
        const currentDistance = Math.abs(center - focusY)
        const bestDistance = Math.abs(centers[bestIndex] - focusY)

        return currentDistance < bestDistance ? index : bestIndex
      }, 0)

      targetProgressRef.current = progress
      startProgressAnimation()

      if (activeStepRef.current !== nextIndex) {
        activeStepRef.current = nextIndex
        setActiveStep(nextIndex)
      }
    }

    const requestUpdate = () => {
      if (measureFrameRef.current) return

      measureFrameRef.current = window.requestAnimationFrame(measure)
    }

    requestUpdate()
    window.addEventListener("scroll", requestUpdate, { passive: true })
    window.addEventListener("resize", requestUpdate)

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current)
      }

      if (measureFrameRef.current) {
        window.cancelAnimationFrame(measureFrameRef.current)
      }

      window.removeEventListener("scroll", requestUpdate)
      window.removeEventListener("resize", requestUpdate)
    }
  }, [])

  return (
    <div
      ref={shellRef}
      className="procedure-pathway-scroll-shell"
      style={
        {
          "--pathway-steps": steps.length,
          "--pathway-progress": 0,
        } as CSSProperties
      }
    >
      <div className="procedure-pathway-sticky">
        <div className="procedure-pathway-intro">
          <div className="section-label">{label}</div>
          <h2 className="procedure-section-title">{title}</h2>
          <p className="procedure-section-copy">{copy}</p>
        </div>

        <div className="procedure-pathway-flow">
          <div className="procedure-pathway-progress" aria-hidden="true">
            <div className="procedure-pathway-progress-track">
              <div className="procedure-pathway-progress-fill" />
              <div className="procedure-pathway-progress-points">
                {steps.map((step, index) => (
                  <span
                    key={step.title}
                    className="procedure-pathway-progress-point"
                    data-active={index <= activeStep}
                    data-current={index === activeStep}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="procedure-pathway-cards" aria-label="Care pathway">
            {steps.map((step, index) => (
              <article
                key={step.title}
                ref={(node) => {
                  cardsRef.current[index] = node
                }}
                className="procedure-pathway-card"
                data-active={index === activeStep}
                data-step-index={index}
                style={
                  {
                    "--step-accent": step.accent,
                  } as CSSProperties
                }
              >
                <div className="procedure-pathway-card-body">
                  <div className="procedure-pathway-card-copy">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>

                  <div className="procedure-pathway-card-visual" aria-hidden="true">
                    <div className="procedure-pathway-card-visual-frame">
                      <div className="procedure-pathway-card-visual-grid" />
                      <div className="procedure-pathway-card-visual-glow" />
                      <div className="procedure-pathway-card-visual-copy">
                        <span>Placeholder Visual</span>
                        <strong>{step.visualTitle}</strong>
                        <p>{step.visualCopy}</p>
                      </div>
                      <div className="procedure-pathway-card-visual-badge">
                        <span>{step.title}</span>
                      </div>
                      <div className="procedure-pathway-card-visual-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
