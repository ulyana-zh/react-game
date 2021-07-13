import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  label: {
    fontSize: 12,
    marginTop: 10
  }
});

export default function SoundSlider(props: any): any {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label} id="continuous-slider" gutterBottom>
        {`${props.type} Volume`}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={props.value} onChange={props.handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  );
}