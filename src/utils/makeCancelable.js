export default function(promise, component) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => hasCanceled ? reject({ isCanceled: true }) : resolve(val));
    promise.catch(error => hasCanceled ? reject({ isCanceled: true }) : reject(error));
  });

  const cancel = () => hasCanceled = true;

  if (component) {
    const oldComponent = component.componentWillUnmount;
    component.componentWillUnmount = function componentWillUnmount() {
      if (oldComponent) oldComponent.call(component);
      cancel();
    };
  }

  return {
    promise: wrappedPromise,
    cancel
  };
}
