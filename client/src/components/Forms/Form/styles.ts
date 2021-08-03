import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275,
      height: 500,
      padding: "5px",
      position: "relative",
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    media: {
      height: 0,
      paddingTop: '76.25%'
    },
    button: {
      position: 'absolute',
      bottom: 10,
    }
  }),
);