import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import useSound from 'use-sound';

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

export default function SoundSlider(): any {
  const buttonSoundUrl = 'assets/sounds/Bulle.wav'
  const classes = useStyles();
  const [value, setValue] = React.useState<number>(100);
  const [play] = useSound(buttonSoundUrl, { volume: value / 100 });

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
    //valueLevel = newValue;
  };

  return (
    <div className={classes.root}>
      <Typography id="continuous-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid>
    </div>
  );
}