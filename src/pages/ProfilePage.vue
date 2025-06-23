<template>
  <q-page class="q-pa-lg bg-primary flex flex-center">
    <q-card class="q-pa-md bg-secondary text-white" style="width: 600px; border-radius: 18px">

      <div class="text-h5 text-weight-bold flex flex-center">My Profile</div>
      <div class="q-my-md flex flex-center items-center">
        <q-avatar size="80px">
          <img :src="user?.photo || defaultProfile" alt="Foto de perfil" />
        </q-avatar>
      </div>

      <div class="text-h5 flex flex-center">{{ user.name }}</div>
      <span class="flex flex-center">{{ user.email }}</span>
      <q-separator color="green-4" class="q-my-sm q-mx-md" />
      <div class="flex flex-center q-mb-xs">
        Created in: {{ formattedCreatedAt }}
      </div>
      <div class="flex flex-center q-mb-xs">
        Plan: {{ user.subscription }}
      </div>

      <q-separator color="green-4" class="q-my-sm q-mx-xl" />

      <div class="flex justify-center q-my-md q-gutter-sm">
        <q-btn
          color="green-4"
          icon="edit"
          label="Edit"
          @click="editMode = !editMode"
        />
        <q-btn
          color="negative"
          icon="delete"
          label="Delete"
          @click="confirmDelete = true"
        />
      </div>

      <q-dialog v-model="confirmDelete">
        <q-card>
          <q-card-section class="row items-center">
            <q-icon name="warning" color="negative" size="md" class="q-mr-sm" />
            <span>Are you sure you want to delete your account?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="negative" v-close-popup />
            <q-btn flat label="Yes, Delete" color="grey-6" @click="deleteAccount" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <div v-if="editMode">
        <q-tabs
          v-model="tab"
          dense
          class="text-white q-mt-sm q-mx-md"
          active-color="green-4"
          indicator-color="green-4"
        >
          <q-tab name="dados" label="Edit User" />
          <q-tab name="senha" label="Edit Password" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="bg-secondary text-white">

          <q-tab-panel name="dados">
            <q-input
              v-model="user.name"
              label="Name"
              class="bg-primary"
              input-class="text-black"
              label-color="black"
              color="green-6"
              filled
            /> 

            <q-input
              v-model="user.email"
              type="email"
              filled
              class="q-mt-sm bg-primary"
              input-class="text-black"
              label-color="black"
              color="green-6"
            /> 
          </q-tab-panel>

          <q-tab-panel name="senha">
            <q-input
              v-model="currentPassword" 
              label="Current password" 
              type="password" 
              filled 
              class="bg-primary"
              label-color="black"
              color="green-6"
            />
            <q-input 
              v-model="newPassword"
              label="New password"
              type="password"
              filled 
              class="bg-primary q-mt-sm"
              label-color="black"
              color="green-6"
            />
            <q-input 
              v-model="confirmPassword"
              label="Confirm new password"
              type="password"
              filled 
              class="bg-primary q-mt-sm"
              label-color="black"
              color="green-6"
            />
          </q-tab-panel>

        </q-tab-panels>
        <div class="q-mx-md">
          <q-btn color="green-4" class="q-my-sm full-width" 
            @click="tab === 'dados' ? saveChanges() : updatePassword()"
            :label="tab === 'dados' ? 'Save Changes' : 'Change Password'">
          </q-btn>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { fetchPrivateUser, updateUserProfile, updateUserPassword, deleteAccount } from '../api/auth.js';
import { Notify } from 'quasar';
import defaultProfile from '../assets/userProfile.png';

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        name: '',
        email: '',
        photo: '',
        createdAt: '',
        subscription: '',
      },
      editPhoto: false,
      newPhotoUrl: '',
      currentPassword: '',
      newPassword: '',
      defaultProfile,
      tab: 'dados',
      editMode: false,
      confirmDelete: false,
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
      if (!this.validateEmail(this.user.email)) {
        this.$q.notify({
          type: 'negative',
          message: 'Invalid email address.'
        })
        return 
      }
      try {
        await updateUserProfile({
          name: this.sanitize(this.user.name),
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
      } finally {
        this.editMode = false;
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
      } finally {
        this.editMode = false;
      }
    },
    async deleteAccount() {
      try {
        await deleteAccount();
        Notify.create({ type: 'positive', message: 'Account deleted successfully!' });
        this.$router.push({ name: 'LoginPage' });
      } catch (error) {
        console.error('Erro ao excluir conta:', error);
        this.$q.notify({
          type: 'negative',
          message: error.response?.data?.message || 'Failed to delete account.'
        });
      } finally {
        this.confirmDelete = false;
      }
    },
    sanitize(input) {
      return input.replace(/<[^>]*>?/gm, '');
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },
  },
  computed: {
    formattedCreatedAt() {
      if (!this.user?.createdAt) return '-';
      return new Date(this.user.createdAt).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}
</style>
