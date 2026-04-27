"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export interface SegmentedControlItem {
  value: string
  /** Big-letter heading row, e.g. "N5" or "Hiragana". */
  label: string
  /** Italic descriptor row underneath, e.g. "Beginner" or "Native sounds". */
  description?: string
}

interface SegmentedControlProps {
  items: SegmentedControlItem[]
  value: string
  onChange: (value: string) => void
  /**
   * Visible legend at the top — also serves as the fieldset's accessible name.
   * Pass null to suppress the legend visually (still wrapped in <fieldset> with
   * an `aria-label` for screen readers).
   */
  legend?: string | null
  /**
   * Accessible name for the underlying ToggleGroup. Falls back to `legend`.
   * Required when `legend` is null.
   */
  ariaLabel?: string
  /** Extra classes on the outer fieldset. Use to control surrounding spacing. */
  className?: string
}

/**
 * Editorial segmented control — Newsreader letterform on top, italic descriptor,
 * 2px vermilion underline on the active item. Used wherever we have ≤7 mutually-
 * exclusive options that drive content panel switching (JLPT level, kana script).
 *
 * Built on Radix ToggleGroup so keyboard nav (Arrow / Home / End) and
 * `aria-pressed` toggle semantics are correct out of the box. Single-select with
 * a guard against the click-active-to-deselect default.
 *
 * For the quiz's "Select your level" hub, wrap this in a Card via LevelSelector;
 * for inline use on list pages, render directly without the Card.
 */
export function SegmentedControl({
  items,
  value,
  onChange,
  legend,
  ariaLabel,
  className,
}: SegmentedControlProps) {
  const accessibleName = ariaLabel ?? legend ?? undefined
  return (
    <fieldset className={className}>
      {legend !== null && legend !== undefined && (
        <legend className="font-display italic text-base text-sumi/70 mb-3 text-center w-full tracking-wide">
          {legend}
        </legend>
      )}
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => {
          if (v) onChange(v)
        }}
        aria-label={accessibleName}
        className="flex justify-center flex-wrap gap-x-1 sm:gap-x-2"
      >
        {items.map(({ value: itemValue, label, description }) => {
          const isActive = value === itemValue
          return (
            <ToggleGroupItem
              key={itemValue}
              value={itemValue}
              aria-label={description ? `${label} — ${description}` : label}
              className="group flex flex-col items-center min-h-[44px] min-w-[56px] sm:min-w-[72px] px-3 sm:px-4 pt-2 pb-1.5 rounded-none data-[state=on]:bg-transparent"
            >
              <span
                className={`font-display text-2xl sm:text-3xl leading-none tracking-tight transition-colors motion-reduce:transition-none ${
                  isActive
                    ? "text-sumi font-semibold"
                    : "text-sumi/70 font-medium group-hover:text-sumi/80"
                }`}
              >
                {label}
              </span>
              {description && (
                <span
                  className={`font-display italic text-[0.7rem] sm:text-xs mt-1 transition-colors motion-reduce:transition-none tracking-wide ${
                    isActive ? "text-vermilion-deep" : "text-sumi/70 group-hover:text-sumi/80"
                  }`}
                >
                  {description}
                </span>
              )}
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
  )
}
