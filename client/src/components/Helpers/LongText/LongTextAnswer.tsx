import { Grid, TextField } from '@material-ui/core';
import React from 'react';

const LongTextAnswer = ({ section, handleTextChange, index }) => {
    return (
        <Grid item xs={12}>
            <TextField id="standard-required" label="Answer" fullWidth onChange={(e) => handleTextChange(index, e)} />
        </Grid>
    )
}

export default LongTextAnswer; 