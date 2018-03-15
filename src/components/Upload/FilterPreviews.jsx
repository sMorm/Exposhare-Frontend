import './styles/FilterPreviews.scss'
import filters from '../../shared/data/filters'
import React, { Component } from 'react'

export default class FilterPreviews extends Component {
  render() {
    const { image } = this.props
    return (
      <div className='filterPreviewsContainer'>
        {
          filters.map((filter, key) => {
            return (
              <span className='filterPreview' key={key} onClick={() => this.props.setFilter(filter.css)}>
                <img 
                  src={image} 
                  alt={`${filter.name} preview`} 
                  style={{ filter: filter.css }}
                />
                <h4>{filter.name}</h4>
              </span>
            )
          })
        }
      </div>
    )
  }
}
