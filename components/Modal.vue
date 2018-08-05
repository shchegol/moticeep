<template>
  <div :class="[{show: visible}, style]" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'modal',

    props: {
      show: {
        type: Boolean,
        default: false,
      },
      style: {
        type: String,
        default: '',
      },
    },
  };
</script>
