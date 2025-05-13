<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-right">
        <v-btn @click="toggleTheme" class="mr-2">{{ isDark ? 'Светлая' : 'Темная' }}</v-btn>
        <v-btn @click="toggleLocale" class="mr-2">{{ locales === 'en' ? 'UA' : 'EN' }}</v-btn>
        <v-btn :loading="isGeneratingPDF" @click="generatePDF" class="mr-2">PDF</v-btn>
        <v-btn @click="downloadJSON">JSON</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <div ref="contentToPrint">
    <v-container :fluid="$vuetify.display.smAndDown">
      <v-row no-gutters>
        <v-col cols="12" md="6" sm="12">
          <!-- Профиль -->
          <v-card class="profile-card mb-4 pa-4">
            <v-card-title class="text-h5">{{ profile.name }}</v-card-title>
            <v-card-subtitle class="text-h6">{{ profile.title }}</v-card-subtitle>
            <v-avatar class="ma-3" rounded="1" size="150">
              <v-img :src="cvImageUrl" alt="Фото профиля"></v-img>
            </v-avatar>
          </v-card>

          <!-- Контакты -->
          <v-card class="contact-card mb-4 pa-4">
            <v-card-title>{{ contact.title }}</v-card-title>
            <v-card-text>
              <div><v-icon>mdi-email</v-icon> <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></div>
              <div><v-icon>mdi-web</v-icon> <a :href="`https://${contact.website}`">{{ contact.website }}</a></div>
              <div><v-icon>mdi-phone</v-icon> <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a></div>
              <div><v-icon>mdi-send</v-icon> <a :href="`https://t.me/${contact.telegram}`" target="_blank">@{{ contact.telegram }}</a></div>
            </v-card-text>
          </v-card>

          <!-- Цель -->
          <v-card class="objective-card mb-4 pa-4">
            <v-card-title>{{ objective.title }}</v-card-title>
            <v-card-text>{{ objective.text }}</v-card-text>
          </v-card>

          <!-- Навыки -->
          <v-card class="skills-card mb-4 pa-4">
            <v-card-title>{{ skills.titles }}</v-card-title>
            <v-card-text>
              <div v-for="(tool, key) in skills.toolsList" :key="key">
                <strong>{{ tool.name }} - {{ tool.value }}</strong>
                <v-progress-linear :model-value="tool.value" :color="tool.color" height="8" rounded></v-progress-linear>
              </div>
            </v-card-text>
            <v-card-title>{{ skills.titlef }}</v-card-title>
            <v-card-text>
              <div v-for="(framework, key) in skills.frameworksList" :key="key">
                <strong>{{ framework.name }} - {{ framework.value }}%</strong>
                <v-progress-linear :model-value="framework.value" :color="framework.color" height="8" rounded></v-progress-linear>
              </div>
            </v-card-text>
          </v-card>

          <!-- Хобби -->
          <!-- Хобби -->
<v-card class="hobbies-card mb-4 pa-4">
  <v-card-title>{{ hobbies.title }}</v-card-title>
  <v-card-text>
    <v-row class="d-flex flex-wrap" align="center">
      <v-col
        v-for="(hobby, index) in hobbies.list"
        :key="index"
        class="d-flex align-center"
        cols="auto"
      >
        <v-icon class="me-2">{{ hobby.icon }}</v-icon> 
      </v-col>
    </v-row>
  </v-card-text>
</v-card>


          <!-- Языки -->
          <v-card class="languages-card mb-4 pa-4">
            <v-card-title>{{ languages.title }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(language, index) in languages.list" :key="index">
                  <v-list-item-title>
                    <v-icon>{{ language.icon }}</v-icon> {{ language.name }} - {{ language.level }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>

        </v-col>

        <v-col cols="12" md="6" sm="12">
          <!-- Образование -->
          <v-card class="education-card mb-4 pa-4">
            <v-card-title>{{ education.title }}</v-card-title>
            <div v-for="(edu, index) in education.list" :key="index">
              <v-card-text>
                <span class="master-title">{{ edu.school }}</span>
                <p>{{ edu.degree }}</p>
                <p>{{ edu.description }}</p>
              </v-card-text>
            </div>
          </v-card>

          <!--Сертификаты-->
          <!-- <v-card class="certifications-card mb-4 pa-4">
            <v-card-title>{{ certifications.title }}</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(cert, index) in certifications.list" :key="index">
                  <v-list-item-title>{{ cert.name }} ({{ cert.year }})</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card> -->

          <!-- Опыт -->
          <v-card class="experience-card timeline mb-4 pa-4">
            <v-card-title>{{ experience.title }}</v-card-title>
            <v-card-text>
              <v-timeline align="start" dense>
                <v-timeline-item
                  v-for="(job, index) in experience.list"
                  :key="index"
                  dot-color="primary"
                  :icon="job.icon"
                  small
                >
                  <template v-slot:opposite>
                    <div class="pt-1 font-weight-bold">{{ job.duration }}</div>
                  </template>
                  <span class="master-title">{{ job.title }}</span> - <span class="slave-title">{{ job.company }}</span>
                  <ul>
                    <li v-for="(desc, i) in job.description.split('; ')" :key="i">{{ desc }}</li>
                  </ul>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import cvImage from '@/assets/cv1.jpg';
import html2pdf from 'html2pdf.js';

export default {
  data() {
    return {
      cvImageUrl: cvImage || 'https://VIA.placeholder.com/150',
      locales: localStorage.getItem('locale') || 'ua',
      isDark: false,
      isGeneratingPDF: false,
      profile: {},
      contact: {},
      objective: {},
      skills: {},
      hobbies: {},
      education: {},
      certifications: {},
      experience: {},
      languages: {},
    };
  },
  mounted() {
    this.$vuetify.theme.dark = this.isDark;
    this.updateData();
  },
  methods: {
    updateData() {
      this.profile = this.getProfileData();
      this.contact = this.getContactData();
      this.objective = this.getObjectiveData();
      this.skills = this.getSkillsData();
      this.hobbies = this.getHobbiesData();
      this.education = this.getEducationData();
      this.certifications = this.getCertificationsData();
      this.experience = this.getExperienceData();
      this.languages = this.getLanguagesData();
    },
    toggleLocale() {
      this.locales = this.locales === 'en' ? 'ua' : 'en';
      localStorage.setItem('locale', this.locales);
      this.updateData();
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      this.$vuetify.theme.dark = this.isDark;
      console.log(this.isDark);
    },
    async generatePDF() {
      try {
        this.isGeneratingPDF = true;
        const element = this.$refs.contentToPrint;
        await new Promise(resolve => setTimeout(resolve, 100));
        const options = {
          margin: [0.2, 0.2, 0.2, 0.2],
          filename: 'CV_Yatsko_Hryhorii.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        };
        await html2pdf().from(element).set(options).save();
      } catch (error) {
        console.error('Ошибка генерации PDF:', error);
        this.$vuetify.notify({ text: 'Не удалось сгенерировать PDF', type: 'error' });
      } finally {
        this.isGeneratingPDF = false;
      }
    },
    downloadJSON() {
      const resumeData = {
        profile: this.profile,
        contact: this.contact,
        objective: this.objective,
        skills: this.skills,
        hobbies: this.hobbies,
        education: this.education,
        certifications: this.certifications,
        experience: this.experience,
        languages: this.languages,
      };
      const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.json';
      link.click();
      URL.revokeObjectURL(url);
    },
    getProfileData() {
      return this.locales === 'en'
        ? { name: 'Yatsko Hryhorii', title: 'SysOps / Network Engineer' }
        : { name: 'Яцко Григорій', title: 'SysOps / Мережевий інженер' };
    },
    getContactData() {
      return this.locales === 'en'
        ? {
            title: 'Contact Information',
            email: 'frontyatsko@gmail.com',
            website: 'netmaestro.tech',
            phone: '+380976893545',
            telegram: 'NetSkiBike',
          }
        : {
            title: 'Контактна інформація',
            email: 'frontyatsko@gmail.com',
            website: 'netmaestro.tech',
            phone: '+380976893545',
            telegram: 'NetSkiBike',
          };
    },
    getObjectiveData() {
      return this.locales === 'en'
        ? {
            title: 'Objective',
            text: 'To leverage expertise in network optimization, automation, and monitoring to enhance infrastructure reliability and performance. Practice in a friendly team.',
          }
        : {
            title: 'Мета',
            text: 'Застосувати знання в оптимізації мереж, автоматизації та моніторингу для підвищення надійності інфраструктури. Працювати в дружньому колективі.',
          };
    },
    getSkillsData() {
      return this.locales === 'en'
        ? {
            titles: 'Networking & Tools',
            toolsList: {
              BGP: { name: 'BGP/OSPF', value: 85, color: '#1976D2' },
              Mikrotik: { name: 'Mikrotik/Cisco/Huawei', value: 80, color: '#42A5F5' },
              Ansible: { name: 'Ansible', value: 60, color: '#1976D2' },
              Python: { name: 'Python (Netmiko/NAPALM)', value: 70, color: '#42A5F5' },
              Zabbix: { name: 'Zabbix/Grafana', value: 65, color: '#1976D2' },
              UnixLinux: { name: 'Unix/Linux', value: 70, color: '#42A5F5' },
            },
            titlef: 'Frameworks & Automation',
            frameworksList: {
              Flask: { name: 'Flask', value: 75, color: '#1976D2' },
              FastAPI: { name: 'FastAPI', value: 70, color: '#42A5F5' },
              Vuejs: { name: 'Vue.js', value: 60, color: '#42A5F5' },
            },
          }
        : {
            titles: 'Мережі та інструменти',
            toolsList: {
              BGP: { name: 'BGP/OSPF', value: 85, color: '#1976D2' },
              Mikrotik: { name: 'Mikrotik/Cisco/Huawei', value: 80, color: '#42A5F5' },
              Ansible: { name: 'Ansible', value: 60, color: '#1976D2' },
              Python: { name: 'Python (Netmiko/NAPALM)', value: 70, color: '#42A5F5' },
              Zabbix: { name: 'Zabbix/Grafana', value: 65, color: '#1976D2' },
              UnixLinux: { name: 'Unix/Linux', value: 70, color: '#42A5F5' },
            },
            titlef: 'Фреймворки та автоматизація',
            frameworksList: {
              Flask: { name: 'Flask', value: 75, color: '#1976D2' },
              FastAPI: { name: 'FastAPI', value: 70, color: '#42A5F5' },
              Vuejs: { name: 'Vue.js', value: 60, color: '#42A5F5' },
            },
          };
    },
    getHobbiesData() {
      return this.locales === 'en'
        ? {
            title: 'Hobbies',
            list: [
              { name: 'Cycling tourism', icon: 'mdi-bike-fast' },
              { name: 'Basketball', icon: 'mdi-basketball-hoop-outline' },
              { name: 'Skiing', icon: 'mdi-ski' },
            ],
          }
        : {
            title: 'Хобі',
            list: [
              { name: 'Велотуризм', icon: 'mdi-bike-fast' },
              { name: 'Баскетбол', icon: 'mdi-basketball-hoop-outline' },
              { name: 'Гірські лижі', icon: 'mdi-ski' },
            ],
          };
    },
    getEducationData() {
      return this.locales === 'en'
        ? {
            title: 'Education',
            list: [
              {
                school: 'National Telecommunication University of Ukraine, Kyiv',
                degree: 'DevOps Engineer (Cloud)',
                description: 'Studied Internet of Things Technologies, Cloud Technologies (Huawei), VoIP Technology, Modeling Information Systems.',
              },
              {
                school: 'Kyiv Aviation Technical College',
                degree: 'Enterprise Economics',
                description: 'Studied theory of micro and macroeconomics.',
              },
            ],
          }
        : {
            title: 'Освіта',
            list: [
              {
                school: 'Державний університет телекомунікацій, Київ',
                degree: 'DevOps інженер (Хмарні технології)',
                description: 'Вивчав технології Інтернету речей, хмарні технології (Huawei), технології VoIP, моделювання інформаційних систем.',
              },
              {
                school: 'Київський авіаційний технікум',
                degree: 'Економіка підприємства',
                description: 'Вивчав теорію мікро- та макроекономіки.',
              },
            ],
          };
    },
    getCertificationsData() {
      return this.locales === 'en'
        ? {
            title: 'Certifications',
            list: [
              { name: 'Cisco CCNA', year: '2022' },
              { name: 'Mikrotik MTCNA', year: '2021' },
            ],
          }
        : {
            title: 'Сертифікати',
            list: [
              { name: 'Cisco CCNA', year: '2022' },
              { name: 'Mikrotik MTCNA', year: '2021' },
            ],
          };
    },
    getExperienceData() {
      return this.locales === 'en'
        ? {
            title: 'Experience',
            list: [
              {
                title: 'Network Engineer',
                icon: 'mdi-network',
                company: 'ISP "HAPPYLINK"',
                duration: '2024 - Present',
                description:
                  'Reduced network latency  through topology redesign; Having increased the operating time of the Internet channels to 99.5%; Optimized network architecture for scalability.',
              },
              {
                title: 'Network Engineer',
                icon: 'mdi-network',
                company: 'ISP "FORYOUNET"',
                duration: '2023 - 2024',
                description: 'Provided technical support; Created telegram bot for support; Configured monitoring systems.',
              },
              {
                title: 'Network Engineer',
                icon: 'mdi-network',
                company: '"WildcoreDMS"',
                duration: '2021 - Present',
                description: 'Generated ideas for network automation; Contributed to open-source monitoring tools; Tested new network configurations.',
              },
              {
                title: 'Network Engineer',
                icon: 'mdi-network',
                company: 'ISP "GOLDENNET"',
                duration: '2019 - 2023',
                description:
                  'Developed 10+ automation scripts, reducing configuration time; Configured networks with Mikrotik, Cisco, Huawei; Managed monitoring with Zabbix, Grafana, and Wireshark; Operated billing systems with Docker and Git.',
              },
              {
                title: 'Network Monitoring Engineer',
                icon: 'mdi-monitor',
                company: 'ISP "EUROLAN"',
                duration: '2017-2019',
                description:
                  'Monitored active equipment and services using SNMP, API; Configured DNS, DHCP, and RADIUS servers.',
              },
              {
                title: 'Fiber Optic Communication Line Specialist',
                icon: 'mdi-fiber-optic',
                company: 'ISP "TRIOLAN"',
                duration: '2015-2017',
                description:
                  'Built and repaired optical networks; Reduced downtime  through maintenance; Maintained electronic and optical installations.',
              },
            ],
          }
        : {
            title: 'Досвід роботи',
            list: [
              {
                title: 'Мережевий інженер',
                icon: 'mdi-network',
                company: 'ISP "HAPPYLINK"',
                duration: '2024 - Present',
                description:
                  'Зменшив затримку мережі шляхом редизайну топології; Підвищив час роботи обладнання до 99.5% завдяки резервуванню інтернет каналів; Оптимізував архітектуру мережі для масштабування.',
              },
              {
                title: 'Мережевий інженер',
                icon: 'mdi-network',
                company: 'ISP "FORYOUNET"',
                duration: '2023 - 2024',
                description: 'Надавав технічну підтримку; Розробив телеграм бота для підтримки; Налаштував системи моніторингу.',
              },
              {
                title: 'Мережевий інженер',
                icon: 'mdi-network',
                company: '"WildcoreDMS"',
                duration: '2021 - Present',
                description: 'Генерував ідеї для автоматизації мереж; Допомагав у розробці інструментів моніторингу; Тестував нові конфігурації мережі.',
              },
              {
                title: 'Мережевий інженер',
                icon: 'mdi-network',
                company: 'ISP "GOLDENNET"',
                duration: '2019 - 2023',
                description:
                  'Розробив 10+ скриптів автоматизації, скоротивши час налаштування; Налаштував мережі з Mikrotik, Cisco, Huawei; Керував моніторингом через Zabbix, Grafana, Wireshark; Обслуговував білінгові системи з Docker і Git.',
              },
              {
                title: 'Інженер моніторингу мережі',
                icon: 'mdi-monitor',
                company: 'ISP "EUROLAN"',
                duration: '2017-2019',
                description:
                  'Моніторинг активного обладнання та сервісів через SNMP, API;  Налаштував сервери DNS, DHCP, RADIUS.',
              },
              {
                title: 'Фахівець ліній волоконно-оптичного зв’язку',
                icon: 'mdi-fiber-optic',
                company: 'ISP "TRIOLAN"',
                duration: '2015-2017',
                description:
                  'Будував і ремонтував оптичні мережі; Зменшив простої завдяки профілактичному обслуговуванню; Обслуговував електронні та оптичні установки.',
              },
            ],
          };
    },
    getLanguagesData() {
      return this.locales === 'en'
        ? {
            title: 'Languages',
            list: [
              { name: 'EN', level: 'Pre-Intermediate', icon: 'mdi-google-translate' },
              { name: 'UA', level: 'Native', icon: 'mdi-google-translate' },
            ],
          }
        : {
            title: 'Мови',
            list: [
              { name: 'EN', level: 'Нижче середнього', icon: 'mdi-google-translate' },
              { name: 'UA', level: 'Рідна', icon: 'mdi-google-translate' },
            ],
          };
    },
  },
};
</script>

<style scoped>
.v-card {
  margin: 0px 8px 16px 8px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.v-card-title {
  font-size: 1.25rem;
  font-weight: 500;
}
.v-card-text {
  font-size: 0.875rem;
  line-height: 1.5;
}
.v-avatar {
  border: 2px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.v-timeline-item {
  margin-bottom: 16px;
}
.v-timeline-item__dot {
  background: #1976D2;
}
.master-title {
  font-weight: 600;
  color: #1976D2;
}
.slave-title {
  font-style: italic;
  color: #555;
}
@media print {
  .v-progress-linear {
    border: 1px solid #000 !important;
    background: #e0e0e0 !important;
  }
  .v-icon {
    display: none;
  }
  .v-btn {
    display: none;
  }
  .v-card {
    box-shadow: none;
    border: 1px solid #e0e0e0;
  }
}
</style>
