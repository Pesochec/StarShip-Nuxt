
<template>
  <div class="container starships">
    <div style="width: 100%;"> <input type="text" name="searching" v-model="searchInput" @keyup.prevent="search()" value=""></div>
    <NuxtLink class="starships__item" v-for="(StarShip, idx) in starShipsData.results" :key="idx" :to="'starship/'+StarShip.url.replace(/[^-0-9]/gim ,'')">
      <div class="starships__name">{{StarShip.name}}</div>
      <div class="starships__model">{{StarShip.model}}</div>
      <div class="starships__manufacturer">{{StarShip.manufacturer}}</div>
    </NuxtLink>
    <div class="navigate">
       <button class="prev navigate__item" v-if="starShipsData.previous" :to="starShipsData.previous.replace(/[^-0-9]/gim ,'')" @click.prevent="routerBack()">Назад</button>
      <button class="next navigate__item" v-if="starShipsData.next" @click.prevent="routerNext()">Далее</button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, route }) {
    const starShipsData = await $axios.$get(`https://swapi.co/api/starships/?page=${(!route.query.page) ? '1' : route.query.page}&search=${(!route.query.searching) ? '' : route.query.searching}`)
    return {
      starShipsData
    }
  },
  data() {
    return{
    }
  },
  created() {
    this.searchInput = this.$route.query.searching
  },
  methods: {
    async search() {
      try {
        const starShipsSearch = await this.$axios.$get(`https://swapi.co/api/starships/?search=${this.searchInput}`)
        this.starShipsData = starShipsSearch
      } catch (e) {
        console.log(e)
      }
    },
    async routerNext() {
      this.$router.push({
        path: '',
        query: {
          page: this.starShipsData.next.replace(/[^-0-9]/gim ,''),
          searching: this.searchInput
        }
      })
      const rThis = this
      setTimeout(async function() {
        console.log(rThis.$route.query.page)
        const starShipsSearch = await rThis.$axios.$get(`https://swapi.co/api/starships/?page=${(!rThis.$route.query.page) ? '1' : rThis.$route.query.page}&search=${(!rThis.$route.query.searching) ? '' : rThis.$route.query.searching}`)
        rThis.starShipsData = starShipsSearch
      })
      // this.starShipsData = starShipsSearch
    },
    async routerBack() {
      this.$router.push({
        path: '',
        query: {
          page: this.starShipsData.previous.replace(/[^-0-9]/gim ,''),
          searching: this.searching
        }
      })
      const rThis = this
      setTimeout(async function() {
        console.log(rThis.$route.query.page)
        const starShipsSearch = await rThis.$axios.$get(`https://swapi.co/api/starships/?page=${(!rThis.$route.query.page) ? '1' : rThis.$route.query.page}&search=${(!rThis.$route.query.searching) ? '' : rThis.$route.query.searching}`)
        rThis.starShipsData = starShipsSearch
      })
      // this.starShipsData = starShipsSearch
    }
  },
}
</script>

<style lang="scss">
  .starships{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &__item{
      flex: 1;
      color: #000;
      border-radius: 5px;
      padding: 10px;
      border: 1px solid rgb(173, 173, 173);
      margin: 10px;
      text-decoration: none;
      line-height: 1.2;
    }
    &__model{
      font-size: 25px;
    }
    &__name{
      font-size: 14px;
      opacity: .3;
    }
    &__manufacturer{
      font-size: 18px;
      opacity: .5;
    }
  }
  .navigate{
    width: 100%;
    display: flex;
    flex-direction: row;
    &__item{
      flex: 1;
      width: 50%;
      display: block;
      text-align: center;
      background: rgb(165, 165, 165);
      padding: 20px;
      text-transform: uppercase;
      color: #000;
      text-decoration: none;
    }
  }
  .prev{
    background: #fff;
  }
</style>
