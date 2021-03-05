import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export function CardsChoose(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group" size='small'>
        <Button value="react" onClick={props.handleCardsChoose}>Classic</Button>
        <Button value="neon" onClick={props.handleCardsChoose}>Neon</Button>
      </ButtonGroup>
    </div>
  );
}

export function CardsSetChoose(props: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ButtonGroup color="primary" aria-label="outlined primary button group" size='small'>
        <Button value="space" onClick={props.handleCardsSetChoose}>Space Set1</Button>
        <Button value="fruits" onClick={props.handleCardsSetChoose}>Space Set2</Button>
      </ButtonGroup>
    </div>
  );
}