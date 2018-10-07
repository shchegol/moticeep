export default function({store, redirect}) {
  console.log(store)
  if (store.getters['auth/isAuthenticated']) {
    return redirect('/');
  }
}
