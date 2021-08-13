import { Grid, TextField } from '@material-ui/core';
import React from 'react';

const ShortTextQuestion = () => {
    return (
        <Grid item xs={5}>
            <TextField placeholder="Short text" fullWidth disabled />
        </Grid>
    )
}

export default ShortTextQuestion;