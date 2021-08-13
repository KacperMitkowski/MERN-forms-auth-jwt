import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import FormModel from '../../models/form';
import DeleteIcon from '@material-ui/icons/Delete';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import { deleteForm } from '../../actions/forms';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAnswers } from '../../api';

interface props {
    form: FormModel
}

const Form = (props: props) => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const profile = localStorage.getItem('profile')!;
    const loggedUser = JSON.parse(profile);
    const [answersNumber, setAnswerNumbers] = useState(0);
    
    useEffect(() => {
        const fetchAnswers = async () => {
            const obj = await getAnswers(props.form._id);
            const answers = obj.data;
            setAnswerNumbers(answers.length);
        }
        fetchAnswers();

    }, [props.form._id]);

    return (
        <Grid item xs={12} md={6} lg={3} style={{ marginTop: "10px" }}>
            <Card className={classes.root} raised>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" noWrap>{props.form.title}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p" gutterBottom noWrap>Description: {props.form.description}</Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom noWrap>Questions' number: {props.form.sections.length}</Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom noWrap>Answers' number: {answersNumber}</Typography>
                </CardContent>
                <CardActions>
                    <IconButton title="Add answer" aria-label="answer" onClick={() => history.push(`/answerForm/${props.form._id}`)}>
                        <QuestionAnswerIcon fontSize="large" color="secondary" />
                    </IconButton>
                    <IconButton title="All answers" aria-label="answer" onClick={() => history.push(`showAnswers/${props.form._id}`)}>
                        <ImportContactsIcon fontSize="large" color="secondary" />
                    </IconButton>
                    {loggedUser && Object.keys(loggedUser).length !== 0 && loggedUser?.result?._id === props.form.userId &&
                        <>
                            <IconButton title="Edit form" aria-label="edit" onClick={() => history.push(`/editForm/${props.form._id}`)}>
                                <EditRoundedIcon fontSize="large" color="secondary" />
                            </IconButton>
                            <IconButton title="Delete form" aria-label="delete" onClick={() => dispatch(deleteForm(props.form._id, history))}>
                                <DeleteIcon fontSize="large" color="secondary" />
                            </IconButton>
                        </>
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Form;