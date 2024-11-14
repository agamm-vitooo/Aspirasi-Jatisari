<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <div class="max-w-7xl mx-auto mb-12 text-center">
      <h1 class="text-4xl font-bold text-indigo-600 mb-4">Profil Desa Jatisari</h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Selamat datang di portal informasi Desa Jatisari, Kecamatan Jatisrono, Kabupaten Wonogiri
      </p>
    </div>

    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Navigation Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = tab.id"
              :class="[
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'group inline-flex items-center px-6 py-4 border-b-2 font-medium text-sm transition-colors duration-200'
              ]"
            >
              <i :class="[tab.icon, 'mr-2']"></i>
              {{ tab.name }}
            </button>
          </nav>
        </div>

        <!-- Content Sections -->
        <div class="p-8">
          <!-- General Information -->
          <div v-show="activeTab === 'general'" class="space-y-8">
            <div class="bg-indigo-50 rounded-lg p-6">
              <h2 class="text-2xl font-bold text-indigo-800 mb-4">
                <i class="fas fa-info-circle mr-2"></i>Tentang Desa Jatisari
              </h2>
              <p class="text-gray-700 leading-relaxed">
                Desa Jatisari merupakan salah satu dari 15 desa di Kecamatan Jatisrono, Kabupaten Wonogiri, 
                Provinsi Jawa Tengah.
              </p>
              
              <!-- Dusun Cards -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div v-for="(dusun, index) in dusunList" 
                     :key="index" 
                     class="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 class="font-semibold text-indigo-600">{{ dusun.name }}</h3>
                  <p class="text-gray-600">RW {{ dusun.rw }}: {{ dusun.rt }} RT</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Geographic Information -->
          <div v-show="activeTab === 'geographic'" class="space-y-8">
            <div class="bg-green-50 rounded-lg p-6">
              <h2 class="text-2xl font-bold text-green-800 mb-4">
                <i class="fas fa-map-marked-alt mr-2"></i>Aspek Geografis
              </h2>
              
              <!-- Geographic Details -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h3 class="font-semibold text-green-600 mb-2">Koordinat</h3>
                    <p class="text-gray-700">7°83'07.44"S LS dan 111°12'36.52" BT</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h3 class="font-semibold text-green-600 mb-2">Ketinggian</h3>
                    <p class="text-gray-700">± 450 meter di atas permukaan laut</p>
                  </div>
                  <div class="bg-white p-4 rounded-lg shadow-sm">
                    <h3 class="font-semibold text-green-600 mb-2">Luas Wilayah</h3>
                    <p class="text-gray-700">260,11 Ha</p>
                  </div>
                </div>
                
                <!-- Border Information -->
                <div class="bg-white p-4 rounded-lg shadow-sm">
                  <h3 class="font-semibold text-green-600 mb-3">Batas Wilayah</h3>
                  <ul class="space-y-2">
                    <li v-for="(border, index) in borders" 
                        :key="index"
                        class="flex items-center text-gray-700">
                      <span class="w-20 font-medium">{{ border.direction }}:</span>
                      <span>{{ border.village }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Demographic Information -->
          <div v-show="activeTab === 'demographic'" class="space-y-8">
            <div class="bg-blue-50 rounded-lg p-6">
              <h2 class="text-2xl font-bold text-blue-800 mb-4">
                <i class="fas fa-users mr-2"></i>Aspek Demografi
              </h2>
              
              <!-- Occupation Chart -->
              <div class="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 class="font-semibold text-blue-600 mb-4">Distribusi Mata Pencaharian</h3>
                <div class="relative pt-1">
                  <div v-for="(occupation, index) in occupations" 
                       :key="index"
                       class="mb-4">
                    <div class="flex items-center justify-between mb-1">
                      <span class="text-sm font-medium text-gray-700">{{ occupation.name }}</span>
                      <span class="text-sm font-medium text-gray-700">{{ occupation.percentage }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full">
                      <div class="h-2 rounded-full"
                           :class="occupation.color"
                           :style="{ width: occupation.percentage + '%' }">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social & Economic Information -->
          <div v-show="activeTab === 'social'" class="space-y-8">
            <div class="bg-purple-50 rounded-lg p-6">
              <h2 class="text-2xl font-bold text-purple-800 mb-4">
                <i class="fas fa-heart mr-2"></i>Aspek Sosial & Ekonomi
              </h2>
              
              <!-- Cultural Groups -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h3 class="font-semibold text-purple-600 mb-4">Kelompok Kesenian</h3>
                  <ul class="space-y-2">
                    <li v-for="(art, index) in culturalGroups" 
                        :key="index"
                        class="flex items-center text-gray-700">
                      <i class="fas fa-music mr-2 text-purple-500"></i>
                      {{ art }}
                    </li>
                  </ul>
                </div>
                
                <!-- Economic Status -->
                <div class="bg-white p-6 rounded-lg shadow-sm">
                  <h3 class="font-semibold text-purple-600 mb-4">Status Ekonomi (DTKS 2022)</h3>
                  <div class="text-gray-700">
                    <p class="mb-4">Jumlah KK miskin: <span class="font-semibold">317 KK</span></p>
                    <h4 class="font-medium mb-2">Faktor Penyebab:</h4>
                    <ul class="list-disc list-inside space-y-1">
                      <li>Status rumah tidak layak huni</li>
                      <li>Kepemilikan sarana MCK yang belum memadai</li>
                      <li>Dampak pandemi COVID-19</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VillageProfile",
  data() {
    return {
      activeTab: 'general',
      tabs: [
        { id: 'general', name: 'Umum', icon: 'fas fa-info-circle' },
        { id: 'geographic', name: 'Geografis', icon: 'fas fa-map-marked-alt' },
        { id: 'demographic', name: 'Demografi', icon: 'fas fa-users' },
        { id: 'social', name: 'Sosial & Ekonomi', icon: 'fas fa-heart' }
      ],
      dusunList: [
        { name: 'Dusun Jatisari', rw: '001', rt: 9 },
        { name: 'Dusun Cinderejo', rw: '002', rt: 9 },
        { name: 'Dusun Tanduran', rw: '003', rt: 7 },
        { name: 'Dusun Jatirejo', rw: '004', rt: 6 }
      ],
      borders: [
        { direction: 'Utara', village: 'Desa Jatisrono' },
        { direction: 'Selatan', village: 'Desa Sumberejo' },
        { direction: 'Barat', village: 'Desa Watangsono' },
        { direction: 'Timur', village: 'Desa Gunugsari' }
      ],
      occupations: [
        { name: 'Sektor Jasa', percentage: 29.54, color: 'bg-blue-500' },
        { name: 'Tenaga Kerja Bangunan', percentage: 25.65, color: 'bg-green-500' },
        { name: 'Sektor Lainnya', percentage: 23.46, color: 'bg-yellow-500' },
        { name: 'Pertanian', percentage: 21.35, color: 'bg-red-500' }
      ],
      culturalGroups: [
  'Bedigas Laras',
  "Ladrang Syafa'at", // Using double quotes around the entire string
  'Kelompok Musik Jawa Sopo Nyono',
  'Sanggar Tari Cempaka Putri'
]

    };
  }
};
</script>

<style scoped>
/* Tambahan animasi jika diperlukan */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>