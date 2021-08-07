import { Grid, TextField } from '@material-ui/core';
import React from 'react';

const LongText = () => {
    return (
        <Grid item xs={10}>
            <TextField placeholder="Tekst długiej odpowiedzi" fullWidth disabled />
        </Grid>
    )
}

export default LongText;