<template>
  <div class="details">
    <b-container class="mainContainer; text-center mt-5">
      <div class="mb-5">
        <h1>Mais detalhes</h1>
      </div>

      <b-card>
        <b-row>
          <b-col sm="6"> <b>CNPJ: </b> {{ cnpj }} </b-col>
          <b-col sm="6"> <b>Nome: </b> {{ name }} </b-col>
          <b-col sm="6"> <b>Logradouro: </b> {{ street }} </b-col>
          <b-col sm="6"> <b>Bairro: </b> {{ district }} </b-col>
          <b-col sm="6"> <b>CEP: </b> {{ zip }} </b-col>
          <b-col sm="6"> <b>Cidade: </b> {{ city }} </b-col>
          <b-col sm="6"> <b>Estado: </b> {{ state }} </b-col>
          <b-col sm="6"> <b>País: </b> {{ country }} </b-col>
          <b-col sm="6"> <b>Nome fantasia: </b> {{ alias }} </b-col>
          <b-col sm="6"> <b>Principal Atividade: </b> {{ mainActivity }}</b-col>
          <b-col sm="6"> <b>E-mail: </b> {{ email }} </b-col>
          <b-col sm="6"> <b>Telefone: </b> {{ phone }} </b-col>
          <b-col sm="6"> <b>Natureza: </b> {{ nature }} </b-col>
          <b-col sm="6"> <b>Porte: </b> {{ size }} </b-col>
          <b-col sm="6"> <b>Fundado: </b> {{ founded }} </b-col>
          <b-col sm="6"> <b>Situação: </b> {{ status }} </b-col>
          <b-col sm="6"> <b>Capital Social: </b> R$ {{ equity }} </b-col>
        </b-row>
      </b-card>
      <b-row class="" style="text-align: right">
        <b-col class="m-3" col lg="10">
          <router-link to="/search" class="btn btn-primary rounded-pill">
            <b-icon icon="arrow-left"></b-icon>
            Buscar
          </router-link>
        </b-col>
        <b-col class="m-3" col lg="11.5">
          <router-link to="/list" class="btn btn-primary rounded-pill">
            Lista <b-icon icon="arrow-right"></b-icon>
          </router-link>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Details",

  data() {
    return {
      cnpj: "",
      name: "",
      city: "",
      state: "",
      alias: "",
      mainActivity: "",
      nature: "",
      size: "",
      founded: "",
      status: "",
      email: "",
      phone: "",
      street: "",
      district: "",
      zip: "",
      country: "",
      equity: "",
    };
  },

  methods: {
    showAlertExceeded(error) {
      this.$swal(
        "Desculpe",
        `Quantidade de buscas excedida! Erro ${error}`,
        "warning"
      );
    },
    showAlertError(error) {
      this.$swal("Oops...", `Algo deu errado! Erro ${error}`, "error");
    },
  },

  created() {
    const cnpj = this.$route.params.cnpj;

    const config = {
      method: "get",
      url: `https://api.cnpja.com/office/${cnpj}`,
      headers: {
        Authorization:
          "9ecfc0ff-426b-49a4-a8c5-21ce8e2778b5-4de37ca7-7a93-4717-95d0-4680acd1b17a",
      },
    };

    axios(config)
      .then((response) => {
        const data = response.data;
        this.cnpj = cnpj;
        this.name = data.company.name;
        this.city = data.address.city;
        this.state = data.address.state;
        this.alias = data.alias;
        this.mainActivity = data.mainActivity.text;
        this.nature = data.company.nature.text;
        this.size = data.company.size.text;
        this.founded = data.founded;
        this.status = data.status.text;
        this.email = data.emails[0]?.address;
        this.phone = `(0${data.phones[0]?.area}) ${data.phones[0]?.number}`;
        this.street = data.address.street;
        this.district = data.address.district;
        this.zip = data.address.zip;
        this.country = data.address.country.name;
        this.equity = data.company.equity;
      })
      .catch((error) => {
        if (error.response.status === 429) {
          this.showAlertExceeded(error.response.status);
        } else {
          this.showAlertError(error.response.status);
        }
      });
  },
};
</script>

<style scoped>
#return {
  margin-top: 20px;
}
</style>
