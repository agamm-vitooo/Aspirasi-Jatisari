<template>
  <div class="relative h-screen w-full overflow-hidden bg-gray-900">
    <!-- Background Image with Overlay -->
    <div 
      class="absolute inset-0 bg-cover bg-center transform scale-105 animate-slow-zoom"
      :style="{ backgroundImage: `url(${bannerImage})` }"
    >
      <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30"></div>
    </div>

    <!-- Animated Particles Background -->
    <div class="absolute inset-0 opacity-30">
      <div v-for="n in 20" :key="n" 
           class="particle absolute w-2 h-2 bg-white rounded-full"
           :style="getRandomPosition()">
      </div>
    </div>

    <!-- Content Container -->
    <div class="relative h-full w-full">
      <!-- Navigation Links -->
      <div class="absolute top-0 right-0 mt-8 mr-8 space-x-6 text-white/80">
        <a v-for="link in navLinks" 
           :key="link.text"
           :href="link.href"
           class="text-sm hover:text-white transition-colors duration-300">
          {{ link.text }}
        </a>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col justify-center h-full max-w-4xl mx-auto px-6 md:px-8">
        <!-- Small Pre-title -->
        <div class="mb-4 flex items-center">
          <div class="w-12 h-0.5 bg-indigo-500 mr-4"></div>
          <span class="text-indigo-400 text-sm font-medium tracking-wider uppercase">
            Portal Aspirasi Masyarakat
          </span>
        </div>

        <!-- Main Title -->
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
          Selamat Datang di<br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Website Aspirasi
          </span><br/>
          Warga Desa Jatisari
        </h1>

        <!-- Description -->
        <p class="text-lg text-gray-300 mb-8 max-w-2xl animate-fade-in-delay">
          Tempat untuk menyampaikan masukan, keluhan, dan aspirasi Anda demi kemajuan desa kita bersama. 
          Suara Anda adalah langkah awal perubahan.
        </p>

        <!-- Call to Action Buttons -->
        <div class="flex flex-wrap gap-4 animate-fade-in-delay-2">
          <button 
            @click="createReport"
            class="relative overflow-hidden group px-8 py-3 bg-indigo-600 rounded-lg text-white font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            <span class="relative z-10 flex items-center">
              <i class="fas fa-edit mr-2"></i>
              Buat Laporan
            </span>
            <div class="absolute inset-0 h-full w-full bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>

          <button 
            @click="trackReport"
            class="px-8 py-3 border-2 border-white/30 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300"
          >
            <i class="fas fa-search mr-2"></i>
            Lacak Laporan
          </button>
        </div>

        <!-- Statistics -->
        <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-delay-3">
          <div v-for="stat in statistics" :key="stat.label" class="text-center">
            <div class="text-2xl font-bold text-white mb-1">{{ stat.value }}</div>
            <div class="text-sm text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span class="text-white/60 text-sm mb-2">Scroll untuk melihat lebih</span>
        <i class="fas fa-chevron-down text-white/60"></i>
      </div>
    </div>
  </div>
</template>

<script>
import bannerImage from '../assets/images/banner.jpg';

export default {
  name: 'HeroSection',
  data() {
    return {
      bannerImage,
      statistics: [
        { value: '2,345+', label: 'Laporan Diterima' },
        { value: '87%', label: 'Tingkat Penyelesaian' },
        { value: '24 Jam', label: 'Rata-rata Respons' },
        { value: '4.8/5', label: 'Rating Kepuasan' }
      ]
    };
  },
  methods: {
    getRandomPosition() {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDuration = 15 + Math.random() * 10;
      
      return {
        top: `${top}%`,
        left: `${left}%`,
        animation: `float ${animationDuration}s infinite linear`
      };
    },
    createReport() {
      this.$router.push('/create-report');
    },
    trackReport() {
      this.$router.push('/track-report');
    }
  }
};
</script>

<style scoped>
.animate-slow-zoom {
  animation: slowZoom 20s infinite alternate;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

.animate-fade-in-delay {
  animation: fadeIn 1s ease-out 0.3s both;
}

.animate-fade-in-delay-2 {
  animation: fadeIn 1s ease-out 0.6s both;
}

.animate-fade-in-delay-3 {
  animation: fadeIn 1s ease-out 0.9s both;
}

.particle {
  animation: float 15s infinite linear;
}

@keyframes slowZoom {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(0) translateX(20px);
  }
  75% {
    transform: translateY(20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}
</style>