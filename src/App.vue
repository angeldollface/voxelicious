<!--
VOXELICIOUS by Alexander Abraham, a.k.a. "Angel Dollface".
Licensed under the MIT license.
-->

<!--
We use the import components!
-->
<template>
 <ModelCog/>
</template>

<!--
In this section we import all components
and use them.
-->
<script>
import ModelCog from './components/ModelCog.vue';
export default {
  name: 'App',
  components: {
    ModelCog,
  }
};
</script>

<!--
This section controls
how the app looks and feels.
-->
<style lang="scss">
// Here we set some global SASS
// rules and then apply these
// to the imported SASS files.
$bgColor: #FFACA5;
@import './sass/desktop.scss';
</style>
