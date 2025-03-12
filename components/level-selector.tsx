"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface LevelSelectorProps {
  selectedLevel: string
  onLevelChange: (level: string) => void
}

export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  const levels = ["N5", "N4", "N3", "N2", "N1"]

  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Select JLPT Level</h2>
        <RadioGroup value={selectedLevel} onValueChange={onLevelChange} className="flex justify-center flex-wrap gap-4">
          {levels.map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <RadioGroupItem value={level} id={level} />
              <Label htmlFor={level} className={`font-medium ${selectedLevel === level ? "text-primary" : ""}`}>
                {level}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

