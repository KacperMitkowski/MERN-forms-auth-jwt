import { Accordion, AccordionDetails, AccordionSummary, CircularProgress, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAnswers } from '../../../actions/answer';
import { getForm } from '../../../actions/forms';
import useStyles from './styles';

const ShowAnswers = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { form, isLoading } = useSelector((state: any) => state.forms);
    const { answers } = useSelector((state: any) => state.answers);
    const { id } = useParams<any>();

    useEffect(() => {
        dispatch(getForm(id));
    }, [id])

    useEffect(() => {
        dispatch(getAnswers(id));
    }, [id])

    if (isLoading) {
        return (
            <Container component="main" style={{ marginTop: "100px" }}>
                <Paper elevation={6} className={classes.loadingPaper} style={{ marginTop: "80px" }}>
                    <CircularProgress size="7em" color="secondary" />
                </Paper>
            </Container>
        );
    }

    if (!form) return null;
    if (!answers) return null;

    const getCorrectAnswer = (answer, index) => {
        if (answer.questionType === 'shortText') {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <Typography>{answer.questionText}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>Short text</Typography></TableCell>
                    <TableCell align="right"><Typography>{answer.required ? 'YES' : 'NO'}</Typography></TableCell>
                    <TableCell align="right">{answer.text ? answer.text : '(no answer)'}</TableCell>
                </TableRow>
            )
        }
        else if (answer.questionType === 'longText') {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <Typography>{answer.questionText}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>Long text</Typography></TableCell>
                    <TableCell align="right"><Typography>{answer.required ? 'YES' : 'NO'}</Typography></TableCell>
                    <TableCell align="right">{answer.text ? answer.text : '(no answer)'}</TableCell>
                </TableRow>
            )
        }
        else if (answer.questionType === 'singleChoice') {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <Typography>{answer.questionText}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>Single choice</Typography></TableCell>
                    <TableCell align="right"><Typography>{answer.required ? 'YES' : 'NO'}</Typography></TableCell>
                    <TableCell align="right">{answer.singleOption ? answer.singleOption : '(no answer)'}</TableCell>
                </TableRow>
            )
        }
        else if (answer.questionType === 'multipleChoice') {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <Typography>{answer.questionText}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>Multiple choice</Typography></TableCell>
                    <TableCell align="right"><Typography>{answer.required ? 'YES' : 'NO'}</Typography></TableCell>
                    <TableCell align="right">{answer.multiOptions && answer.multiOptions.length > 0 ? answer.multiOptions.join(', ') : '(no answer)'}</TableCell>
                </TableRow>
            )
        }
        else if (answer.questionType === 'linearScale') {
            return (
                <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        <Typography>{answer.questionText}</Typography>
                    </TableCell>
                    <TableCell align="right"><Typography>Linear scale</Typography></TableCell>
                    <TableCell align="right"><Typography>{answer.required ? 'YES' : 'NO'}</Typography></TableCell>
                    <TableCell align="right">{answer.linearOption ? answer.linearOption : '(no answer)'}</TableCell>
                </TableRow>
            )
        }
    }

    return (
        <Container component="main" style={{ marginTop: "100px" }}>
            <Paper className={classes.paper} elevation={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12} alignItems="center">
                        <Typography component="h1" variant="h5" align="center" gutterBottom>Answers</Typography>
                        <Typography component="h1" variant="h6"><span style={{ fontWeight: 300 }}>Form title: </span>{form.title}</Typography>
                        <Typography gutterBottom component="h1" variant="h6"><span style={{ fontWeight: 300 }}>Form description: </span>{form.description}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            {answers.length > 0 ?
                answers.map((formAnswer, index) => {
                    return (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
                                <Typography className={classes.heading}>Answer author: {formAnswer.nick}</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ display: "block" }}>
                                <TableContainer>
                                    <Table className={classes.table} size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Question</TableCell>
                                                <TableCell align="right">Question type</TableCell>
                                                <TableCell align="right">Required answer</TableCell>
                                                <TableCell align="right">Answer</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {formAnswer.answers &&
                                                formAnswer.answers.map((answer, index) => {
                                                    return getCorrectAnswer(answer, index)
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
                :
                <Accordion>
                    <AccordionSummary aria-controls="panel1a-content">
                        <Typography className={classes.heading}>No answers</Typography>
                    </AccordionSummary>
                </Accordion>
            }
        </Container>
    )
}

export default ShowAnswers;