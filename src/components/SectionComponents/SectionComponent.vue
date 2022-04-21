<template>
  <div>
    <div v-for="section in selectedSection" v-bind:key="section.id">
      <div v-for="item in section.itemsection" v-bind:key="item.id">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SectionComponent",
  props: ["selectedSection"],
};
</script>
<style scoped lang="scss"></style>
