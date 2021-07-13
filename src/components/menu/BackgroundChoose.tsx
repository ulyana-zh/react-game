import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

export default function BackgroundChoose(props: any) {
  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="color" name="background" defaultValue="blue">
        <FormControlLabel
          value="blue"
          control={<Radio color='primary'/>}
          label="1"
          labelPlacement="bottom"
          onChange={props.handleChange}
        />
         <FormControlLabel
          value="red"
          control={<Radio color='primary'/>}
          label="2"
          labelPlacement="bottom"
          onChange={props.handleChange}
        />
         <FormControlLabel
          value="yellow"
          control={<Radio color='primary' />}
          label="3"
          labelPlacement="bottom"
          onChange={props.handleChange}
        />
        
      </RadioGroup>
    </FormControl>
  );
}
