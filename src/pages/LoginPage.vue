<template>
  <q-page class="flex flex-center bg-primary text-white">
    <q-card class="q-pa-xl bg-secondary text-white shadow-10" style="width: 400px; border-radius: 18px">
      
      <div class="flex flex-center q-mb-md">
        <img src="../../public/icons/jsonConvert51.svg" alt="JsonConvert51 Logo" width="48" height="48" />
      </div>

      <div class="text-center text-h6 text-weight-bold q-mb-lg">JsonConvert51</div>

      <div v-if="isLogin">
        <q-form @submit.prevent="onLogin">
          <span>Email addres</span>
          <q-input v-model="login.email" type="email" outlined dense class="q-mb-md bg-primary"/>
          <span>Password</span>
          <q-input v-model="login.password" type="password" outlined dense class="q-mb-lg bg-primary"/>
          <q-btn type="submit" label="Login" color="green-4" class="full-width q-mb-md" unelevated />
        </q-form>
        <div class="text-caption text-center">
          <span>Don't have an account? </span>
          <q-btn flat label="Register" class="text-green-4" @click="isLogin = false" />
        </div>
      </div>

      <div v-else>
        <q-form @submit.prevent="onRegister">
          <span>Name</span>
          <q-input v-model="register.name" outlined dense class="q-mb-md bg-primary borderless"/>
          <span>Email</span>
          <q-input v-model="register.email" type="email" outlined dense class="q-mb-md bg-primary"/>
          <span>Password</span>
          <q-input v-model="register.password" type="password" outlined dense class="q-mb-md bg-primary"/>
          <span>Confirm Password</span>
          <q-input v-model="register.confirmPassword" type="password" outlined dense class="q-mb-lg bg-primary"/>
          <q-btn type="submit" label="Register" color="green-4" class="full-width q-mb-md" unelevated />
        </q-form>
        <div class="text-caption text-center">
          <span>Already have an account? </span>
          <q-btn flat label="Login" class="text-green-4" @click="isLogin = true" />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      isLogin: true,
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
      console.log("Login:", this.login);
      this.$router.push({ name: 'IndexPage' });
    },
    onRegister() {
      console.log("Registro:", this.register);
    }
  }
};
</script>
