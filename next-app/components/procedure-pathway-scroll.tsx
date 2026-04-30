"use client"

import Image, { type ImageProps } from "next/image"
import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

type ProcedurePathwayStep = {
  title: string
  eyebrow: string
  description: string
  visualTitle: string
  visualCopy: string
  imageSrc?: ImageProps["src"]
  imageAlt?: string
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
  const measureFrameRef = useRef(0)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const measure = () => {
      measureFrameRef.current = 0

      const cards = cardsRef.current.filter(Boolean) as HTMLElement[]
      if (!cards.length) return

      const focusY = window.innerHeight * 0.5
      const cardRects = cards.map((card) => card.getBoundingClientRect())
      const firstRect = cardRects[0]
      const lastRect = cardRects[cardRects.length - 1]
      const centers = cardRects.map((rect) => rect.top + rect.height * 0.5)
      const pathwayStart = firstRect.top
      const pathwayEnd = lastRect.bottom
      const pathwayDistance = Math.max(pathwayEnd - pathwayStart, 1)
      const progress = Math.min(
        1,
        Math.max(0, (focusY - pathwayStart) / pathwayDistance)
      )
      const nextIndex = centers.reduce((bestIndex, center, index) => {
        const currentDistance = Math.abs(center - focusY)
        const bestDistance = Math.abs(centers[bestIndex] - focusY)

        return currentDistance < bestDistance ? index : bestIndex
      }, 0)

      shell.style.setProperty("--pathway-progress", progress.toFixed(4))

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

                  <div
                    className="procedure-pathway-card-visual"
                    aria-hidden={step.imageSrc ? undefined : true}
                  >
                    <div className="procedure-pathway-card-visual-frame">
                      {step.imageSrc ? (
                        <Image
                          src={step.imageSrc}
                          alt={step.imageAlt ?? ""}
                          fill
                          sizes="(max-width: 700px) calc(100vw - 96px), (max-width: 1100px) 45vw, 320px"
                          className="procedure-pathway-card-image"
                        />
                      ) : (
                        <>
                          <div className="procedure-pathway-card-visual-grid" />
                          <div className="procedure-pathway-card-visual-glow" />
                          <div className="procedure-pathway-card-visual-copy">
                            <span>Placeholder Visual</span>
                            <strong>{step.visualTitle}</strong>
                            <p>{step.visualCopy}</p>
                          </div>
                          <div className="procedure-pathway-card-visual-lines">
                            <span />
                            <span />
                            <span />
                          </div>
                        </>
                      )}
                      {!step.imageSrc && (
                        <div className="procedure-pathway-card-visual-badge">
                          <span>{step.title}</span>
                        </div>
                      )}
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
