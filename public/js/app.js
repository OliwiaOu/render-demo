const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: undefined,
      input: '',
    };
  },
  methods: {
    async getData() {
      const { data } = await axios.get('http://localhost:3000/immos');
      this.immos = data;
    },
    async delData(imo) {
      this.immos = this.immos.filter(({ id }) => id !== imo.id);
    },
    chanceData(imo) {
      this.input = imo.price;
      this.newData(imo);
    },
    newData(imo) {
      imo.price = this.input;
    },
  },
};

createApp(myApp).mount('#app');
