import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const BmiCalculator = () => {
  const [isDark, setIsDark] = useState(false)

  React.useEffect(() => {
    const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'))
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    age: '',
    sex: '',
    activityFactor: ''
  })
  const [bmiResult, setBmiResult] = useState(null)
  const [bmrResult, setBmrResult] = useState(null)

  const bmiChart = [
    { bmi: t('bmi.results.below'), status: t('bmi.results.underweight') },
    { bmi: t('bmi.results.normal'), status: t('bmi.results.healthy') },
    { bmi: t('bmi.results.above'), status: t('bmi.results.overweight') },
    { bmi: t('bmi.results.obeseAbove'), status: t('bmi.results.obese') }
  ]

  const activityFactors = [
    { value: '1.2', label: t('bmi.activityFactors.sedentary') },
    { value: '1.375', label: t('bmi.activityFactors.lightly') },
    { value: '1.55', label: t('bmi.activityFactors.moderately') },
    { value: '1.725', label: t('bmi.activityFactors.very') },
    { value: '1.9', label: t('bmi.activityFactors.extra') }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const calculateBMI = () => {
    const height = parseFloat(formData.height)
    const weight = parseFloat(formData.weight)
    const age = parseFloat(formData.age)
    const sex = formData.sex
    const activityFactor = parseFloat(formData.activityFactor)

    if (!height || !weight || !age || !sex || !activityFactor) {
      alert(t('bmi.errors.fillAllFields'))
      return
    }

    // Calculate BMI
    const heightInM = height / 100
    const bmi = weight / (heightInM * heightInM)
    setBmiResult(bmi.toFixed(1))

    // Calculate BMR (Basal Metabolic Rate)
    let bmr
    if (sex === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)
    }

    // Calculate calories burned per day with activity factor
    const dailyCalories = bmr * activityFactor
    setBmrResult({
      resting: Math.round(bmr),
      daily: Math.round(dailyCalories)
    })
  }

  const getBmiStatus = (bmi) => {
    if (bmi < 18.5) return { status: t('bmi.results.underweight'), color: 'text-blue-600' }
    if (bmi >= 18.5 && bmi <= 24.9) return { status: t('bmi.results.healthy'), color: 'text-green-600' }
    if (bmi >= 25 && bmi <= 29.9) return { status: t('bmi.results.overweight'), color: 'text-yellow-600' }
    return { status: t('bmi.results.obese'), color: 'text-red-600' }
  }

  return (
    <div className={`py-16 px-4 sm:px-6 lg:px-8 ${
      isDark ? "bg-gray-800" : "bg-gray-50"
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Section: BMI Calculator Chart */}
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-800"
            }`}>{t('bmi.results.bmiChart')}</h2>
            
            {/* BMI Chart Table */}
            <div className={`${
              isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
            } border rounded-lg overflow-hidden shadow-sm`}>
              <table className={`min-w-full ${
                isDark ? "divide-gray-600" : "divide-gray-200"
              }`}>
                <thead className={isDark ? "bg-gray-600" : "bg-gray-50"}>
                  <tr>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {t('bmi.results.bmi')}
                    </th>
                    <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      isDark ? "text-gray-300" : "text-gray-500"
                    }`}>
                      {t('bmi.results.status')}
                    </th>
                  </tr>
                </thead>
                <tbody className={`${
                  isDark ? "bg-gray-700 divide-gray-600" : "bg-white divide-gray-200"
                }`}>
                  {bmiChart.map((row, index) => (
                    <tr key={index}>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        isDark ? "text-gray-100" : "text-gray-900"
                      }`}>
                        {row.bmi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm ${
                          row.status === t('bmi.results.underweight') ? 'text-blue-600' :
                          row.status === t('bmi.results.healthy') ? 'text-green-600' :
                          row.status === t('bmi.results.overweight') ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Results Display */}
            {bmiResult && (
              <div className={`mt-6 p-6 rounded-lg ${
                isDark ? "bg-gray-600" : "bg-gray-50"
              }`}>
                <h3 className={`text-lg font-semibold mb-3 ${
                  isDark ? "text-white" : "text-gray-800"
                }`}>{t('bmi.results.yourResults')}</h3>
                <div className="space-y-2">
                  <p className={isDark ? "text-gray-200" : "text-gray-700"}>
                    <span className="font-semibold">{t('bmi.results.bmi')}: </span>
                    {bmiResult}
                  </p>
                  <p className={isDark ? "text-gray-200" : "text-gray-700"}>
                    <span className="font-semibold">{t('bmi.results.status')}: </span>
                    <span className={getBmiStatus(parseFloat(bmiResult)).color}>
                      {getBmiStatus(parseFloat(bmiResult)).status}
                    </span>
                  </p>
                  {bmrResult && (
                    <>
                      <p className={isDark ? "text-gray-200" : "text-gray-700"}>
                        <span className="font-semibold">{t('bmi.results.bmr')}: </span>
                        {bmrResult.resting} {t('bmi.results.caloriesPerDay')}
                      </p>
                      <p className={isDark ? "text-gray-200" : "text-gray-700"}>
                        <span className="font-semibold">{t('bmi.results.bmiWithActivity')}: </span>
                        {bmrResult.daily} {t('bmi.results.caloriesPerDay')}
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Footnote */}
            <p className={`mt-4 text-xs ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}>
              * BMR Metabolic Rate / BMI Body Mass Index
            </p>
          </div>

          {/* Right Section: Calculate Your BMI */}
          <div>
            <h2 className={`text-3xl font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-800"
            }`}>{t('bmi.title')}</h2>
            
            <p className={`mb-6 text-sm leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}>
              {t('bmi.description')}
            </p>

            <form onSubmit={(e) => { e.preventDefault(); calculateBMI(); }} className="space-y-4">
              {/* Height and Weight Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="height" className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {t('bmi.form.height')}
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      isDark 
                        ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={t('bmi.form.height')}
                  />
                </div>
                <div>
                  <label htmlFor="weight" className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {t('bmi.form.weight')}
                  </label>
                  <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      isDark 
                        ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={t('bmi.form.weight')}
                  />
                </div>
              </div>

              {/* Age and Sex Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="age" className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {t('bmi.form.age')}
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      isDark 
                        ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder={t('bmi.form.age')}
                  />
                </div>
                <div>
                  <label htmlFor="sex" className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {t('bmi.form.sex')}
                  </label>
                  <select
                    id="sex"
                    name="sex"
                    value={formData.sex}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      isDark 
                        ? "bg-gray-600 border-gray-500 text-white" 
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="">{t('bmi.form.sex')}</option>
                    <option value="male">{t('bmi.form.male')}</option>
                    <option value="female">{t('bmi.form.female')}</option>
                  </select>
                </div>
              </div>

              {/* Activity Factor */}
              <div>
                <label htmlFor="activityFactor" className={`block text-sm font-medium mb-1 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}>
                  {t('bmi.form.activityFactor')}:
                </label>
                <select
                  id="activityFactor"
                  name="activityFactor"
                  value={formData.activityFactor}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                    isDark 
                      ? "bg-gray-600 border-gray-500 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="">{t('bmi.form.activityFactor')}</option>
                  {activityFactors.map((factor) => (
                    <option key={factor.value} value={factor.value}>
                      {factor.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculate Button */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white px-6 py-3 text-lg font-semibold rounded-md hover:bg-green-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {t('bmi.form.calculate')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BmiCalculator
