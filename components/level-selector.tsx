"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Card, CardContent } from "@/components/ui/card"

interface LevelSelectorProps {
  selectedLevel: string
  onLevelChange: (level: string) => void
}

const LEVELS = [
  { value: "N5", label: "Beginner" },
  { value: "N4", label: "Elementary" },
  { value: "N3", label: "Intermediate" },
  { value: "N2", label: "Upper-int." },
  { value: "N1", label: "Advanced" },
]

export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <fieldset>
          <legend className="font-display italic text-base text-sumi/70 mb-4 text-center w-full tracking-wide">
            Select your level
          </legend>

          <ToggleGroup
            type="single"
            value={selectedLevel}
            onValueChange={(value) => {
              if (value) onLevelChange(value)
            }}
            aria-label="JLPT level"
            className="flex justify-center flex-wrap gap-x-1 sm:gap-x-2"
          >
            {LEVELS.map(({ value, label }) => {
              const isActive = selectedLevel === value
              return (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  aria-label={`${value} — ${label}`}
                  className="group flex flex-col items-center min-h-[44px] min-w-[56px] sm:min-w-[72px] px-3 sm:px-4 pt-2 pb-1.5 rounded-none data-[state=on]:bg-transparent"
                >
                  <span
                    className={`font-display text-2xl sm:text-3xl leading-none tracking-tight transition-colors motion-reduce:transition-none ${
                      isActive ? "text-sumi font-semibold" : "text-sumi/70 font-medium group-hover:text-sumi/80"
                    }`}
                  >
                    {value}
                  </span>
                  <span
                    className={`font-display italic text-[0.7rem] sm:text-xs mt-1 transition-colors motion-reduce:transition-none tracking-wide ${
                      isActive ? "text-vermilion-deep" : "text-sumi/70 group-hover:text-sumi/80"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-1.5 h-[2px] w-full transition-all duration-300 motion-reduce:transition-none ${
                      isActive ? "bg-vermilion" : "bg-transparent group-hover:bg-sumi/15"
                    }`}
                  />
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </fieldset>
      </CardContent>
    </Card>
  )
}
