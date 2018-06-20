# shouldUpdateHOC [中文](README.cn.md)

to promote performance of react app, you probably will use shouldComponentUpdate, return true of false by if some props changed.
but it's tedious to add shouldComponentUpdate for very much components. the shouldUpdateHOC can help you implement the tedious shouldComponentUpdate.

shouldUpdateHOC is a high order component which can generate a new component. the new component only reRender when necessary
we have two general case:
1. the component has N props, only some particular should trigger reRender,then you can use onlyUpdateBy to config the special props which will trigger reRender
2. on the contrary, many props should trigger reRender ,only a litter will not, then you can use
noUpdateBy.

Because of ref is a special prop in React , it can't be passed to child component by props. so we use childRef instead of ref, if you need use ref, please use childRef instead of ref.

## Usages

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
