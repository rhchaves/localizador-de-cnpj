<template>
  <div id="tableCnpj">
    <b-col class="col-lg-11" style="text-align: right">
      <b-button type="button" variant="danger" pill @click="deleteSelected()">
        <b-icon icon="trash-fill"></b-icon>
        Selecionados
      </b-button>

      <b-form-group>
        <b-form-checkbox
          v-model="allSelected"
          :indeterminate="indeterminate"
          @change="toggleAll"
        >
          {{ allSelected ? "Desselecionar" : "Selecionar Tudo" }}
        </b-form-checkbox>
      </b-form-group>
    </b-col>

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
      <template #cell(selectItem)="data">
        <div align="center">
          <b-checkbox
            v-model="selected"
            :value="data.item"
            :options="items"
            name="selectCheck"
          >
          </b-checkbox>
        </div>
      </template>

      <template #cell(deleteItem)="row">
        <b-button
          @click="deleteItem(row.item, row.index)"
          variant="outline-danger"
          size="sm"
          pill
        >
          <b-icon icon="trash-fill"></b-icon>
          Excluir
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "tableCNPJ",

  data() {
    return {
      selected: [],
      allSelected: false,
      indeterminate: false,

      fields: [
        { key: "id", label: "Id" },
        { key: "cnpj", label: "CNPJ" },
        { key: "name", label: "Nome" },
        { key: "city", label: "Cidade" },
        { key: "state", label: "Estado" },
        { key: "details", label: "Detalhes" },
        { key: "selectItem", label: "Selecionar" },
        { key: "deleteItem", label: "Excluir" },
      ],
      items: [],
    };
  },

  methods: {
    async getItems() {
      await axios.get(`http://localhost:3000/items`).then((response) => {
        response.data.forEach((item) => {
          this.items.push({
            id: item.id,
            cnpj: item.cnpj,
            name: item.name,
            city: item.city,
            state: item.state,
          });
        });
      });

      // const req = {
      //         method: "get",
      //         url: `http://localhost:3000/items`,
      //       };
      // async getItems() {
      // const req = await fetch("http://localhost:3000/items");
      // const data = await req.json();
      // this.items = data;
    },

    toggleAll(checked) {
      this.selected = checked ? this.items.slice() : [];
    },

    async deleteItem(item, index) {
      await axios.delete(`http://localhost:3000/items/${item.id}`);
      this.items.splice(index, 1);

      // const req = await fetch(`http://localhost:3000/items/${item.id}`, {
      //   method: "DELETE",
      // });
      // await req.json();
      // this.items.splice(index, 1);

      // this.getItems();
    },

    deleteSelected() {
      if (!this.selected.length) return;
      this.selected.forEach((company) => {
        let indexCompany = this.items.indexOf(company);
        if (indexCompany !== -1) {
          axios.delete(`http://localhost:3000/items/${company.id}`);
          this.items.splice(indexCompany, 1);
          // this.deleteItem(company, indexCompany);
        }
      });
      this.allSelected = false;
    },
  },

  mounted() {
    this.getItems();
  },

  watch: {
    // condições para determinar estado da caixa 'Selecionar tudo'
    selected(newValue) {
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.items.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
  },
};
</script>

<style scoped>
#tableCnpj {
  margin-top: 30px;
}
</style>
