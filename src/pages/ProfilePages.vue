<template>
  <div>
    <h2>Update Profil</h2>
    <form @submit.prevent="updateProfile">
      <div>
        <label for="name">Nama</label>
        <input type="text" v-model="name" id="name" placeholder="Masukkan nama" />
      </div>
      
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" placeholder="Masukkan email" />
      </div>
      
      <div>
        <label for="profilePicture">Foto Profil</label>
        <input type="file" @change="handleFileChange" id="profilePicture" />
      </div>

      <button type="submit">Perbarui Profil</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      profilePicture: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.profilePicture = event.target.files[0];  // Mengambil file yang dipilih oleh pengguna
    },
    async updateProfile() {
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      if (this.profilePicture) {
        formData.append('profilePicture', this.profilePicture);
      }

      try {
        // Pastikan `this.$axios` sudah terdefinisi
        const response = await this.$axios.put('/users/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert(response.data.message);  // Menampilkan pesan sukses
      } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat memperbarui profil');
      }
    },
  },
};
</script>
