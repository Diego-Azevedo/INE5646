<template>
  <q-page class="q-pa-lg bg-primary flex flex-center">
    <q-card class="q-pa-md bg-secondary" style="width: 600px; border-radius: 18px">

      <div class="text-h5 text-green-4 flex flex-center">My Profile</div>

      <!-- Foto de Perfil -->
      <div class="q-my-md flex flex-center items-center">
        <q-avatar size="80px">
          <img :src="user?.photo || defaultProfile" alt="Foto de perfil" />
        </q-avatar>
      </div>

      <div class="text-h5 text-green-4 flex flex-center">{{ user.name }}</div>
      <span class="text-green-4 flex flex-center">{{ user.email }}</span>

      <q-separator color="green-4" class="q-my-sm q-mx-xl" />

      <div class="text-h5 q-mt-xl flex flex-center text-grey-8">Edit Area</div>

      <!-- Tabs -->
      <q-tabs
        v-model="tab"
        dense
        class="text-white q-mt-sm q-mx-sm"
        active-color="green-4"
        indicator-color="green-4"
      >
        <q-tab name="dados" label="Dados Básicos" />
        <q-tab name="senha" label="Senha" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-primary text-white q-mx-sm">

        <!-- Tab: Dados Básicos -->
        <q-tab-panel name="dados">
          <q-input
            v-model="user.name"
            label="Name"
            class="q-mt-md bg-primary"
            input-class="text-white"
            label-color="grey-8"
            color="grey-8"
            filled
          /> 

          <q-input
            v-model="user.email"
            label="Email"
            filled
            class="q-mt-md bg-primary"
            input-class="text-white"
            label-color="grey-8"
            color="grey-8"
          /> 
        </q-tab-panel>

        <!-- Tab: Senha -->
        <q-tab-panel name="senha">
          <q-input
            v-model="currentPassword" 
            label="Current password" 
            type="password" 
            filled 
            class="bg-primary q-mt-md"
            label-color="grey-5"
            color="grey-8"
          />
          <q-input 
            v-model="newPassword"
            label="New password"
            type="password"
            filled 
            class="bg-primary q-mt-md"
            label-color="grey-5"
            color="grey-8"
          />
          <q-input 
            v-model="confirmPassword"
            label="Confirm new password"
            type="password"
            filled 
            class="bg-primary q-mt-md"
            label-color="grey-5"
            color="grey-8"
          />
        </q-tab-panel>

      </q-tab-panels>

      <q-btn color="green-4" class="q-mt-lg q-mx-sm flex flex-center" 
        @click="tab === 'dados' ? saveChanges() : updatePassword()"
        :label="tab === 'dados' ? 'Save Changes' : 'Change Password'">
      </q-btn>

    </q-card>
  </q-page>
</template>

<script>
import { fetchPrivateUser, updateUserProfile, updateUserPassword } from '../api/auth.js';
import { Notify } from 'quasar';
import defaultProfile from '../assets/userProfile.png';

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        name: '',
        email: '',
        photo: ''
      },
      editPhoto: false,
      newPhotoUrl: '',
      currentPassword: '',
      newPassword: '',
      defaultProfile,
      tab: 'dados',
    };
  },
  async mounted() {
    try {
      const res = await fetchPrivateUser();
      this.user = res.data.user;
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
      Notify.create({
        type: 'negative',
        message: 'Erro ao carregar perfil. Faça login novamente.'
      });
      this.$router.push({ name: 'LoginPage' });
    }
  },
  methods: {
    async saveChanges() {
      try {
        await updateUserProfile({
          name: this.user.name,
          email: this.user.email,
        });
        Notify.create({ type: 'positive', message: 'User profile update successfully!' });
        this.$router.push({ name: 'ProfilePage' });
      } catch (error) {
        console.error('Erro ao salvar perfil:', error);
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'User profile update failed.'
        });
      }
    },
    async updatePassword() {
      try {
        await updateUserPassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword
        });
        Notify.create({ type: 'positive', message: 'Password update successfully!' });
        this.currentPassword = '';
        this.newPassword = '';
      } catch (error) {
        console.error('Erro ao alterar senha:', error);
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Password update failed.'
        });
      }
    }
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
</style>
