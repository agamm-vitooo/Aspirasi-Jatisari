<template>
  <div class="w-full max-w-2xl mx-auto p-4 space-y-6">
    <!-- Success Alert -->
    <div v-if="showSuccess" 
         class="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 transition-all duration-300">
      <p class="text-green-700">Profile updated successfully!</p>
    </div>

    <!-- Main Card -->
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center space-x-4">
          <!-- Profile Picture -->
          <div class="relative">
            <div class="h-20 w-20 rounded-full bg-gray-100 overflow-hidden">
              <img 
                :src="profileImage || '/api/placeholder/150/150'" 
                :alt="form.name"
                class="h-full w-full object-cover"
              />
            </div>
            <button 
              class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors duration-200"
              @click="$refs.fileInput.click()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <input 
              ref="fileInput"
              type="file"
              class="hidden"
              accept="image/*"
              @change="handleImageUpload"
            />
          </div>
          <!-- Header Text -->
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Profile Settings</h2>
            <p class="text-gray-500">Update your personal information and contact details</p>
          </div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-6">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field -->
          <div class="space-y-2">
            <label for="name" class="flex items-center space-x-2 text-gray-700 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Full Name</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="w-full px-4 bg-white text-black py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </div>

          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="flex items-center space-x-2 text-gray-700 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Address</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              readonly
              class="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <!-- Phone Field -->
          <div class="space-y-2">
            <label for="phone" class="flex items-center space-x-2 text-gray-700 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Phone Number</span>
            </label>
            <input
              v-model="form.phone"
              type="tel"
              id="phone"
              class="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            />
          </div>

          <!-- Address Field -->
          <div class="space-y-2">
            <label for="address" class="flex items-center space-x-2 text-gray-700 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Address</span>
            </label>
            <textarea
              v-model="form.address"
              id="address"
              rows="3"
              class="w-full px-4 py-2 border bg-white text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
            ></textarea>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSaving"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg v-if="isSaving" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>{{ isSaving ? 'Saving...' : 'Save Changes' }}</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: { ...this.profile },
      isSaving: false,
      showSuccess: false,
      profileImage: null,
    };
  },

  methods: {
    async handleSubmit() {
      this.isSaving = true;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.$emit('update-profile', this.form);
      this.isSaving = false;
      
      // Show success message
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    },

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profileImage = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
/* Optional: Add any custom styles here */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>