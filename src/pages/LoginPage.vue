<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px">
      <q-tabs v-model="tab" dense class="text-primary">
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Registro" />
      </q-tabs>
      
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <q-form @submit.prevent="onLogin">
            <q-input v-model="login.email" label="Email" type="email" outlined class="q-mb-md" />
            <q-input v-model="login.password" label="Senha" type="password" outlined class="q-mb-md" />
            <q-btn type="submit" label="Entrar" color="primary" class="full-width" />
          </q-form>
        </q-tab-panel>
        
        <q-tab-panel name="register">
          <q-form @submit.prevent="onRegister">
            <q-input v-model="register.name" label="Nome" outlined class="q-mb-md" />
            <q-input v-model="register.email" label="Email" type="email" outlined class="q-mb-md" />
            <q-input v-model="register.password" label="Senha" type="password" outlined class="q-mb-md" />
            <q-input v-model="register.confirmPassword" label="Confirmar Senha" type="password" outlined class="q-mb-md" />
            <q-btn type="submit" label="Registrar" color="primary" class="full-width" />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      tab: 'login',
      login: {
        email: '',
        password: ''
      },
      register: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  methods: {
    onLogin() {
      this.$router.push({ name: 'IndexPage' });
      console.log("Login", this.login);
    },
    onRegister() {
      console.log("Registro", this.register);
    }
  }
};
</script>
