import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Tooltip, Typography } from '@material-ui/core';
import useStyles from './styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FormGroup } from '@material-ui/core';
import Section from './Section';
import Sections from './Sections';

export const AddForm = () => {
    const classes = useStyles();
    const [sectionsNumber, setSectionsNumber] = useState(0);

    return (
        <Container component="main" style={{ marginTop: "100px" }}>
            <Paper className={classes.paper} elevation={6}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={10} alignItems="center">
                        <Typography component="h1" variant="h5" align="center" gutterBottom>Add Form</Typography>
                        <TextField placeholder="Formularz bez nazwy" fullWidth variant="filled" inputProps={{ style: { fontSize: 40 } }} style={{ fontSize: "30px", marginBottom: "30px" }} />
                        <TextField placeholder="Opis formularza" fullWidth style={{ marginBottom: "30px" }} />
                    </Grid>
                    {sectionsNumber === 0 &&
                        <Grid item xs={12} sm={2}>
                            <ButtonGroup orientation="vertical" variant="contained" color="primary">
                                <Tooltip title="Dodaj pytanie" placement="right"><Button onClick={() => setSectionsNumber(sectionsNumber + 1)}><AddCircleOutlineOutlinedIcon /></Button></Tooltip>
                            </ButtonGroup>
                        </Grid>
                    }
                </Grid>
            </Paper>
            <Sections sectionsNumber={sectionsNumber} setSectionsNumber={setSectionsNumber} />
        </Container>
    )
}

export default AddForm;