<template>
  <div>
    <b-container class="mainContainer ; text-center mt-5">
      <b-form-group v-if="show">
        <div class="mb-5">
          <h1>Buscador de CNPJ</h1>
        </div>
        <b-form @submit.prevent="onSubmit" inline>
          <b-row id="formulario">
            <b-col col lg="6">
              <b-form-input
                id="input-status"
                type="text"
                v-model="form.cnpj"
                placeholder="Informe o CNPJ"
                v-mask="'##.###.###/####-##'"
                required
              ></b-form-input>
            </b-col>
            <b-col col lg="3">
              <b-button type="submit" variant="primary" class="submit" pill
                ><b-icon icon="search"></b-icon> Pesquisar</b-button
              >
            </b-col>
            <b-col col lg="3">
              <b-button @click="deleteAll()" pill variant="danger">
                <b-icon icon="trash-fill"></b-icon>
                Limpar lista
              </b-button>
            </b-col>
          </b-row>
        </b-form>

        <div id="tableCnpj" style="">
          <!-- <div id="tableCnpj" style="height: 500px"> -->
          <div v-if="loader">
            <div class="text-center mt" aria-colspan="2">
              <img src="/img/loading-buffering.gif" alt="" />
            </div>
          </div>
          <div v-if="!loader">
            <b-table :items="items" :fields="fields" striped>
              <template #cell(details)="data">
                <router-link
                  :to="{
                    name: 'Details',
                    params: { cnpj: data.item.cnpj.replace(/[^0-9,]*/g, '') },
                  }"
                  class="btn btn-outline-dark btn-sm rounded-pill"
                  ><b-icon icon="plus"></b-icon>Detalhes</router-link
                >
              </template>

              <template #cell(saveItem)="row">
                <b-button
                  @click="saveItem(row.item, row.index)"
                  size="sm"
                  variant="outline-primary"
                  pill
                >
                  <b-icon icon="cart-check"></b-icon>
                  Salvar
                </b-button>
              </template>

              <template #cell(deleteItem)="row">
                <b-button
                  @click="deleteItem(row.item, row.index, $event.target)"
                  pill
                  variant="outline-danger"
                  size="sm"
                >
                  <b-icon icon="trash-fill"></b-icon>
                  Excluir
                </b-button>
              </template>
            </b-table>
          </div>
        </div>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",

  data() {
    return {
      stickyHeader: false,
      show: true,
      loader: false,
      form: {
        cnpj: "",
      },

      fields: [
        { key: "cnpj", label: "CNPJ" },
        { key: "name", label: "Nome" },
        { key: "city", label: "Cidade" },
        { key: "state", label: "Estado" },
        { key: "details", label: "Detalhes" },
        { key: "saveItem", label: "Salvar" },
        { key: "deleteItem", label: "Excluir" },
      ],

      items: [
        {
          cnpj: "60.701.190/0001-04",
          name: "ITAU UNIBANCO S.A.",
          city: "São Paulo",
          state: "SP",
        },
      ],
    };
  },

  methods: {
    onSubmit() {
      this.loader = true;

      const existeEmpresa = this.items.filter(
        (empresa) => empresa.cnpj === this.form.cnpj
      );
      if (existeEmpresa.length) {
        return this.showAlertListed();
      } else if (this.form.cnpj.length !== 18) {
        this.showAlertInvalid();
      } else {
        //
        var cnpjLimpo = this.form.cnpj.replace(/[^0-9,]*/g, "");

        const config = {
          method: "get",
          url: `https://api.cnpja.com/office/${cnpjLimpo}`,
          headers: {
            Authorization:
              "9ecfc0ff-426b-49a4-a8c5-21ce8e2778b5-4de37ca7-7a93-4717-95d0-4680acd1b17a",
          },
        };

        axios(config)
          .then((response) => {
            const data = response.data;
            this.items.push({
              cnpj: this.form.cnpj,
              name: data.company.name,
              city: data.address.city,
              state: data.address.state,
            }),
              this.showAlertFound();
            this.form.cnpj = "";
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.showAlertNotFound();
            } else {
              this.showAlertError(error.response.status);
            }
            this.form.cnpj = "";
          })
          .finally(() => {
            this.loader = false;
          });
      }
    },

    deleteItem(item, index) {
      this.items.splice(index, 1);
    },

    deleteAll() {
      this.items.forEach((cnpj) => {
        this.items.splice(cnpj);
      });
    },

    async saveItem(item) {
      await axios.post("http://localhost:3000/items", {
        cnpj: item.cnpj,
        name: item.name,
        city: item.city,
        state: item.state,
      });

      // async saveItem(item) {

      // const data = {
      //   cnpj: item.cnpj,
      //   name: item.name,
      //   city: item.city,
      //   state: item.state,
      // };

      // const dataJson = JSON.stringify(data);

      // const req = await fetch("http://localhost:3000/items", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: dataJson,
      // });

      // await req.json();
    },

    // Mensagens ao usuário
    showAlertFound() {
      this.$swal(
        "Sucesso!",
        `"O CNPJ: ${this.form.cnpj} foi encontrado!"`,
        "success"
      );
    },
    showAlertNotFound() {
      this.$swal(
        "Desculpe",
        `"O CNPJ: ${this.form.cnpj} não foi encontrado!"`,
        "warning"
      );
    },
    showAlertError(error) {
      this.$swal("Oops...", `Algo deu errado! Erro ${error}`, "error");
    },
    showAlertInvalid() {
      this.$swal(
        "ATENÇÃO !",
        `"O CNPJ: ${this.form.cnpj} é inválido!"`,
        "error"
      );
    },
    showAlertListed() {
      this.$swal(
        "ATENÇÃO !",
        `"O CNPJ: ${this.form.cnpj} já está na lista!"`,
        "warning"
      );
      this.loader = false;
    },
  },
};
</script>

<style scoped>
/* #tableCnpj {
  margin-top: 30px;
}

#formulario {
  align-items: center;
  justify-content: center;
} */
</style>
