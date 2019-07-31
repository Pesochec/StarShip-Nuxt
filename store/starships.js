export const state = () => ({
  starShip: null
})

export const mutations = {
}

export const actions = {
  async fetchStarShip() {
    let starShips = await this.$axios.$get('http://swapi.co/api/starships/?page=1')
    console.log(starShips)
  }
}

export const getters = {
}
