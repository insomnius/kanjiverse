"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SegmentedControl, type SegmentedControlItem } from "@/components/segmented-control"

interface LevelSelectorProps {
  selectedLevel: string
  onLevelChange: (level: string) => void
}

const LEVELS: SegmentedControlItem[] = [
  { value: "N5", label: "N5", description: "Beginner" },
  { value: "N4", label: "N4", description: "Elementary" },
  { value: "N3", label: "N3", description: "Intermediate" },
  { value: "N2", label: "N2", description: "Upper-int." },
  { value: "N1", label: "N1", description: "Advanced" },
]

/** Quiz home's "Select your level" hub: SegmentedControl wrapped in a Card. */
export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <SegmentedControl
          items={LEVELS}
          value={selectedLevel}
          onChange={onLevelChange}
          legend="Select your level"
          ariaLabel="JLPT level"
        />
      </CardContent>
    </Card>
  )
}

/** Re-exported so list pages can use the identical JLPT items without redeclaring. */
export const JLPT_LEVELS: SegmentedControlItem[] = LEVELS
