import React from 'react'
import { useTranslation } from 'react-i18next'

const DEFAULT_ITEMS = [
  { labelKey: 'wellnessProgress.items.bodyBalance', value: 62 },
  { labelKey: 'wellnessProgress.items.dailyExercise', value: 88 },
  { labelKey: 'wellnessProgress.items.physicalActivity', value: 75 },
  { labelKey: 'wellnessProgress.items.nutritionPlan', value: 81 },
]

function ProgressBar({ label, value }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700 dark:text-white/90 font-medium">{label}</span>
        <span className="text-gray-600 dark:text-white/70 font-semibold">{value} %</span>
      </div>
      <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export default function WellnessProgress({
  title,
  description,
  items = DEFAULT_ITEMS,
}) {
  const { t } = useTranslation()
  const translatedTitle = title ?? t('wellnessProgress.title')
  const translatedDescription = description ?? t('wellnessProgress.description')
  return (
    <section id="wellness-progress" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{translatedTitle}</h2>
          <p className="mt-4 text-gray-600 dark:text-white/70 leading-relaxed">
            {translatedDescription}
          </p>
        </div>
        <div className="space-y-6">
          {items.map((it) => (
            <ProgressBar key={it.labelKey} label={t(it.labelKey)} value={it.value} />
          ))}
        </div>
      </div>
    </section>
  )
}


