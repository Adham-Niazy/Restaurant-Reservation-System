<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: [],
      options: [
        { name: "Vue.js", language: "JavaScript" },
        { name: "Adonis", language: "JavaScript" },
        { name: "Rails", language: "Ruby" },
        { name: "Sinatra", language: "Ruby" },
        { name: "Laravel", language: "PHP" },
        { name: "Phoenix", language: "Elixir" },
      ],
    };
  },
};
</script>

<template>
  <div>
    <label class="typo__label">Tables</label>
    <multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      label="name"
      track-by="name"
      :preselect-first="true"
      :searchable="false"
    >
      <template slot="tag" slot-scope="props">
        <div class="">{{ props }}</div>
      </template>
    </multiselect>
  </div>
</template>
