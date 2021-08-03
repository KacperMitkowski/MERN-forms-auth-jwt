import React, { useState } from 'react';
import { Button, Grid, Card, CardContent, CardActions, Typography, CardMedia, IconButton } from '@material-ui/core';
import useStyles from './styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import noImage from '../../../images/no-image.png';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Form = ({ form }: any) => {    
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div>FORM</div>
    )
}

export default Form;