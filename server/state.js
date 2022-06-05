const state = {
  routes: ['splash','view1','view2', 'view3'],
  currRoute: null,
  routeMapping:{
    'splash': {
      next: 'view1',
      prev: null,
      formData: {}
    },
    'view1': {
      next: 'view2',
      prev: null,
      formData: {}
    },
    'view2': {
      next: 'view3',
      prev: 'view1',
      formData: {}
    },
    'view3': {
      next: 'view4',
      prev: 'view2',
      formData: {}
    },
    'view4': {
      next: null,
      prev: 'view3',
      formData: {}
    }
  }
};

export default state;
