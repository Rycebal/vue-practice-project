<template>
  <div class="postsScreen">
        <div class="backButton">
            <b-button v-on:click="goBack" variant="primary">Go Back</b-button>
        </div>
        <br>
        <h3>{{user.username}} ({{user.name}}) has posted: </h3>
        <br>
        <ol v-for="postsByUserId in posts" :key="postsByUserId.id">
            <b-list-group class="postCards">
                <b-list-group-item variant="secondary">
                    <div class="d-flex w-90 justify-content-between">
                        <h5 class="postTitle">{{postsByUserId.title}}</h5>
                    </div>
                    <p class="mb-1">
                        {{postsByUserId.body}}
                    </p>    
                </b-list-group-item>
            </b-list-group>
        </ol>
  </div>
</template>

<script>
export default {
    name: 'UserPosts',
    props: [
        'id'
    ],
    data() {
        return {
            posts: [],
            user: String
        }
    },

    mounted() {
        fetch('https://jsonplaceholder.typicode.com/posts?userId=' + this.id)
        .then(response => response.json())
        .then((data) => {
            this.posts = data;
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

.postTitle {
    font-weight: bold;
}

.postCards {
    margin-right: 5%;
    margin-left: 2%;
}
</style>
