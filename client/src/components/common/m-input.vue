<template>
  <div ref="input" class="mdc-text-field mdc-text-field--outlined">
    <input type="text" :id="name" class="mdc-text-field__input">
    <label :for="name" class="mdc-floating-label">{{ label }}</label>
    <div class="mdc-notched-outline">
      <svg>
        <path class="mdc-notched-outline__path"/>
      </svg>
    </div>
    <div class="mdc-notched-outline__idle"></div>
  </div>
</template>

<script>
  import {MDCTextField} from '@material/textfield';

  export default {
    name: 'm-input',
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
