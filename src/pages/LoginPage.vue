<template>
  <q-page class="flex flex-center bg-primary text-white">
    <q-card
      class="responsive-container q-mx-lg bg-secondary text-white shadow-10"
      style="width: 400px; border-radius: 18px"
    >
      <div class="flex flex-center q-mb-md">
        <img
          src="../../public/icons/jsonConvert51.svg"
          alt="JsonConvert51 Logo"
          width="48"
          height="48"
        />
      </div>

      <div class="text-center text-h6 text-weight-bold q-mb-md">
        JsonConvert51
      </div>

      <q-slide-transition>
        <div v-show="isLogin" key="login">
          <q-form @submit.prevent="onLogin">
            <span>Email address</span>
            <q-input
              v-model="login.email"
              type="email"
              outlined
              dense
              class="q-mb-md bg-primary"
            />
            <span>Password</span>
            <q-input
              v-model="login.password"
              type="password"
              outlined
              dense
              class="q-mb-lg bg-primary"
            />
            <q-btn
              type="submit"
              label="Login"
              color="green-4"
              class="full-width q-mb-md"
              unelevated
            />
          </q-form>
          <div class="text-caption text-center">
            <span>Don't have an account? </span>
            <q-btn
              flat
              label="Register"
              class="text-green-4"
              @click="isLogin = false"
            />
          </div>
        </div>
      </q-slide-transition>

      <q-slide-transition>
        <div v-show="!isLogin" key="register">
          <q-form @submit.prevent="onRegister">
            <span>Name</span>
            <q-input
              v-model="register.name"
              outlined
              dense
              class="q-mb-md bg-primary borderless"
            />
            <span>Email</span>
            <q-input
              v-model="register.email"
              type="email"
              outlined
              dense
              class="q-mb-md bg-primary"
            />
            <span>Password</span>
            <q-input
              v-model="register.password"
              type="password"
              outlined
              dense
              class="q-mb-md bg-primary"
            />
            <span>Confirm Password</span>
            <q-input
              v-model="register.confirmPassword"
              type="password"
              outlined
              dense
              class="q-mb-lg bg-primary"
            />
            <q-btn
              type="submit"
              label="Register"
              color="green-4"
              class="full-width q-mb-md"
              unelevated
            />
          </q-form>
          <div class="text-caption text-center">
            <span>Already have an account? </span>
            <q-btn
              flat
              label="Login"
              class="text-green-4"
              @click="isLogin = true"
            />
          </div>
        </div>
      </q-slide-transition>
    </q-card>
  </q-page>
</template>

<script>
export default {
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
      // Lógica de login
      this.$router.push({ name: 'IndexPage' });
    },
    onRegister() {
      // Lógica de registro
      this.$router.push({ name: 'IndexPage' });
    }
  }
};
</script>
