<template>
    <v-container class="d-flex flex-column align-center justify-center fill-height">
      <v-card v-if="!isAuthenticated">
        <v-card-title>Введіть код доступу</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="code"
            label="Код"
            outlined
            clearable
            :error="!!errorMessage"
          ></v-text-field>
          <v-alert v-if="errorMessage" type="error" class="mt-3">
            {{ errorMessage }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-btn block  append-icon="mdi-account-circle" @click="checkCode" color="primary">
            Увійти
            <template v-slot:append>
        <v-icon color="light-blue-darken-4"></v-icon>
      </template>
        </v-btn>
        </v-card-actions>
      </v-card>
      <div v-else>
          <Resume />
      </div>
    </v-container>
  </template>
  
  <script>
  import Resume from '@/components/Resume.vue';
  export default {
    components: {
        Resume
    },
    data() {
      return {
        code: '',
        validCode: '3636', // Правильний код
        errorMessage: '',
        isAuthenticated: false, // Флаг для отображения компонента
      };
    },
    methods: {
      checkCode() {
        if (this.code === this.validCode) {
          this.isAuthenticated = true;
        } else {
          this.errorMessage = 'Невірний код. Спробуйте ще раз.';
        }
      },
    },
  };
  </script>
  