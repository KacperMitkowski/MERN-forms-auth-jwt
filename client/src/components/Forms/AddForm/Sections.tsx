import { Grid, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import Section from './Section';
import useStyles from './styles';

const Sections = ({ sectionsNumber, setSectionsNumber }) => {
    const classes = useStyles();

    const sections = [];
    for (let i = 1; i <= sectionsNumber; i++) {
        sections.push(
            <Paper className={classes.paper} elevation={6} key={i}>
                <Grid container spacing={3}>
                    <Section sectionIndex={i} sectionsNumber={sectionsNumber} setSectionsNumber={setSectionsNumber} />
                </Grid>
            </Paper>
        )
    }
    return <>{sections}</>;
}

export default Sections;