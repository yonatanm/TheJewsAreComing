import PropTypes from "prop-types"
import React from "react"

export function SelectableOption({ selected, children, onSelect }) {
  return <span className={`option ${selected ? 'selected' : ''}`} onClick={onSelect}>{children}</span>
}

SelectableOption.propTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
}
