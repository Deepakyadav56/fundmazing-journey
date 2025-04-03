
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StepProps {
  title: string
  description?: string
  isActive?: boolean
  isCompleted?: boolean
  index: number
}

interface StepperProps {
  currentStep: number
  steps: Array<{
    title: string
    description?: string
  }>
  className?: string
}

export function Step({
  title,
  description,
  isActive,
  isCompleted,
  index
}: StepProps) {
  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full border-2 text-center font-medium",
            isActive
              ? "border-primary bg-primary text-primary-foreground"
              : isCompleted
              ? "border-fundeasy-green bg-fundeasy-green text-white"
              : "border-muted-foreground/40 text-muted-foreground"
          )}
        >
          {isCompleted ? (
            <Check className="h-4 w-4 text-white" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
        <div className="h-[calc(100%-32px)] w-0.5 bg-border" />
      </div>
      <div className="ml-4 mt-0.5 pb-8">
        <h3
          className={cn(
            "text-base font-medium",
            isActive ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}

export function Stepper({ currentStep, steps, className }: StepperProps) {
  return (
    <div className={cn("space-y-0", className)}>
      {steps.map((step, index) => (
        <Step
          key={index}
          title={step.title}
          description={step.description}
          index={index}
          isActive={currentStep === index + 1}
          isCompleted={currentStep > index + 1}
        />
      ))}
    </div>
  )
}
