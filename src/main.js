import './assets/main.css'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css';



import { createApp } from 'vue'
import App from './App.vue'

// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global CSS has to be imported
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// Import Vuetify components and directives
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ua from './locales/ua.json';








// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
});

// Настройка i18n
const i18n = createI18n({
    locale: 'en', // Установите язык по умолчанию
    fallbackLocale: 'en', // Язык по умолчанию
    messages: {
      en,
      ua
    }
  });

  const app = createApp(App);
  app.use(vuetify); 
  app.use(i18n);
  app.mount('#app');  

