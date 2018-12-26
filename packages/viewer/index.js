import AcViewer from './src/index.vue';

AcViewer.install = Vue => {
  Vue.component(AcViewer.name, AcViewer);
};

export { AcViewer };

export default {
  install (Vue, options) {
    const Viewer = Vue.extend(AcViewer);
    const viewers = {}

    function showViewer(arg, index) {
      viewers[arg].open(index)
    }
    function addViewer(arg, img) {
      if (!viewers[arg]) {
        viewers[arg] = new Viewer({
          el: document.createElement('div'),
        })
        for (let i in options) {
          viewers[arg][i] = options[i]
        }
        document.body.appendChild(viewers[arg].$el);
      }
      const url = img.src || img
      url && viewers[arg].images.push(url)
      return viewers[arg].images.length - 1
    }
    function removeViewer(arg) {
      if (viewers[arg]) {
        viewers[arg].$el.remove()
        viewers[arg] = null
      }
    }
    Vue.directive('viewer', {
      bind(el, binding) {
        const {arg = 'viewer'} = binding
        const index = addViewer(arg, el)
        el.addEventListener('click', () => showViewer(arg, index), false)
      },
      unbind (el, binding) {
        const {arg = 'viewer'} = binding
        removeViewer(arg)
      }
    })
    Vue.directive('viewers', {
      bind(el, binding) {
        const dataImages = el.dataset.images
        const {arg = 'viewer'} = binding
        let images = null
        if (dataImages) {
          images = dataImages.split(',')
          el.addEventListener('click', () => showViewer(arg, 0), false)
        } else {
          images = el.getElementsByTagName('img')
        }
        for (let i = 0; i < images.length; i++) {
          const index = addViewer(arg, images[i])
          dataImages || images[i].addEventListener('click', () => showViewer(arg, index), false)
        }
      },
      unbind (el, binding) {
        const {arg = 'viewer'} = binding
        removeViewer(arg)
      }
    })
  }
};
