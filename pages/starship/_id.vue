<template>
  <div class="container">
    <div class="header">
      <div class="header__left">
        <div class="starships__name">{{StarShip.name}}</div>
        <div class="starships__model">{{StarShip.model}}</div>
        <div class="starships__manufacturer">{{StarShip.manufacturer}}</div>
      </div>
      <div class="header__right">
        <div class="header__right-item">
          <small>Экипаж</small> <br>
          {{StarShip.crew }}
        </div>
      </div>
    </div>
    <div class="content">
      <small>Максимальная скорость</small>
      <b>{{StarShip.max_atmosphering_speed}}</b>
    </div>
    <button class="back" @click.prevent="back">Вернуться назад</button>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    const StarShip = await $axios.$get(`https://swapi.co/api/starships/${params.id}/`)
    return {
      StarShip
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss">
  .back{
    display: block;
    border: none;
    height: 100px;
    width: 100%;
    text-transform: uppercase;
    font-size: 20px;
    margin-top: 50px;
    cursor: pointer;
  }
  .container{
    max-width: 1200px;
    margin: 15px auto;
  }
  .header{
    background: rgb(32, 5, 63);
    display: flex;
    padding: 15px;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    &__right{
      &-item{
        text-align: right;
        line-height: 1;
        small{
          font-size: 12px;
          font-weight: normal;
          text-transform: uppercase;
          opacity: .5;
        }
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .content{
    text-align: center;
    line-height: 1;
    margin-top: 50px;
    small{
      display: block;
      text-transform: uppercase;
      opacity: .5;
    }
    b{
      display: block;
      font-size: 120px;
    }
  }
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
  }
</style>
