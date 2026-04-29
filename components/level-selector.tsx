"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SegmentedControl, type SegmentedControlItem } from "@/components/segmented-control"
import { useTranslation } from "@/lib/i18n/use-translation"

interface LevelSelectorProps {
  selectedLevel: string
  onLevelChange: (level: string) => void
}

/** Quiz home's "Select your level" hub: SegmentedControl wrapped in a Card. */
export default function LevelSelector({ selectedLevel, onLevelChange }: LevelSelectorProps) {
  const { t } = useTranslation()
  const levels: SegmentedControlItem[] = [
    { value: "N5", label: t("level.n5.label"), description: t("level.n5.description") },
    { value: "N4", label: t("level.n4.label"), description: t("level.n4.description") },
    { value: "N3", label: t("level.n3.label"), description: t("level.n3.description") },
    { value: "N2", label: t("level.n2.label"), description: t("level.n2.description") },
    { value: "N1", label: t("level.n1.label"), description: t("level.n1.description") },
  ]
  return (
    <Card>
      <CardContent className="pt-6">
        <SegmentedControl
          items={levels}
          value={selectedLevel}
          onChange={onLevelChange}
          legend={t("level.legend")}
          ariaLabel={t("level.aria")}
        />
      </CardContent>
    </Card>
  )
}

/** JLPT items, translated at render time. Consumers call this hook so the
 *  SegmentedControl re-renders when the user flips locale. The five `value`
 *  strings ("N5"…"N1") are stable across locales — only labels/descriptions
 *  translate — so any state keyed on `value` continues to round-trip. */
export function useJlptLevels(): SegmentedControlItem[] {
  const { t } = useTranslation()
  return [
    { value: "N5", label: t("level.n5.label"), description: t("level.n5.description") },
    { value: "N4", label: t("level.n4.label"), description: t("level.n4.description") },
    { value: "N3", label: t("level.n3.label"), description: t("level.n3.description") },
    { value: "N2", label: t("level.n2.label"), description: t("level.n2.description") },
    { value: "N1", label: t("level.n1.label"), description: t("level.n1.description") },
  ]
}
