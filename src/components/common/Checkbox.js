import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';  // Assuming you're using reactstrap

const Checkbox = ({ id, name, label, checked, onChange, disabled }) => {
  return (
    <FormGroup check>
      <Input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <Label check htmlFor={id}>
        {label}
      </Label>
    </FormGroup>
  );
};

export default Checkbox;
