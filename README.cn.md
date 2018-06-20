# shouldUpdateHOC [English](README.md)

react app的性能优化一般是通过shouldComponentUpdate来做的,在函数内判断外部传入的props有没有更新来决定是否要重新渲染.
但是每个组件都自己来写是非常繁琐的,而且还要考虑state的变化.shouldUpdateHOC 可以帮你很方便的实现shouldComponentUpdate.

shouldUpdateHOC 用高阶组件生产一个新的组件,新的组件只会在业务需要时才会重新渲染
常规业务有两种
1. 组件有N多属性,只有特定的几个属性更新时才需要重新渲染,这时候应该用onlyUpdateBy指定需要重新渲染的属性,
  只有这些指定属性更新时才会重新渲染
2. 组件有N多属性,只有特定几个属性更新不需要重新渲染,这时候应该用noUpldateBy指定不需要重新渲染的属性

由于 React 的 ref 是一个特殊的属性,不能通过 props 传递给子组件,所以我们用 childRef 来替代 ref,被这个组件包装过的组件需要用 ref 时请用 childRef 替代.

## 使用方法

    npm install should-update-hoc

  ```js
  import { noUpdateBy } from 'common/shouldUpdate'

  const HOC = noUpdateBy(['onChange'])
  class YourComponent extends React.Component {
    render() {
      // xxx
    }
  }
  export default HOC(YourComponent)

  //or
  import { onlyUpdateBy } from 'common/shouldUpdate'

  const HOC = onlyUpdateBy(['dataSource', 'loading'])
  class YourComponent extends React.Component {
    render() {
      // xxx
    }
  }
  export default HOC(YourComponent)
  ```

  ```js
  import YourComponent from './path/YourComponent'
  class extends React.Component {
    render() {
      // if you need ref, please use childRef instead
      return <YourComponent childRef={instance => this.myInstance = instance} />
    }
  }

  ```
##License
The MIT License (MIT)

Copyright (c) 2016 Marc Binder chaos.forfun@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
