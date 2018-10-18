<template>
  <v-navigation-drawer
    :value="drawer"
    app
    fixed
    floating
    clipped
    class="grey lighten-5"
  >
    <!--<v-toolbar flat class="transparent">-->
    <!--<v-list class="pa-0">-->
    <!--<v-list-tile avatar>-->
    <!--<v-list-tile-avatar>-->
    <!--<img src="https://randomuser.me/api/portraits/men/85.jpg">-->
    <!--</v-list-tile-avatar>-->

    <!--<v-list-tile-content>-->
    <!--<v-list-tile-title>{{user.displayName}}</v-list-tile-title>-->
    <!--</v-list-tile-content>-->
    <!--</v-list-tile>-->
    <!--</v-list>-->
    <!--</v-toolbar>-->

    <v-list
      dense
      class="pt-0"
    >
      <v-divider class="mb-3"></v-divider>
      <template v-for="(item, i) in items">
        <v-layout
          v-if="item.heading"
          :key="i"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-right">
            <v-btn small flat>edit</v-btn>
          </v-flex>
        </v-layout>

        <v-divider
          v-else-if="item.divider"
          :key="i"
          dark
          class="my-3"
        ></v-divider>

        <v-list-tile
          v-else
          :key="i"
          @click="clickItem(item.name)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'NavigationDrawer',

    data() {
      return {
        items: [
          {
            name: 'main',
            icon: 'home',
            text: 'Главная',
          },
          // {
          //   icon: 'loyalty',
          //   text: 'Помощь проекту',
          // },
          {divider: true},
          {
            name: 'archive',
            icon: 'archive',
            text: 'Архив',
          },
          {
            name: 'deleted',
            icon: 'delete',
            text: 'Корзина',
          },
          // {divider: true},
          // {
          //   icon: 'settings',
          //   text: 'Настройки',
          // },
        ],
      };
    },

    computed: {
      ...mapState({
        drawer: state => state.common.drawer,
        user: state => state.user.item,
      }),
    },

    methods: {
      ...mapActions({
          'changeFilterType': 'common/changeFilterType',
        },
      ),

      clickItem(name) {
        this.changeFilterType(name);
      },
    },
  };
</script>
