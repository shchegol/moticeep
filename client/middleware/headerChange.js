export default function({store, route}) {
  let routeName = route.name;
  let filter = 'main';
  let headerOpt = {
    title: 'MOTIKEEP',
    color: 'primary',
  };

  if (routeName === 'done') {
    filter = 'done';
    headerOpt = {
      title: 'Завершённые',
      color: 'blue-grey darken-2',
    };
  }

  if (routeName === 'deleted') {
    filter = 'deleted';
    headerOpt = {
      title: 'Корзина',
      color: 'blue-grey darken-2',
    };
  }

  if (routeName === 'user') {
    headerOpt.title = 'Профиль';
  }

  store.commit('common/changeFilterType', filter);
  store.commit('common/changeHeader', headerOpt);
}
