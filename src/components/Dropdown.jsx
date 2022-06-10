import { Dropdown, Button } from 'gestalt';
import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function KitDropdown({ options, id, label, onSelect, selected }) {
  const [openLevel, setOpenLevel] = useState(false);
  const anchorRef = useRef(null);
  const onSelectItem = (_e, item) => {
    setOpenLevel(false);
    onSelect(item);
  };
  return (
    <div>
      <Button
        accessibilityControls={id}
        accessibilityExpanded={openLevel}
        accessibilityHaspopup
        iconEnd="arrow-down"
        onClick={() => setOpenLevel((prevVal) => !prevVal)}
        ref={anchorRef}
        selected={openLevel}
        text={label}
      />
      {openLevel && (
        <Dropdown
          anchor={anchorRef.current}
          id={id}
          onDismiss={() => setOpenLevel(false)}
          onSelect={onSelectItem}>
          {options.map((option) => (
            <Dropdown.Item key={option.value} option={option} selected={selected} />
          ))}
        </Dropdown>
      )}
    </div>
  );
}

KitDropdown.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.array,
  onSelect: PropTypes.func,
  selected: PropTypes.string
};

export default KitDropdown;
