<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
    <div class="max-w-3xl w-full bg-white rounded-lg shadow-xl p-6">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-semibold text-indigo-600">Welcome to Your Dashboard</h2>
        <p class="text-lg text-gray-600">You are now logged in! Explore your dashboard.</p>
      </div>

      <!-- Dashboard Content -->
      <div class="space-y-6">
        <div class="bg-indigo-100 p-4 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold text-indigo-600">Your Profile</h3>
          <p class="text-gray-700">Manage your profile and settings here.</p>
        </div>
        
        <div class="bg-indigo-100 p-4 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold text-indigo-600">Statistics</h3>
          <p class="text-gray-700">Here you can see the summary of your activity.</p>
        </div>

        <!-- Logout Button -->
        <div class="flex justify-center">
          <button
            @click="logout"
            class="mt-6 py-2 px-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token'); // Remove token for logout
      this.$router.push('/login'); // Redirect to login page after logout
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS handles most styling */
</style>
