import React from 'react'

function ListCard({ text, url }) {
  return (
    <li><a href={url}>{ text }</a></li>
  )
}

export default ListCard