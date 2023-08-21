import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

describe('Blog component test', () => {

    let component;

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        component = render(
            <Blog>
                <div className='testDiv'> </div>
            </Blog>
        )

    })


    test('renders its children', () => {
        expect(
          // eslint-disable-next-line testing-library/no-node-access
          component.container.querySelector('.testDiv')
        ).toBeDefined()
      })

})