<template>
  <div 
    :class="{
      'w-64': isOpen,
      'w-20': !isOpen
    }"
    class="relative min-h-screen bg-gradient-to-b from-indigo-600 to-indigo-900 text-white transition-all duration-300 ease-in-out shadow-xl"
  >
<!-- Top Section -->
<div class="flex items-center justify-between p-4 border-b border-indigo-500/30">
  <div class="flex items-center space-x-3">
    <img
      v-if="isOpen"
      src="https://via.placeholder.com/32"
      alt="Logo"
      class="w-8 h-8"
    />
    <span v-if="isOpen" class="font-bold text-lg whitespace-nowrap truncate">
      Dashboard
    </span>
  </div>
  <button 
    @click="toggleSidebar"
    class="p-2 rounded-lg hover:bg-indigo-500/20 transition-colors"
  >
    <i v-if="isOpen" class="fas fa-chevron-left text-xl"></i>
    <i v-else class="fas fa-bars text-xl"></i>
  </button>
</div>

    <!-- Profile Section -->
    <div class="mt-6 px-4">
      <div class="flex items-center space-x-3">
        <div class="relative">
          <img
            src="https://via.placeholder.com/48"
            alt="Profile"
            class="w-12 h-12 rounded-full border-2 border-indigo-400"
          />
          <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div v-if="isOpen" class="flex-1">
          <h3 class="font-semibold text-white">{{ user.name }}</h3>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="mt-8 px-3">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.id">
          <router-link
            :to="item.link"
            :class="{
              'bg-indigo-500/20': activeItem === item.id,
              'hover:bg-indigo-500/10': activeItem !== item.id
            }"
            class="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-indigo-100"
            @click="activeItem = item.id"
          >
            <i :class="item.icon" class="text-xl"></i>
            <span v-if="isOpen">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Quick Actions -->
    <div v-if="isOpen" class="px-4 mt-8">
      <h4 class="text-xs uppercase text-indigo-300 font-semibold px-2 mb-2">
        Aksi Cepat
      </h4>
      <div class="grid grid-cols-2 gap-2">
        <button class="flex items-center justify-center p-3 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20 transition-colors">
          <i class="fas fa-bell text-lg"></i>
        </button>
        <button class="flex items-center justify-center p-3 bg-indigo-500/10 rounded-lg hover:bg-indigo-500/20 transition-colors">
          <i class="fas fa-cog text-lg"></i>
        </button>
      </div>
    </div>

    <!-- Logout Button -->
    <div class="absolute bottom-0 w-full p-4">
      <button
        @click="logout"
        :class="{
          'justify-center': !isOpen
        }"
        class="flex items-center space-x-3 w-full px-4 py-3 text-red-200 hover:bg-red-500/20 rounded-lg transition-colors"
      >
        <i class="fas fa-sign-out-alt text-xl"></i>
        <span v-if="isOpen">Keluar</span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: true,
      activeItem: 'home',
      user: {name : '' },
      menuItems: [
        { 
          id: 'home',
          icon: 'fas fa-home',
          label: 'Beranda',
          link: '/dashboard'
        },
        {
          id: 'reports',
          icon: 'fas fa-file-alt',
          label: 'Laporan',
          link: '/laporan'
        },
        {
          id: 'about',
          icon: 'fas fa-file-alt',
          label: 'About',
          link: '/about'
        },
        {
          id: 'blog',
          icon: 'fas fa-file-alt',
          label: 'Blog',
          link: '/blog'
        },
        {
          id: 'profile',
          icon: 'fas fa-user',
          label: 'Profil',
          link: '/profile'
        }
      ]
    }
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    async fetchUserData() {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('/api/profiles', {  // Sesuaikan endpoint jika perlu
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.user = response.data;  // Simpan hasil respons API ke `user`
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.user = { name: 'Unknown' }; // Gunakan data default jika gagal
      }
    }
  }
};
</script>

<style scoped>
/* Custom Styles if Necessary */
</style>
