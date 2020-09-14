import PropTypes from "prop-types"
import React from "react"
import { SelectableOption } from "./selectableOption"

export function ListOptions({ sortType, setSortType, displayType, setDisplayType }) {
  return <div className="list-options">
    <span>
      מיין לפי
      <SelectableOption selected={sortType === 'frequency'} onSelect={() => setSortType('frequency')}>שכיחות</SelectableOption>
      <SelectableOption selected={sortType === 'alphabet'} onSelect={() => setSortType('alphabet')}>אלף-בית</SelectableOption>
    </span>
    <span>
      הצג בתור
      <SelectableOption selected={displayType === 'list'} onSelect={() => setDisplayType('list')}>רשימה</SelectableOption>
      <SelectableOption selected={displayType === 'cloud'} onSelect={() => setDisplayType('cloud')}>ענן</SelectableOption>
    </span>
  </div>
}
ListOptions.propTypes = {
  sortType: PropTypes.oneOf(['frequency', 'alphabet']).isRequired,
  setSortType: PropTypes.func.isRequired,
  displayType: PropTypes.oneOf(['list', 'cloud']).isRequired,
  setDisplayType: PropTypes.func.isRequired,
}
