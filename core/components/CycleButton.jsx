import { useCallback, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Button } from "./Button";
import { Icon } from "./Icon";

const CycleButtonBase = styled(Button)`
  position: relative;
  padding-bottom: 6px;
`;

const Blob = styled(Icon).attrs((p) => ({
  name: "faCircle",
  style: {
    color: p.selected ? "var(--color-font)" : "var(--color-font-disabled)",
  },
}))`
  font-size: 0.4em;
  margin-left: 2px;
  margin-right: 2px;
`;

const BlobContainer = styled.span`
  position: absolute;
  bottom: 4px;
`;

const Blobs = ({ options, selectedIndex }) => {
  return (
    <BlobContainer>
      {options.map((o, i) => (
        <Blob selected={i === selectedIndex} key={`${o.value}_${i}`} />
      ))}
    </BlobContainer>
  );
};
export const CycleButton = ({ value, options, onClick, ...rest }) => {
  const [selectedIndex, label] = useMemo(() => {
    const index = options.findIndex((o) => o === value || o.value === value);
    return [index, options[index]?.label || options[index]];
  }, [options, value]);

  const callback = useCallback(
    (e) => {
      e.preventDefault();
      const newIndex = (selectedIndex + (e.button === 0 ? 1 : options.length - 1)) % options.length;
      onClick(options[newIndex]?.value ?? options[newIndex]);
    },
    [options, selectedIndex]
  );

  return (
    <CycleButtonBase active={false} onClick={callback} {...rest}>
      {label}
      {options.length > 0 && <Blobs options={options} selectedIndex={selectedIndex} />}
    </CycleButtonBase>
  );
};

CycleButton.propTypes = {
  value: PropTypes.any.isRequired,
  options: PropTypes.array,
  onClick: PropTypes.func,
};
