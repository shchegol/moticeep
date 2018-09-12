<template>
    <div class="dropdown">
      <button @click="isVisible = !isVisible" type="button" class="btn btn_icon">
        <slot name="button">
          <i class="material-icons md-24">more_vert</i>
        </slot>
      </button>

      <div v-show="isVisible" class="dropdown__body">
        <slot></slot>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'dropdown',
    data() {
      return {
        isVisible: false,
      }
    }
  };
</script>

