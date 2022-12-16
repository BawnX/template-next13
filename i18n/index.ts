import navigationEs from './es/navigation'
import navigationEn from './en/navigation'

export type navigationType = {
  [index: string]: string
}
export type translationsType = {
  [index: string]: navigationType
}

export type i18nType = {
  [index: string]: translationsType,
}

const i18n: i18nType = {
  es: {
    navigation: navigationEs
  },
  en: {
    navigation: navigationEn
  }
}

export default i18n
