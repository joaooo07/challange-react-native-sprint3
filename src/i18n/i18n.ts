import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const pt = require('./locales/pt.json');
const en = require('./locales/en.json');
const es = require('./locales/es.json'); 

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt',
    resources: {
      pt: { translation: pt },
      en: { translation: en },
      es: { translation: es } 
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
