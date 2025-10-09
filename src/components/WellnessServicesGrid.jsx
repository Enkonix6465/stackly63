import React from 'react'
import { useTranslation } from 'react-i18next'

const CARDS = [
  {
    titleKey: 'wellnessServices.sportsTraining.title',
    descriptionKey: 'wellnessServices.sportsTraining.description',
    img: '/images/63S1.jpg',
    href: '/services/sports-training',
  },
  {
    titleKey: 'wellnessServices.spaTherapies.title',
    descriptionKey: 'wellnessServices.spaTherapies.description',
    img: '/images/63S3.jpg',
    href: '/services/spa-therapies',
  },
  {
    titleKey: 'wellnessServices.holisticHealing.title',
    descriptionKey: 'wellnessServices.holisticHealing.description',
    img: '/images/63S7.jpg',
    href: '/services/holistic-healing',
  },
  {
    titleKey: 'wellnessServices.nutritionPlans.title',
    descriptionKey: 'wellnessServices.nutritionPlans.description',
    img: '/images/63S4.jpg',
    href: '/services/nutrition-plans',
  },
  {
    titleKey: 'wellnessServices.mindfulLiving.title',
    descriptionKey: 'wellnessServices.mindfulLiving.description',
    img: '/images/63s5.jpg',
    href: '/services/mindful-living',
  },
  {
    titleKey: 'wellnessServices.wellnessEvents.title',
    descriptionKey: 'wellnessServices.wellnessEvents.description',
    img: '/images/63S6.jpg',
    href: '/services/wellness-events',
  },
]

export default function WellnessServicesGrid({
  eyebrow = 'wellnessServices.eyebrow',
  title = 'wellnessServices.title',
  subtitle = 'wellnessServices.subtitle',
  cards = CARDS,
}) {
  const { t } = useTranslation()
  
  return (
    <section id="wellness-grid" className="py-20 bg-emerald-50/30 dark:bg-gray-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-emerald-700 dark:text-emerald-300">{t(eyebrow)}</p>
          <h2 className="mt-3 text-4xl font-extrabold text-emerald-900 dark:text-white">{t(title)}</h2>
          <p className="mt-3 text-emerald-800/80 dark:text-white/70">{t(subtitle)}</p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <article key={c.titleKey} className="group rounded-2xl bg-emerald-50 dark:bg-white/5 border border-emerald-900/10 dark:border-white/10 overflow-hidden shadow-sm">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.img} alt={t(c.titleKey)} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-end justify-center bg-black/0 group-hover:bg-black/30 opacity-0 group-hover:opacity-100 transition-all">
                  <a
                    href={c.href || '/contact'}
                    className="mb-4 inline-flex items-center rounded-full bg-emerald-500 px-5 py-2.5 text-white font-semibold shadow hover:bg-emerald-600"
                  >
                    {t('wellnessServices.viewButton')}
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-emerald-900 dark:text-white">{t(c.titleKey)}</h3>
                <p className="mt-3 text-emerald-900/70 dark:text-white/70">{t(c.descriptionKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


