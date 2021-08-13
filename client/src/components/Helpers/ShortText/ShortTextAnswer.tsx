import { Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';

const ShortTextAnswer = ({ section, handleTextChange, index }) => {
    return (
        <Grid item xs={12}>
            <TextField id="standard-required" label="Answer" onChange={(e) => handleTextChange(index, e)} />
        </Grid>
    )
}

export default ShortTextAnswer;