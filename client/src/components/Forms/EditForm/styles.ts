import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {

    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(2),
    },
    icon: {
      margin: theme.spacing(1),
    },

    alert: {
      backgroundColor: '#f50057',
    },
    loadingPaper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      borderRadius: '15px',
      height: '39vh',
      marginTop: '1rem'
    },
    underline: {
      '&::after': {
        border: '2px solid #3f51b5',
        width: '300px',
        marginLeft: '30px'
      },
      '&::before': {
        borderBottom: '2px solid #3f51b5',
        width: '300px',
        marginLeft: '30px'
      }
    }, 
    underlineLinear: {
      '&::after': {
        border: '2px solid #3f51b5',
        width: '300px',
        marginLeft: '20px'
      },
      '&::before': {
        borderBottom: '2px solid #3f51b5',
        width: '300px',
        marginLeft: '20px'
      }
    },
    typographyLinear: {
      maxWidth: '150px',
      paddingTop: '30px'
    },
    singleChoiceOption: {
      fontSize: '13px',
      color: '#3f51b5',
      '&:hover': {
        cursor: "pointer"
      }
    },
    singleChoiceButtonsContainer: {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    },

    singleChoiceOptionMargin: {
      marginLeft: '140px',
      '&:hover': {
        cursor: "pointer"
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);