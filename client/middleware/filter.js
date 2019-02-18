export default function({store, route}) {
  let routeName = route.name;
  let filter = 'main';

  if (routeName === 'done') {
    filter = 'done';
  }

  if (routeName === 'deleted') {
    filter = 'deleted';
  }

  store.commit('common/changeFilterType', filter);
}
