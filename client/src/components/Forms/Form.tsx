import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import FormModel from '../../models/form';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

interface props {
    form: FormModel
}

const Form = (props: props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const profile = localStorage.getItem('profile')!;
    const loggedUser = JSON.parse(profile);

    return (
        <Grid item xs={12} md={6} lg={3} style={{marginTop: "10px"}}>
            <Card className={classes.root} raised>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{props.form.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{props.form.description}</Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>Ilość pytań: {props.form.sections.length}</Typography>
                </CardContent>
                <CardActions>
                {loggedUser && Object.keys(loggedUser).length !== 0 && loggedUser?.result?._id === props.form.userId &&
                        <>
                            <IconButton title="Usuń formularz" aria-label="delete"  onClick={() => {}}>
                                <DeleteIcon fontSize="large" color="secondary" />
                            </IconButton>
                            <IconButton title="Edytuj formularz" aria-label="edit"  onClick={() => history.push(`/editForm/${props.form._id}`)}>
                                <EditRoundedIcon fontSize="large" color="secondary" />
                            </IconButton>
                        </>
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Form;