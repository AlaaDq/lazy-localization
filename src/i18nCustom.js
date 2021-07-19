import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '@/locales/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { 'en': messages }
})

const loadedLanguages = ['en']

export const languagesAvailable = ['en', 'ar', 'de']

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  if(lang=='ar')
  document.querySelector('html').setAttribute('dir', 'rtl')
  if(lang=='en')
  document.querySelector('html').setAttribute('dir', 'ltr')
  return lang
}

export function navigatorCloseLanguage () {
  const userLanguage = navigator.language
  if (languagesAvailable.includes(userLanguage)) {
    return loadLanguageAsync(userLanguage)
  } else if (userLanguage.includes('-')) {
    const userLanguageSplit = userLanguage.split('-')
    if (languagesAvailable.includes(userLanguageSplit[0])) {
      return loadLanguageAsync(userLanguageSplit[0])
    }
  }
  return 'en'
}

export function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `@/locales/${lang}`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}