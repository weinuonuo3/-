<template>
  <div>
      <p>名称：${name}</p>
      <p>x：${x}</p>
      <p>y：${y}</p>
  </div>
</template>

<script>
export default {
  setAttr: function(data) {
    return { name: data[this.name], x: data[this.x], y: data[this.y] };
  },
  attr_title: "${x}",
  attr_content: this.html
};
</script>

<style>

</style>
