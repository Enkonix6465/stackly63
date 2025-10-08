import React from 'react'
import { useTranslation } from 'react-i18next'

// Plans are now provided by translations (see locales: pricing.plans)

function PlanCard({ plan, periodLabel }) {
  return (
    <div className={`relative rounded-2xl bg-white/95 dark:bg-gray-900/90 shadow-xl overflow-hidden ${plan.featured ? 'ring-2 ring-green-400 scale-[1.02]' : ''}`}>
      {plan.featured && (
        <div className="absolute -right-8 -top-8 h-24 w-24 rotate-45 bg-green-500 text-white grid place-items-center text-xl font-bold">
          ★
        </div>
      )}
      <div className="px-8 pt-10 pb-8 text-center">
        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white">{plan.name}</h3>
        <div className="mt-6 text-5xl font-extrabold text-gray-900 dark:text-white">
          ${plan.price}
        </div>
        <div className="text-sm uppercase tracking-wider text-gray-500 dark:text-white/60 mt-1">{periodLabel}</div>
        <div className="my-8 h-px bg-gray-200 dark:bg-white/10" />

        <ul className="space-y-5 text-gray-600 dark:text-white/80">
          {plan.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <button className="mt-10 inline-flex items-center justify-center rounded-full bg-green-500 px-8 py-3 text-white font-bold hover:bg-green-600 transition-colors">
          {plan.cta}
        </button>
      </div>
    </div>
  )
}

export default function PricingPlans({
  bgImage = '/images/63S8.jpg',
  title,
  subtitle,
}) {
  const { t } = useTranslation()
  const translatedTitle = title ?? t('pricing.title')
  const translatedSubtitle = subtitle ?? t('pricing.subtitle')
  const periodLabel = t('pricing.perMonth')
  const plans = t('pricing.plans', { returnObjects: true })
  return (
    <section id="pricing-plans" className="relative overflow-hidden">
      {/* Background image with fixed effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:py-28">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold">{translatedTitle}</h2>
          <p className="mt-4 max-w-3xl mx-auto text-white/85">{translatedSubtitle}</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PlanCard key={p.name} plan={p} periodLabel={periodLabel} />
          ))}
        </div>
      </div>
    </section>
  )
}


