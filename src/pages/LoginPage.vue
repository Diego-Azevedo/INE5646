<template>
  <q-page class="flex flex-center bg-primary text-white">
    <q-card
      class="q-mx-lg bg-secondary text-white shadow-10"
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
        JsonConvert
      </div>

      <q-slide-transition>
        <div v-show="isLogin" key="login" class="q-ma-lg">
          <q-form @submit.prevent="onLogin">
            <span>Email address</span>
            <q-input
              v-model="login.email"
              type="email"
              outlined
              dense
              class="q-mb-md bg-primary"
              color="grey-8"
            />
            <span>Password</span>
            <q-input
              v-model="login.password"
              type="password"
              outlined
              dense
              class="q-mb-lg bg-primary"
              color="grey-8"
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
        <div v-show="!isLogin" key="register" class="q-ma-lg">
          <q-form @submit.prevent="onRegister">
            <span>Name</span>
            <q-input
              v-model="register.name"
              outlined
              dense
              class="q-mb-md bg-primary borderless"
              color="grey-8"
            />
            <span>Email</span>
            <q-input
              v-model="register.email"
              type="email"
              outlined
              dense
              class="q-mb-md bg-primary"
              color="grey-8"
            />
            <span>Password</span>
            <q-input
              v-model="register.password"
              type="password"
              outlined
              dense
              class="q-mb-md bg-primary"
              color="grey-8"
            />
            <span>Confirm Password</span>
            <q-input
              v-model="register.confirmpassword"
              type="password"
              outlined
              dense
              class="q-mb-lg bg-primary"
              color="grey-8"
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
import { loginUser, registerUser, logoutUser} from '../api/auth';
export default {
  created() {
    logoutUser();
  },
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
        confirmpassword: ''
      }
    };
  },
  methods: {
    sanitize(input) {
      return input.replace(/<[^>]*>?/gm, '');
    },
    async onLogin() {
      try {
        await loginUser(this.login);
        this.$router.push({ name: 'IndexPage' });
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Register error'
        });
      }
    },
    async onRegister() {
      try {
        this.register.name = this.sanitize(this.register.name);
        const response = await registerUser(this.register);
        this.$q.notify({
          type: 'positive',
          message: response?.data?.message || 'You have registered!'
        });
        this.isLogin = true;
      } catch (error) {
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Register error'
        });
      }
    }
  }
};
</script>
