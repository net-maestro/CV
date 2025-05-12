<template>
  <v-container>
    <v-row>
    {{ contact.ip }} <IpInfo />
    <v-col cols="12" class="text-right">
        <v-btn  @click="toggleLocale">
          {{ locales === 'en' ? 'UA' : 'EN' }}
        </v-btn>
        <v-btn  @click="generatePDF">PDF</v-btn>
      </v-col>
    </v-row>
  </v-container>

   <div ref="contentToPrint">
  <v-container  :fluid="$vuetify.display.smAndDown">
    <v-row no-gutters>
      

      <v-col
        cols="12"
        md="6"
        sm="12"
        class="align-center"
      >

      <v-col cols="12">
        <v-card class="profile-card">
          <v-card-title>{{ profile.name }}</v-card-title>
          <v-card-subtitle class="profile-card-title">{{ profile.title }}</v-card-subtitle>
          <v-avatar
                    class="ma-3"
                    rounded="1"
                    size="220"
                  >
                    <v-img :src="cvImageUrl" alt="My Image"></v-img>
                  </v-avatar>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="contact-card">
          <v-card-title>{{ contact.title }}</v-card-title>
          <v-card-text>
            <div><v-icon>mdi-email-outline</v-icon> | <a :href="`mailto:${contact.email}`">{{ contact.email }}</a></div>
            <div><v-icon>mdi-web</v-icon> | <a :href="`https://${contact.website}`">{{ contact.website }}</a> | code: {{ contact.entrycode }}</div>
            <div><v-icon>mdi-phone</v-icon> | <a :href="`tel:${ contact.phone.link }`" >{{ contact.phone.name }}</a></div>
            <div><v-icon>mdi-send</v-icon> | <a :href="`${contact.telegram.link }`" target="_blank" :title="`${ contact.telegram.name }`"><i class="fa fa-telegram"></i>{{ contact.telegram.name }}</a></div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="objective-card">
          <v-card-title>{{ objective.title }}</v-card-title>
          <v-card-text>{{ objective.text }}</v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="skills-card">
          <v-card-title>{{ skills.titles }}</v-card-title>
          <v-card-text>
            <div v-for="(tool, key) in skills.toolsList" :key="key">
              <strong>{{ tool.name }} - {{ tool.value }}%</strong>
              <v-progress-linear v-model="tool.value" :value="tool.value" :color="tool.color"></v-progress-linear>
            </div>
          </v-card-text>
            <v-card-title>{{ skills.titlef }}</v-card-title>
          <v-card-text>
            <div v-for="(framework, key) in skills.frameworksList" :key="key">
              <strong>{{ framework.name }} - {{ framework.value }}%</strong>
              <v-progress-linear v-model="framework.value" :value="framework.value" :color="framework.color"></v-progress-linear>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card class="hobbies-card">
          <v-card-title>{{ hobbies.title }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(hobby, index) in hobbies.list" :key="index">
              <v-list-item-title >  <v-icon>{{ hobby.icon}}</v-icon> {{ hobby.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      </v-col>

      <v-col
        cols="12"
        md="6"
        sm="12"
      >

      <v-col cols="12">
        <v-card class="education-card timeline" >
          <v-card-title>{{ education.title }}</v-card-title>
          <div v-for="(education, index) in education.list" :key="index">
          <v-card-text>
            <span class="master-title" >{{ education.school }}</span>
            <p>{{ education.degree }}</p>
            <p>{{ education.description }}</p>
          </v-card-text>
        </div>
        </v-card>
      </v-col>

      <v-col cols="12">
  <v-card class="experience-card timeline">
    <v-card-title>{{ experience.title }}</v-card-title>
    <v-card-text>
      <v-timeline align="start" dense>
        <v-timeline-item
          v-for="(job, index) in experience.list"
          :key="index"
          dot-color="blue"
          :icon="job.icon"
          small
        >
        <template v-slot:opposite>
          <div class="pt-1 headline font-weight-bold" v-text="job.duration"></div> 
        </template>

          <span class="master-title">{{ job.title }}</span> - 
          <span class="slave-title">{{ job.company }}</span>
        
          <div>{{ job.description }}</div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</v-col>


      <v-col cols="12">
        <v-card class="languages-card">
          <v-card-title>{{ languages.title }}</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(language, index) in languages.list" :key="index">
                <v-list-item-title> <v-icon>{{ language.icon }}</v-icon> {{ language.name }} - {{ language.level }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      </v-col>
    </v-row>
  </v-container>
</div>
</template>
  
  <script>
  import cvImage from '@/assets/cv1.jpg';
  import html2pdf from 'html2pdf.js';
  import IpInfo from '@/components/IpInfo.vue';
  export default {
    components: {
    IpInfo,
  },
    data() {
      return {
        cvImageUrl: cvImage,
        locales: '', 
        profile: this.getProfileData(),
        contact: this.getContactData(),
        objective: this.getObjectiveData(),
        skills: this.getSkillsData(),
        hobbies: this.getHobbiesData(),
        education: this.getEducationData(),
        experience: this.getExperienceData(),
        languages: this.getLanguagesData()
      };
    },
    mounted(){
      this.locales = 'ua'; 
      this.profile = this.getProfileData();
      this.contact = this.getContactData();
      this.objective = this.getObjectiveData();
      this.skills = this.getSkillsData();
      this.hobbies = this.getHobbiesData();
      this.education = this.getEducationData();
      this.experience = this.getExperienceData();
      this.languages = this.getLanguagesData();
    },
    methods: {
      async generatePDF() {
      console.log('PDF')  
      const element = this.$refs.contentToPrint;
       // Подождите, пока содержимое будет отрисовано
       await new Promise(resolve => setTimeout(resolve, 100));

      const options = {
        margin: [0.2, 0.2, 0.2, 0.2],
        filename: 'CV_Yatsko_Hryhorii.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        // jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      await html2pdf().from(element).set(options).save();
    },
      toggleLocale() {
      this.locales = this.locales === 'en' ? 'ua' : 'en';
      this.profile = this.getProfileData();
      this.contact = this.getContactData();
      this.objective = this.getObjectiveData();
      this.skills = this.getSkillsData();
      this.hobbies = this.getHobbiesData();
      this.education = this.getEducationData();
      this.experience = this.getExperienceData();
      this.languages = this.getLanguagesData();
    },
      getProfileData() {
        return this.locales === 'en'
          ? { name: 'Yatsko Hryhorii', title: 'SysOps / Network Engineer' }
          : { name: 'Яцко Григорій', title: 'SysOps / Network Engineer' };
      },
      getContactData() {
        return this.locales === 'en'
          ? { title: 'Contact Information', email: 'frontyatsko@gmail.com', website: 'netmaestro.tech', entrycode: '3636',  ip: 'You logged in via :', phone: {name: '+38 097 689 35 45', link: '0976893545'}, telegram: {name: '@NetSkiBike', link: 'https://t.me/NetSkiBike'} }
          : { title: 'Контактна інформація', email: 'frontyatsko@gmail.com', website: 'netmaestro.tech', entrycode: '3636', ip: 'Ви зайшли з :', phone: {name: '+38 097 689 35 45', link: '0976893545'}, telegram: {name: '@NetSkiBike', link: 'https://t.me/NetSkiBike'} };
      },
      getObjectiveData() {
        return this.locales === 'en'
          ? { title: 'Objective', text: 'Find a job that will bring you satisfaction. Work in a team of like-minded people, where there is an opportunity to apply knowledge and acquire new ones.' }
          : { title: 'Мета', text: 'Знайти роботу, яка приноситиме задоволення. Працювати в команді однодумців, де є можливість застосувати знання та набути нових.' };
      },
      getSkillsData() {
        return this.locales === 'en'
          ? {
              titles: 'Tools',
              toolsList: {
                UnixLinux: { name: 'Unix/Linux', value: 70, color: 'blue' },
                Network: { name: 'Network', value: 80, color: 'green' },
                Python: { name: 'Python', value: 70, color: 'steelblee' },
                Ansible: { name: 'Ansible', value: 60, color: 'steelblee' },
                Napalm: { name: 'Napalm', value: 60, color: 'steelblee' },
                MySQL: { name: 'MySQL', value: 60, color: 'brown' },
                Bash: { name: 'Bash', value: 55, color: 'orange' },
                HTML: { name: 'HTML', value: 70, color: 'red' },
                CSS: { name: 'CSS', value: 60, color: 'purple', },
                JavaScript: { name: 'JavaScript', value: 50, color: 'teal' }
               
              },
              titlef: 'Frameworks',
              frameworksList: {
                Flask: { name: 'Flask', value: 75, color: 'blue' },
                FastAPI: { name: 'FastAPI', value: 70, color: 'green' },
                Django: { name: 'Django', value: 50, color: 'yellow' },
                Vuejs: { name: 'Vue.js', value: 60, color: 'orange' }
              }
            }
          : {
              titles: 'Інструменти',
              toolsList: {
                UnixLinux: { name: 'Unix/Linux', value: 70, color: 'blue'},
                Network: { name: 'Network', value: 80, color: 'green' },
                Python: { name: 'Python', value: 70, color: 'steelblee' },
                Ansible: { name: 'Ansible', value: 60, color: 'steelblee' },
                Napalm: { name: 'Napalm', value: 60, color: 'steelblee' },
                MySQL: { name: 'MySQL', value: 60, color: 'brown' },
                Bash: { name: 'Bash', value: 55, color: 'orange' },
                HTML: { name: 'HTML', value: 70, color: 'red' },
                CSS: { name: 'CSS', value: 60, color: 'purple' },
                JavaScript: { name: 'JavaScript', value: 50, color: 'teal' }
                
              },
              titlef: 'Фреймворки',
              frameworksList: {
                Flask: { name: 'Flask', value: 75, color: 'blue' },
                FastAPI: { name: 'FastAPI', value: 70, color: 'green' },
                Django: { name: 'Django', value: 50, color: 'yellow' },
                Vuejs: { name: 'Vue.js', value: 60, color: 'orange' }
              }
            };
      },
      getHobbiesData() {
        return this.locales === 'en'
          ? { title: 'Hobbies', list: [{name: 'Cycling tourism', icon: 'mdi-bike-fast'}, {name: 'Basketball', icon: 'mdi-basketball-hoop-outline'}, { name: 'Skiing', icon: 'mdi-ski'}] }
          : { title: 'Хобі', list: [{name: 'Велотуризм', icon: 'mdi-bike-fast'}, {name: 'Баскетбол', icon: 'mdi-basketball-hoop-outline'}, { name: 'Гірські лижі', icon: 'mdi-ski'}] };
      },
      getEducationData() {
        return this.locales === 'en'
          ?{title: 'Education',
            list: [
          {  school: 'National Telecomunication University of Ukraine Kyiv', degree: 'DevOps Engeneer (Cloud)', description: '«Internet of Things Technologies»,«Cloud technologies (huawei)»,«VoIP technology» ,«Modeling information systems».' },
          {  school: 'Kyiv Aviation Technical College', degree: 'Enterprise Economics', description: 'Theory of micro and macroeconomics.' } ] }
          : { 
            title: 'Освіта', 
            list: [
          { school: 'ДЕРЖАВНИЙ УНІВЕРСИТЕТ ТЕЛЕКОМУНІКАЦІЙ', degree: 'DevOps Engeneer (Cloud)', description: '«Технології Інтернету речей»,«Хмарні технології (huawei)", "Технологія VoIP», «Моделювання інформаційних систем».' },
          { school: 'КИЇВСЬКИЙ АВІАЦІЙНИЙ ТЕХНІКУМ', degree: 'Економіка підприємства', description: 'Теорія мікро та макро економіки.' }
        ]};
      },
      getExperienceData() {
        return this.locales === 'en'
          ? {
              title: 'Experience',
              list: [
                { title: 'Network Engineer', icon: 'mdi-basketball', company: 'ISP "HAPPYLINK"', duration: '2023 - Present', description: 'Optimization of network architecture, redesign and improvement of network topology, server upgrades' },
                { title: 'Network Engineer', icon: 'mdi-basketball', company: 'ISP "FORYOUNET"', duration: '2023 - 2024', description: 'Technical support.' },
                { title: 'Network Engineer', icon: 'mdi-basketball', company: '"WildcoreDMS"', duration: '2021 - Present', description: 'Idea generator' },
                {
                  title: 'Network Engineer',
                  icon: 'mdi-basketball',
                  company: 'ISP "GOLDENNET"',
                  duration: '2019 - 2023',
                  description: 'Planning and configuring computer networks. Development and operation of billing systems. Writing scripts. Mikrotik, Juniper, Dlink, Huawei, Cisco, Bdcom, C-Data, Zyxel, Edge-Core, HPE, Dell, Ubiquiti, Hikvision, Dahua, Hyper-V / VMware, Wireshark, Zabbix, Observium, Librenms, Grafana, VSCode, Postman, Navicat, Freepbx, Docker, Graylog, Git.'
                },
                {
                  title: 'Network Monitoring Engineer',
                  icon: 'mdi-basketball',
                  company: 'ISP "EUROLAN"',
                  duration: '2017-2019',
                  description: 'Network monitoring: active equipment, servers, services. OSI, TCP, UDP, Ethernet, ARP, IP, ICMP, NAT, Routing, VPN, BGP, OSPF, SNMP, POP, IMAP, HTTP(s), Telnet, SSH, DNS, DHCP, RADIUS.'
                },
                {
                  title: 'Fiber Optic Communication Line Specialist',
                  icon: 'mdi-basketball',
                  company: 'ISP "TRIOLAN"',
                  duration: '2015-2017',
                  description: 'Repair and construction of new optical internet networks. Technical maintenance of electronic and optical installations.'
                }
              ]
            }
          : {
              title: 'Досвід роботи',
              list: [
              { title: 'Мережевий Інженер', icon: 'mdi-basketball', company: 'ISP "HAPPYLINK"', duration: '2024 - Present', description: 'Оптимізація архітектури інтернет-мережі, редизайн і покращення топології мережі, оновлення серверів' },
              { title: 'Мережевий Інженер', icon: 'mdi-basketball', company: 'ISP "FORYOUNET"', duration: '2023 - 2024', description: 'Техпідтримка.' },
              { title: 'Network Engineer', icon: 'mdi-basketball', company: '"WildcoreDMS"', duration: '2021 - Present', description: 'Генератор ідей' },
                {
                  title: 'Мережевий Інженер',
                  icon: 'mdi-basketball',
                  company: 'ISP "GOLDENNET"',
                  duration: '2019 - 2023',
                  description: 'Планування та налаштування комп\'ютерних мереж. Розробка та експлуатація білінгових систем. Написання Скриптів. Mikrotik, Juniper, Dlink, Huawei, Cisco, Bdcom, C-Data, Zyxel, Edge-Core, HPE, Dell, Ubiquiti, Hikvision, Dahua, Hyper-V / VMware, Wireshark, Zabbix, Observium, Librenms, Grafana, VSCode, Postman, Navicat, Freepbx, Docker, Graylog, Git.'
                },
                {
                  title: 'Інженер Моніторингу Мережі',
                  icon: 'mdi-basketball',
                  company: 'ISP "EUROLAN"',
                  duration: '2017-2019',
                  description: 'Моніторинг роботи мережі: активне обладнання, сервери, сервіси. OSI, TCP, UDP, Ethernet, ARP, IP, ICMP, NAT, Routing, VPN, BGP, OSPF, SNMP, POP, IMAP, HTTP(s), Telnet, SSH, DNS, DHCP, RADIUS.'
                },
                {
                  title: 'Фахівець Ліній Волоконно-Оптичного Зв\'язку',
                  icon: 'mdi-basketball',
                  company: 'ISP "TRIOLAN"',
                  duration: '2015-2017',
                  description: 'Ремонт та будівництво нових мереж оптичного інтернету. Технічне обслуговування електронних та оптичних установок.'
                }
              ]
            };
      },
      getLanguagesData() {
        return this.locales === 'en'
          ? {
              title: 'Languages',
              list: [
                { name: 'English', level: 'Pre Intermediate', icon: 'mdi-google-translate'},
                { name: 'Ukrainian', level: 'Native', icon: 'mdi-google-translate' }
              ]
            }
          : {
              title: 'Мови',
              list: [
                { name: 'Англійська', level: 'Pre Intermediate', icon: 'mdi-google-translate' },
                { name: 'Українська', level: 'Рідна', icon: 'mdi-google-translate' }
              ]
            };
      }
    }
  };
  </script>
  
  
  <style scoped>

</style>
  