import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Grid, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import useStyles from './styles';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Autocomplete } from '@material-ui/lab';

export const AddForm = () => {
    const classes = useStyles();
    const [questionsNumber, setQuestionsNumber] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getQuestions = () => {
        const x = [];
        for (let i = 0; i < questionsNumber; i++) {
            x.push(
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Paper className={classes.paper} elevation={3}>
                            <div style={{display: "flex", justifyContent: "space-around", width: "100%"}}>
                                <TextField placeholder="Pytanie" variant="filled" />
                                <Autocomplete
                                fullWidth
                                    size="medium"
                                    options={top100Films}
                                    getOptionLabel={(option) => option.title}
                                    defaultValue={top100Films[0]}
                                    renderInput={(params) => (
                                        <TextField {...params} variant="standard" placeholder="Favorites" />
                                    )}
                                />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            )
        }
        return x;
    }

    return (
        <Container component="main" maxWidth="md" style={{ marginTop: "100px" }}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={10}>
                    <Paper className={classes.paper} elevation={6}>
                        <Typography component="h1" variant="h5">Add Form</Typography>
                        <AddCircleTwoToneIcon fontSize="large" color="primary" />
                        <TextField placeholder="Formularz bez nazwy" fullWidth variant="filled" inputProps={{ style: { fontSize: 40 } }} style={{ fontSize: "30px" }} />
                        <TextField placeholder="Opis formularza" fullWidth />
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <ButtonGroup orientation="vertical" variant="contained" color="primary">
                        <Tooltip title="Dodaj pytanie" placement="right"><Button onClick={() => setQuestionsNumber(questionsNumber + 1)}><AddCircleOutlineOutlinedIcon /></Button></Tooltip>
                        <Tooltip title="Usuń pytanie" placement="right"><Button disabled={questionsNumber === 0} onClick={() => setQuestionsNumber(questionsNumber - 1)}><DeleteForeverOutlinedIcon /></Button></Tooltip>
                    </ButtonGroup>
                </Grid>
            </Grid>
            {
                getQuestions().map(question => question)
            }
        </Container>
    )
}

export default AddForm;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },


];