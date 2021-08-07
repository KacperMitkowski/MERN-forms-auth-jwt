import { Grid, TextField } from '@material-ui/core';
import React from 'react';

const ShortText = () => {
    return (
        <Grid item xs={5}>
            <TextField placeholder="Tekst krótkiej odpowiedzi" fullWidth disabled />
        </Grid>
    )
}

export default ShortText;