<template>
  <mdc-toolbar slot="toolbar" fixed>
    <mdc-toolbar-row>
      <mdc-toolbar-section align-start>
        <mdc-toolbar-menu-icon event="toggle-drawer"></mdc-toolbar-menu-icon>
        <mdc-toolbar-title>MOTIKEEP</mdc-toolbar-title>
      </mdc-toolbar-section>

      <mdc-toolbar-section align-end>
        <router-link to="/user" class="avatar-btn">
          <span class="avatar-btn__img" :style="{'background-image': `url(${avatarImage})`}"></span>
        </router-link>
      </mdc-toolbar-section>
    </mdc-toolbar-row>
  </mdc-toolbar>
</template>

<script>
  export default {
    name: 'Header',
    data() {
      return {
        avatarImage: require('@/assets/images/girl.png'),
      };
    },
  };
</script>
