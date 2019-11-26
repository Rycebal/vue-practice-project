<template>
  <div class="mainScreen">
    <h5>List of users pulled from <a href="https://jsonplaceholder.typicode.com" target=_blank class="webLink"> https://jsonplaceholder.typicode.com</a></h5>
    <div>
      <b-form-group label="Sort users by Last Name or by Username">        <!-- Bootstrap radio buttons -->
        <b-form-radio-group class="radioButtons" id="radio-group-sort" v-model="sorted" name="radioThings" :options="sortOptions">   
          <!-- <b-form-radio value="sortLastName">Last Name</b-form-radio>         Start with Last Name Checked -->
          <!-- <b-form-radio value="sortUsername">Username</b-form-radio> -->
        </b-form-radio-group>
      </b-form-group>
    </div>                               
    <table style="width:100%">
      <tr>
        <b-container fluid>          <!-- fluid gives full width, without is a fixed width -->
          <b-row class="headers">
            <b-col><th>Full name</th></b-col>
            <b-col><th>Username</th></b-col>
            <b-col><th>E-mail</th></b-col>
            <b-col><th>City</th></b-col>
            <b-col><th></th></b-col>
            <b-col><th></th></b-col>
          </b-row>        
        </b-container>
      </tr>
      <div v-if="sorted === 'sortLastName'" class="divContainer">             <!-- if Last Name radio button is checked -->
        <ol v-for="user in sortedLastNames" :key="user.id" class="tableRows">
          <hr> 
              <!-- if user is selected, link to their posts and pass the id of user selected -->
            <b-container fluid class="userContainer">
              <b-row class="userInfo">
                <b-col><td>{{user.name}}</td></b-col>
                <b-col><td>{{user.username}}</td></b-col>
                <b-col><td>{{user.email}}</td></b-col>
                <b-col><td>{{user.address.city}}</td></b-col>
                <b-col><td><router-link :to="'/UserPosts/' + user.id" class="itemList"><b-button variant="light">Posts</b-button></router-link></td></b-col><!-- Show users sorted by last name -->
                <b-col><td><router-link :to="'/UserAlbums/' + user.id" class="itemList"><b-button variant="info">Albums</b-button></router-link></td></b-col>
              </b-row>
            </b-container>
        </ol>
      </div>
      <div v-if="sorted === 'sortUsername'"> 
        <ol v-for="user in sortedUsernames" :key="user.id" class="tableRows">
          <hr>
            <b-container fluid class="userContainer">
              <b-row class="userInfo">
                <b-col><td>{{user.name}}</td></b-col>
                <b-col><td>{{user.username}}</td></b-col>
                <b-col><td>{{user.email}}</td></b-col>
                <b-col><td>{{user.address.city}}</td></b-col>
                <b-col><td><router-link :to="'/UserPosts/' + user.id" class="itemList"><b-button variant="light">Posts</b-button></router-link></td></b-col>
                <b-col><td><router-link :to="'/UserAlbums/' + user.id" class="itemList"><b-button variant="info">Albums</b-button></router-link></td></b-col>
              </b-row>
            </b-container>
        </ol>
      </div>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserList',

  data() {
    return {
      users: [],
      sorted: 'sortLastName',       //  start sorted by last name
      sortOptions: [
        { text: 'Last Name', value: 'sortLastName' },
        { text: 'Username', value: 'sortUsername' }
      ]
    }
  }, 

  mounted() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        this.users = data;
    })
    // .then(json => console.log(json))
  },

  computed: {
    sortedUsernames () {
      let userData = this.users
      function compare(a, b) {
        if (a.username < b.username)
          return -1;
        if (a.username > b.username)
          return 1;
        return 0;
      }
      return userData.sort(compare);
    },

    sortedLastNames () {
      let salutations = "Mr" || "Mrs" || "Miss" || "Dr" || "Ms" || "Prof" || "Rev";
      let userData = this.users
      function compare(a, b) {          //  does not account for having a middle name or rare salutation (neither used in jsonplaceholder data).
        if (a.name.split(' ').slice(0).join(' ').includes(salutations) &&    //  if both names have a salutation
        b.name.split(' ').slice(0).join(' ').includes(salutations)) {        //  split up the words by spaces then
          if (a.name.split(' ').slice(2).join(' ') < b.name.split(' ').slice(2).join(' '))  //  check if the first word is a known salutation
            return -1;
          if (a.name.split(' ').slice(2).join(' ') > b.name.split(' ').slice(2).join(' '))
            return 1;
          return 0;
        }
        else if (a.name.split(' ').slice(0).join(' ').includes(salutations)) {   // if the first name has a salutation, but the second name does not
          if (a.name.split(' ').slice(2).join(' ') < b.name.split(' ').slice(1).join(' '))  // compare the 3rd word of one with salutation to the 2nd word of the one without
            return -1;
          if (a.name.split(' ').slice(2).join(' ') > b.name.split(' ').slice(1).join(' '))
            return 1;
          return 0;
        }
        else if (b.name.split(' ').slice(0).join(' ').includes(salutations)) {  //  if the second name has a salutation, but the first does not
          if (a.name.split(' ').slice(1).join(' ') < b.name.split(' ').slice(2).join(' '))
            return -1;
          if (a.name.split(' ').slice(1).join(' ') > b.name.split(' ').slice(2).join(' '))
            return 1;
          return 0;
        }
        else {
          if (a.name.split(' ').slice(1).join(' ') < b.name.split(' ').slice(1).join(' '))  //  if neither word includes a salutation
            return -1;
          if (a.name.split(' ').slice(1).join(' ') > b.name.split(' ').slice(1).join(' '))
            return 1;
          return 0;
        }
      }
      return userData.sort(compare);
    }
  },
}
</script>

<style scoped>              /* scoped attribute only applies css to this component */
  .mainScreen {
    margin-left: auto;
    margin-right: auto;
    max-width: 90%;
  }

  .userInfo {
    color: #ffffff;
    width: 100%;
    margin-left: 6%;
    font-size: 16px;
    margin-top: 10px;
  }

  ol {
    margin-bottom: 0px;
  }

  .tableRows {
    padding-bottom: 10px;
  }

  ol.tableRows:hover {
    background-color: #16527a;
  }

  ol.tableRows:nth-child(even) {
    background-color: #113f5e;
  }

  ol.tableRows:nth-child(even):hover {
    background-color: #114669;
  }

  .headers {
    width: 98%;
    margin-left: 8%;
    margin-right: 8%;
    margin-bottom: 5px;
    font-size: 22px;
    text-align: left;
  }

  .itemList {
    width: 100%;
    text-decoration: none;
  }

  hr { 
    margin-top: 0em;
    margin-bottom: 0em;
    margin-left: -40px;
    border-width: 1px;
    border-color: #ffffff;
  } 

  .labels {
    font-size: 125%;
  }

  .radioButtons {
    font-size: 90%;
  }

  .webLink {
    text-decoration: none;
  }

  a {
    color: #ffffff;
  }

  a:hover {
    color: #cccccc;
  }
    
</style>
