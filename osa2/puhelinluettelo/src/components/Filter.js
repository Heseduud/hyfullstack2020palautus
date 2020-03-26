import React from 'react'

const Filter = (props) => {
    return (
        <div>Filter shown with Name:
             <input value={props.filterName} onChange={props.handleFilter}>
                 </input></div>
    )
} 

export default Filter