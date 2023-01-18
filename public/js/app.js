const { createApp } = Vue;

const myApp = {
  data() {
    return {
      immos: undefined,
      input: '',
    };
  },
  methods: {
    async getImmos() {
      const { data } = await axios.get('/immos');
      this.immos = data;
    },
    async delImmo({ id }) {
      await axios.delete(`/immos/${id}`);
      this.getImmos();
    },
    async selectImmo(immo) {
      this.selectedImmo = { ...immo };
    },
    async editImmo() {
      await axios.patch(`/immos/${this.selectedImmo.id}`, {
        price: this.selectedImmo.price,
      });
      this.getImmos();
    },
  },
};

createApp(myApp).mount('#app');
