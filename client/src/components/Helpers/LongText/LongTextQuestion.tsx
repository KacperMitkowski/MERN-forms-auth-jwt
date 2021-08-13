import { Grid, TextField } from '@material-ui/core';
import React from 'react';

const LongTextQuestion = () => {
    return (
        <Grid item xs={10}>
            <TextField placeholder="Long text" fullWidth disabled />
        </Grid>
    )
}

export default LongTextQuestion;