// import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import Cell from './Cell'

// configure({ adapter: new Adapter() })

describe('Cell', () => {
  it('renders without crahsing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Cell />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('renders 0 with no text', () => {
    const wrapper = shallow(<Cell number={0} />)
    expect(wrapper.text()).toBe('')
  })

  it('renders 1 with 1 text', () => {
    const wrapper = shallow(<Cell number={1} />)
    expect(wrapper.text()).toBe('1')
  })

  it('simulate click', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Cell number={2} handleClick={mock} />)
    wrapper.simulate('click')
    expect(wrapper.text()).toBe('2')
    expect(mock.mock.calls.length).toBe(1)
  })
})
