/*
  用高阶组件生产一个新的组件,新的组件只会在业务需要时才会重新渲染
  常规业务有两种
    1. 组件有N多属性,只有特定的几个属性更新时才需要重新渲染,这时候应该用 onlyUpdateBy 指定需要重新渲染的属性,
      只有这些指定属性更新时才会重新渲染
    2. 组件有N多属性,只有特定几个属性更新不需要重新渲染,这时候应该用 noUpdateBy 指定不需要重新渲染的属性

  由于 React 的 ref 是一个特殊的属性,不能通过 props 传递给子组件,所以我们用 childRef 来替代 ref,被这个组件包装过的组件
  需要用 ref 时请用 childRef 替代.
   
 */
import React, { Component } from 'react'

function isEqual(a, b) {
  return a === b
}
function getName(klass) {
  return klass.displayName || klass.name
}

function theHOC(propList, isUpdate, SlowComponent) {
  let displayName = getName(SlowComponent)
  if (process.env.NODE_ENV !== 'production') {
    let tip = isUpdate ? 'will only' : 'will not'
    tip += ' be updated ty these props'
    console.info(displayName, tip, propList.toString())
  }

  return class extends Component {
    static displayName = 'SU' + displayName
    shouldComponentUpdate(nextProps) {
      let {
        props
      } = this
      let shouldUpdateProps
      if (isUpdate) {
        shouldUpdateProps = propList
      } else {
        shouldUpdateProps = Object.keys(nextProps).filter(key => {
          return propList.indexOf(key) === -1
        })
      }
      let shouldNotUpdate = shouldUpdateProps.every(key => {
        return isEqual(props[key], nextProps[key])
      })
      return !shouldNotUpdate
    }
    render() {
      let { childRef, ...rest } = this.props
      return <SlowComponent ref={childRef} {...rest} />
    }
  }
}
export function onlyUpdateBy(propList) {
  return theHOC.bind(null, propList, true)
}
export function noUpdateBy(propList) {
  return theHOC.bind(null, propList, false)
}
