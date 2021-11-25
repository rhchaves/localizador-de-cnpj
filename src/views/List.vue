<template>
  <div id="list">
    <b-container class="mainContainer">
      <b-form-group class="text-center mt-5">
        <div class="mb-5">
          <h1>Lista de CNPJ</h1>
        </div>
        <TableCNPJ />
      </b-form-group>
    </b-container>
  </div>
</template>

<script>
import TableCNPJ from "../components/TableCNPJ.vue";

export default {
  name: "List",

  components: {
    TableCNPJ,
  },
};
</script>
