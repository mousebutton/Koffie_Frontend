import Vue from 'vue'
import Home from '@/components/Home'

<<<<<<< HEAD
describe('Hello.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    
=======
describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
>>>>>>> d9304f4d449df96be26b595f7841ae735ded9efd
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Hallo')
  })
})
