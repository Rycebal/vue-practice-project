<template>
  <div class="albumsScreen">
    <div class="backButton">
      <b-button v-if="showPhotos === false" v-on:click="goBack" variant="primary">Back</b-button>
      <b-button v-if="showPhotos === true" v-on:click="goAlbums" variant="primary">Back</b-button>
    </div>
    <br>
    <h3 v-if="showPhotos === false">{{user.username}} ({{user.name}}) Albums: </h3>
    <h3 v-if="showPhotos === true">{{albumTitle}}: </h3>
    <br>
    <div v-if="showPhotos === false && showAlbums === true">
      <b-row>
        <b-col sm="2" v-for="albumsByUserId in albums" :key="albumsByUserId.id" class="album-column">
          <b-card @click="getPhotos(albumsByUserId.id, albumsByUserId.title)" :title='albumsByUserId.title' :img-src='albumsByUserId.thumb' class="album-card" align="left">
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div v-if="showPhotos === false && showAlbums === false || loadingPhotos === true" >
      <div slot="table-busy" class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
    </div>
    <div v-if="showPhotos === true" class="photo-div">
      <b-row>
        <b-col class="photo-album" sm="3" v-for="photosByAlbumId in photos" :key="photosByAlbumId.id">
            <a><img :src='photosByAlbumId.url' width="350"></a>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserAlbums',
  props: [
    'id'
  ],
  data() {
    return {
      albums: [],
      albumId: 0,
      photos: [],
      user: String,
      albumTitle: '',
      showAlbums: false,
      showPhotos: false,
      loadingPhotos: false
    }
  },

  mounted() {
    fetch('https://jsonplaceholder.typicode.com/albums?userId=' + this.id)
    .then(response => response.json())
    .then((albumData) => {
      for (let i = 0; i < albumData.length; i++) {
        fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + albumData[i].id)
        .then(response => response.json())
        .then((photoData) => {
          albumData[i].thumb = photoData[0].thumbnailUrl
          if (i === albumData.length - 1) {
            console.log('albumData: ', albumData)
            this.albums = albumData;
            this.showAlbums = true
          }
        })
      }
    })
    // .then(json => console.log(json))

    fetch('https://jsonplaceholder.typicode.com/users/' + this.id)
    .then(response => response.json())
    .then((data) => {
      this.user = data;
    })
  },

  methods: {
    goBack() {
      this.$router.go(-1);        //  go back to previous page in web browser history
    },
    getPhotos(id, title) {
      this.loadingPhotos = true
      this.albumTitle = title
      fetch('https://jsonplaceholder.typicode.com/photos?albumId=' + id)
      .then(response => response.json())
      .then((data) => {
        this.photos = data
      }).then(
        this.showPhotos = true,
        this.loadingPhotos = false
      )
    },
    goAlbums() {
      this.showPhotos = false
    }
  }
}

</script>

<style scoped>            /* scoped attribute only applies css to this component */
.backButton {
  text-align: left;
  margin-left: 5%;
}

p {
  text-align: left;
}

h3 {
  text-align: left;
  margin-left: 5%;
}

.albumTitle {
  font-weight: bold;
}

.albumCards {
  margin-right: 5%;
  margin-left: 2%;
}

.album-column {
  margin-left: 5%;
}

.album-card {
  color: #000;
}

.photo-album {
  padding-bottom: 1vw;
}

.photo-div {
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
