import { Button, CircularProgress, Container, Grid, Paper, Snackbar, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAnswer } from '../../../actions/answer';
import { getForm } from '../../../actions/forms';
import { ERROR } from '../../../constants/actionTypes';
import Answer from '../../../models/answer';
import FormAnswer from '../../../models/formAnswer';
import Alert from '../../Helpers/Alert';
import LinearScaleAnswer from '../../Helpers/LinearScale/LinearScaleAnswer';
import LongTextAnswer from '../../Helpers/LongText/LongTextAnswer';
import MultipleChoiceAnswer from '../../Helpers/MultipleChoice/MultipleChoiceAnswer';
import ShortTextAnswer from '../../Helpers/ShortText/ShortTextAnswer';
import SingleChoiceAnswer from '../../Helpers/SingleChoice/SingleChoiceAnswer';
import useStyles from './styles';

const AnswerForm = () => {
    const history = useHistory();
    const { id } = useParams<any>();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { form, isLoading } = useSelector((state: any) => state.forms);
    const { error } = useSelector((state: any) => state.error);
    const [showError, setShowError] = useState(false);
    const [nick, setNick] = useState('');
    const [formAnswer, setFormAnswer] = useState(null);

    useEffect(() => {
        dispatch(getForm(id));
    }, [id]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);
    
    useEffect(() => {
        if(formAnswer) {
            let newFormAnswer = formAnswer;
            newFormAnswer.nick = nick;
            setFormAnswer(newFormAnswer);
        }
    }, [nick]);

    useEffect(() => {
        const answers = [];
        if(form) {
            for(let section of form.sections) {
                const answer = new Answer(section.questionType, section.required, section.questionText) ;
                answers.push(answer);
            }
            const newFormAnswer = new FormAnswer(form._id);
            newFormAnswer.answers = answers;
            setFormAnswer(newFormAnswer);
        }
    }, [form]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: ERROR, data: null });
        setShowError(false);
    };
    
    const handleTextChange = (index, event) => {
        const newFormAnswer = JSON.parse(JSON.stringify(formAnswer));
        newFormAnswer.answers[index].text = event.target.value;
        setFormAnswer(newFormAnswer);
    }

    const handleSingleOption = (option, index) => {
        const newFormAnswer = JSON.parse(JSON.stringify(formAnswer));
        if(newFormAnswer) {
            newFormAnswer.answers[index].singleOption = option;
            setFormAnswer(newFormAnswer);
        }
    }

    const handleMultipleOptions = (obj, index) => {
        const newFormAnswer = JSON.parse(JSON.stringify(formAnswer));
        const options = [];

        for(let prop of Object.getOwnPropertyNames(obj)) {
            if(prop !== 'otherOption') {
                if(obj[prop]) {
                    options.push(prop);
                }
            }
            else if (prop === 'otherOption' && obj.otherOption.trim().length > 0) {
                options.push(obj.otherOption);
            }
        }

        if(newFormAnswer) {
            newFormAnswer.answers[index].multiOptions = options;
            setFormAnswer(newFormAnswer);
        }
    }

    const handleLinearOption = (option, index) => {
        const newFormAnswer = JSON.parse(JSON.stringify(formAnswer));
        if(newFormAnswer) {
            newFormAnswer.answers[index].linearOption = option;
            setFormAnswer(newFormAnswer);
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formResult = validateForm(formAnswer);
        if (!formResult.ok) {
            return dispatch({ type: ERROR, data: { error: formResult.error } });
        }

        dispatch(addAnswer(formAnswer, history));
    } 

    const validateForm = (form) => {
        if (nick.trim().length === 0) {
            return { ok: false, error: "No nick given" };
        }

        for (let answer of form.answers) {
            if(answer.required && (answer.questionType === 'shortText' || answer.questionType === 'longText') && answer.text.trim().length === 0) {
                return { ok: false, error: "No text answer given" };
            }

            if(answer.required && answer.questionType === 'singleChoice' && answer.singleOption.trim().length === 0) {
                return { ok: false, error: "No single choice answer given" };
            }

            if(answer.required && answer.questionType === 'multipleChoice' && answer.multiOptions.length === 0) {
                return { ok: false, error: "No multiple choice answer given" };
            }

            if(answer.required && answer.questionType === 'linearScale' && answer.linearOption === -1) {
                return { ok: false, error: "No linear answer given" };
            }
        }
        return { ok: true }
    }


    if (isLoading) {
        return (
            <Container component="main" style={{ marginTop: "100px" }}>
                <Paper elevation={6} className={classes.loadingPaper} style={{ marginTop: "80px" }}>
                    <CircularProgress size="7em" color="secondary" />
                </Paper>
            </Container>
        );
    }

    if(!form) return null;

    return (
        <Container component="main" style={{ marginTop: "100px" }}>
            <form onSubmit={handleSubmit}>
                <Paper className={classes.paper} elevation={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} alignItems="center">
                            <Typography component="h1" variant="h5" align="center" gutterBottom>Add answer</Typography>
                            <Typography component="h1" variant="h6"><span style={{fontWeight: 300}}>Form title: </span>{form.title}</Typography>
                            <Typography gutterBottom component="h1" variant="h6"><span style={{fontWeight: 300}}>Form description: </span>{form.description}</Typography>
                            <TextField label="Your nick *" value={nick} onChange={(e) => setNick(e.target.value)} />
                        </Grid>
                    </Grid>
                </Paper>
                {form.sections.map((section, index) => {
                        return (
                            <Paper key={index} className={classes.paper} elevation={6} style={{ marginTop: "10px" }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={5}>
                                        <Typography component="h1" variant="h6" gutterBottom noWrap><span style={{fontWeight: 300}}>Question{section.required && '*'} :</span> {section.questionText}</Typography>
                                    </Grid>
                                    {section.questionType === 'shortText' ?
                                            <ShortTextAnswer section={section} handleTextChange={handleTextChange} index={index} />
                                            : (
                                                section.questionType === 'longText' ?
                                                    <LongTextAnswer section={section} handleTextChange={handleTextChange} index={index} />
                                                    : (
                                                        section.questionType === 'singleChoice' ?
                                                            <SingleChoiceAnswer section={section} handleSingleOption={handleSingleOption} index={index} />
                                                            : (
                                                                section.questionType === 'multipleChoice' ?
                                                                    <MultipleChoiceAnswer section={section} handleMultipleOptions={handleMultipleOptions} index={index} />
                                                                    :
                                                                    <LinearScaleAnswer section={section} handleLinearOption={handleLinearOption} index={index} />
                                                            )
                                                    )
                                            )
                                    }
                                </Grid>
                            </Paper>
                        )
                    })
                }
                <Button variant="contained" color="primary" fullWidth type="submit">Save answer</Button>
            </form>
            <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" className={classes.alert}>{error}</Alert>
            </Snackbar>
        </Container>
    )
}

export default AnswerForm;