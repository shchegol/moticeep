<template>
  <div class="container-fluid">
    <div class="row main">
      <div class="col-3">
        <div class="mdc-card mdc-card--outlined card">
          <div class="card__content">
            <h4 class="card__title mdc-typography--headline6">Прочитала слово</h4>
            <h5 class="card__subtitle mdc-typography--subtitle2">1 очко</h5>
          </div>

          <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
              <button class="mdc-button mdc-card__action mdc-card__action--button">Добавить</button>
            </div>
            <div class="mdc-card__action-icons">
              <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Переименовать">edit</button>
              <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Удалить">delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--<button ref="actionButton" @click="addFormToggle" class="mdc-fab material-icons" aria-label="Favorite">-->
  <!--<template v-if="flag.addForm">-->
  <!--<span class="mdc-fab__icon">save</span> <span class="mdc-fab__text">Сохранить</span>-->
  <!--</template>-->

  <!--<template v-else>-->
  <!--<span class="mdc-fab__icon">add</span> <span class="mdc-fab__text">Добавить</span>-->
  <!--</template>-->
  <!--</button>-->

  <!--<div ref="addForm" class="menu-add" :class="{'menu-add_show': flag.addForm}">-->
  <!--<div class="container">-->
  <!--<div class="row mt-3">-->
  <!--<div class="col">-->
  <!--<m-input :name="'name'" :label="'Название'" class="w-100"></m-input>-->
  <!--</div>-->

  <!--<div class="w-100 d-block d-md-none"></div>-->

  <!--<div class="col">-->
  <!--<m-input :name="'reward'" :label="'Количество очков'" class="w-100"></m-input>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
</template>

<script>
  export default {
    name: 'Main',
    data() {
      return {};
    },
    mounted() {},
  };
</script>
