import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0) // First FAQ opens by default
  const { t } = useTranslation()

  const faqQuestions = t('contact.faq.questions', { returnObjects: true })

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top header (like first image): tag + big title on left, paragraph on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <span className="inline-block px-4 py-2 text-sm font-medium text-white bg-pink-400 rounded-full mb-6 shadow-sm">
              {t('contact.faq.tag', 'Frequently Asked Questions')}
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {t('contact.faq.title', 'Get Clear Answers About Our Health & Wellness Programs')}
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('contact.faq.subtitle', 'Starting your wellness journey can bring up many questions—and that\'s perfectly normal. Below, we answer some of the most common ones to help you feel informed and confident.')}
            </p>
          </div>
        </div>

        {/* Image + 5-question accordion (like second image) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="/images/healthcare.jpg"
                alt="Health and wellness consultation"
                className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/images/contact 1.jpg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>

          {/* Right: FAQ list */}
          <div className="space-y-4">
            {faqQuestions.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-pink-300 dark:hover:border-pink-600"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-6">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openIndex === index ? (
                      <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 12h6m-6 6l-6-6m6-6V6" />
                      </svg>
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="pt-4 animate-in fade-in duration-300">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default FAQ
