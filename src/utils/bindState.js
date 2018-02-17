// eslint-disable-next-line no-extend-native
Promise.prototype.bindState = function bindState(component, key = 'loading') {
  component.setState({ [key]: true });

  return this.then((result) => {
    component.setState({ [key]: false });
    return result;
  }).catch((error) => {
    if (!error.isCanceled) {
      component.setState({ [key]: false });
      throw error;
    }
  });
};
