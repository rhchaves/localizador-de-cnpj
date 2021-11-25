<template>
  <div id="formCnpj">
    <b-form @submit.prevent="onSubmit" inline>
      <b-row>
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
        <b-col col lg="4">
          <b-button type="submit" variant="primary" class="submit"
            ><b-icon icon="search"></b-icon> Pesquisar</b-button
          >
        </b-col>
      </b-row>
    </b-form>
    <TableCNPJ />
  </div>
</template>

<script>
import TableCNPJ from "../components/TableCNPJ.vue";
import axios from "axios";

export default {
  name: "FormCNPJ",
  components: {
    TableCNPJ,
  },

  data() {
    return {
      loader: false,

      form: {
        cnpj: "",
      },
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
        console.log(cnpjLimpo);

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
            console.log(response);
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
    },
  },
};
</script>
