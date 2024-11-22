<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center">
      <p>Loading profile...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>
    </div>
    <div v-else class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 class="text-2xl font-bold mb-4">User Profile</h2>
      <form @submit.prevent="updateProfile">
        <div class="space-y-2">
          <label for="name" class="block text-gray-700">Full Name</label>
          <input v-model="profile.name" type="text" id="name" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div class="space-y-2">
          <label for="email" class="block text-gray-700">Email</label>
          <input v-model="profile.email" type="email" id="email" readonly class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100" />
        </div>
        <div class="space-y-2">
          <label for="phone" class="block text-gray-700">Phone</label>
          <input v-model="profile.phone" type="text" id="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
        </div>
        <div class="space-y-2">
          <label for="address" class="block text-gray-700">Address</label>
          <textarea v-model="profile.address" id="address" class="w-full px-4 py-2 border border-gray-300 rounded-lg"></textarea>
        </div>
        <div class="mt-4 flex space-x-2">
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Update Profile</button>
          <button @click.prevent="deleteProfile" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete Profile</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../api';

export default {
  data() {
    return {
      profile: null,
      loading: true,
      error: null,
    };
  },
  
  // Ambil userId dari route params atau Vuex store
async created() {
  const userId = this.$route.params.userId; // Jika Anda menggunakan vue-router dan ID ada di URL
  try {
    this.profile = await getUserProfile(userId);
    this.loading = false;
  } catch (error) {
    this.error = 'Failed to load profile';
    this.loading = false;
  }
},
  methods: {
    async updateProfile() {
      try {
        await updateUserProfile(this.profile._id, this.profile);
        alert('Profile updated successfully');
      } catch (error) {
        this.error = 'Failed to update profile';
      }
    },
    async deleteProfile() {
      if (confirm('Are you sure you want to delete this profile?')) {
        try {
          await deleteUserProfile(this.profile._id);
          alert('Profile deleted successfully');
          this.profile = null; // Kosongkan data profile setelah dihapus
        } catch (error) {
          this.error = 'Failed to delete profile';
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
