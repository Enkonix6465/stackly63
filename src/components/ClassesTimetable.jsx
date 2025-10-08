import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Simple, reusable timetable component inspired by the provided template
// - Has category filters
// - Displays a weekly grid with time slots
// - TailwindCSS-only styling, dark-mode aware

const CATEGORIES = [
  { id: 'all', labelKey: 'classesTimetable.categories.all', color: 'bg-gray-200 text-gray-800' },
  { id: 'dance', labelKey: 'classesTimetable.categories.dance', color: 'bg-green-500/10 text-green-600 border border-green-300' },
  { id: 'nutrition', labelKey: 'classesTimetable.categories.nutrition', color: 'bg-emerald-500/10 text-emerald-600 border border-emerald-300' },
  { id: 'stretching', labelKey: 'classesTimetable.categories.stretching', color: 'bg-orange-500/10 text-orange-600 border border-orange-300' },
  { id: 'workout', labelKey: 'classesTimetable.categories.workout', color: 'bg-blue-500/10 text-blue-600 border border-blue-300' },
]

const DAYS = [
  { key: 'monday', labelKey: 'classesTimetable.days.monday' },
  { key: 'tuesday', labelKey: 'classesTimetable.days.tuesday' },
  { key: 'wednesday', labelKey: 'classesTimetable.days.wednesday' },
  { key: 'thursday', labelKey: 'classesTimetable.days.thursday' },
  { key: 'friday', labelKey: 'classesTimetable.days.friday' },
  { key: 'saturday', labelKey: 'classesTimetable.days.saturday' },
  { key: 'sunday', labelKey: 'classesTimetable.days.sunday' },
]

const TIMES = ['10:00', '12:00', '14:00', '16:00']

// Sample data roughly matching the screenshot
const SAMPLE_EVENTS = [
  { day: 'tuesday', time: '10:00', titleKey: 'classesTimetable.classes.zumba', coach: 'Olivia Hall', end: '11:00', category: 'workout', color: 'text-rose-500' },
  { day: 'wednesday', time: '10:00', titleKey: 'classesTimetable.classes.powerDance', coach: 'Shirley Young', end: '11:00', category: 'dance', color: 'text-green-600' },
  { day: 'friday', time: '10:00', titleKey: 'classesTimetable.classes.powerDance', coach: 'Shirley Young', end: '11:00', category: 'dance', color: 'text-green-600' },
  { day: 'saturday', time: '10:00', titleKey: 'classesTimetable.classes.zumba', coach: 'Olivia Hall', end: '11:00', category: 'workout', color: 'text-rose-500' },
  { day: 'sunday', time: '10:00', titleKey: 'classesTimetable.classes.powerDance', coach: 'Shirley Young', end: '11:00', category: 'dance', color: 'text-green-600' },

  { day: 'monday', time: '12:00', titleKey: 'classesTimetable.classes.pilates', coach: 'Kimberly Tran', end: '13:00', category: 'stretching', color: 'text-indigo-600' },
  { day: 'tuesday', time: '12:00', titleKey: 'classesTimetable.classes.powerDance', coach: 'Shirley Young', end: '13:00', category: 'dance', color: 'text-green-600' },
  { day: 'wednesday', time: '12:00', titleKey: 'classesTimetable.classes.pilates', coach: 'Kimberly Tran', end: '13:00', category: 'stretching', color: 'text-indigo-600' },
  { day: 'thursday', time: '12:00', titleKey: 'classesTimetable.classes.powerDance', coach: 'Shirley Young', end: '13:00', category: 'dance', color: 'text-green-600' },
  { day: 'friday', time: '12:00', titleKey: 'classesTimetable.classes.pilates', coach: 'Kimberly Tran', end: '13:00', category: 'stretching', color: 'text-indigo-600' },

  { day: 'tuesday', time: '14:00', titleKey: 'classesTimetable.classes.yogaWorkout', coach: 'Gloria Moore', end: '15:00', category: 'workout', color: 'text-orange-500' },
  { day: 'wednesday', time: '14:00', titleKey: 'classesTimetable.classes.yogaWorkout', coach: 'Gloria Moore', end: '15:00', category: 'workout', color: 'text-orange-500' },
  { day: 'thursday', time: '14:00', titleKey: 'classesTimetable.classes.yogaWorkout', coach: 'Gloria Moore', end: '15:00', category: 'workout', color: 'text-orange-500' },
  { day: 'friday', time: '14:00', titleKey: 'classesTimetable.classes.powerDance', coach: 'Shirley Young', end: '15:00', category: 'dance', color: 'text-green-600' },
  { day: 'sunday', time: '14:00', titleKey: 'classesTimetable.classes.yogaWorkout', coach: 'Gloria Moore', end: '15:00', category: 'workout', color: 'text-orange-500' },

  { day: 'tuesday', time: '16:00', titleKey: 'classesTimetable.classes.zumba', coach: 'Olivia Hall', end: '17:00', category: 'workout', color: 'text-rose-500' },
  { day: 'wednesday', time: '16:00', titleKey: 'classesTimetable.classes.pilates', coach: 'Kimberly Tran', end: '17:00', category: 'stretching', color: 'text-indigo-600' },
  { day: 'friday', time: '16:00', titleKey: 'classesTimetable.classes.pilates', coach: 'Kimberly Tran', end: '17:00', category: 'stretching', color: 'text-indigo-600' },
  { day: 'saturday', time: '16:00', titleKey: 'classesTimetable.classes.zumba', coach: 'Olivia Hall', end: '17:00', category: 'workout', color: 'text-rose-500' },
]

function ClassesTimetable({ title, events = SAMPLE_EVENTS }) {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('all')
  
  const translatedTitle = title ?? t('classesTimetable.title')
  const translatedSubtitle = t('classesTimetable.subtitle')

  const filteredEvents = useMemo(() => {
    if (activeCategory === 'all') return events
    return events.filter(e => e.category === activeCategory)
  }, [activeCategory, events])

  const cellEventsMap = useMemo(() => {
    const map = {}
    for (const e of filteredEvents) {
      const key = `${e.day}-${e.time}`
      if (!map[key]) map[key] = []
      map[key].push(e)
    }
    return map
  }, [filteredEvents])

  return (
    <section id="classes-timetable" className="py-20 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{translatedTitle}</h2>
          <p className="mt-3 text-gray-600 dark:text-white/70">{translatedSubtitle}</p>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? `${cat.color}`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[900px] border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-8 bg-gray-50 dark:bg-white/5">
              <div className="p-4 text-sm font-semibold text-gray-500">&nbsp;</div>
              {DAYS.map(d => (
                <div key={d.key} className="p-4 text-center text-sm md:text-base font-semibold text-gray-700 dark:text-white">
                  {t(d.labelKey)}
                </div>
              ))}
            </div>

            {/* Time rows */}
            {TIMES.map((time, rowIdx) => (
              <div key={time} className={`grid grid-cols-8 border-t border-black/10 dark:border-white/10 ${rowIdx % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/50 dark:bg-white/5'}`}>
                {/* Time label */}
                <div className="p-4 text-center text-sm font-semibold text-gray-600 dark:text-white/70">{time}</div>
                {/* Day cells */}
                {DAYS.map(day => {
                  const key = `${day.key}-${time}`
                  const items = cellEventsMap[key] || []
                  return (
                    <div key={key} className="p-4 min-h-[120px] border-l border-black/10 dark:border-white/10">
                      {items.map((evt, i) => (
                        <div key={i} className="rounded-lg bg-white dark:bg-gray-800 shadow-sm p-3 text-center">
                          <div className={`font-semibold ${evt.color}`}>{t(evt.titleKey)}</div>
                          <div className="text-xs text-gray-500 dark:text-white/60 mt-1">{time} - {evt.end}</div>
                          <div className="text-xs font-medium text-gray-700 dark:text-white/80 mt-1">{evt.coach}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClassesTimetable


