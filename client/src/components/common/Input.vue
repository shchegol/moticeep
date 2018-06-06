<template>
  <div ref="input" class="mdc-text-field">
    <input type="text" :id="name" class="mdc-text-field__input">
    <label class="mdc-floating-label" :for="name">{{ label }}</label>
    <div class="mdc-line-ripple"></div>
  </div>
</template>

<script>
  import {MDCTextField} from '@material/textfield';

  export default {
    name: 'Input',
    props: {
      label: String,
      name: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        default: '',
      },
    },
    data() {
      return {};
    },
    mounted() {
      let textField = this.$refs.input;
      new MDCTextField(textField);
    },
  };
</script>
