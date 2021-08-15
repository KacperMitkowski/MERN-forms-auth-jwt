import { Button } from '@material-ui/core';
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';

const LinearScaleAnswer = ({ section, handleLinearOption, index }) => {
    const [value, setValue] = useState(-1);

    useEffect(() => {
        handleLinearOption(value, index);
    }, [value])

    const getScale = () => {
        const options = [];
        for (let i = section.linearDetails.min; i <= section.linearDetails.max; i++) {
            options.push(
                <FormControlLabel
                    checked={value === i}
                    onChange={() => setValue(i)}
                    key={i}
                    control={<Radio color="primary" />}
                    label={i}
                    labelPlacement="top"
                />
            )
        }
        return options;
    }

    return (
        <>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <Typography style={{ maxWidth: '150px', paddingTop: '30px' }} noWrap>{section.linearDetails.minText}</Typography>
                        {getScale().map(option => option)}
                        <Typography style={{ maxWidth: '150px', paddingTop: '30px' }} noWrap>{section.linearDetails.maxText}</Typography>
                    </RadioGroup>
                </FormControl>
            </Grid>
            {value >= 0 &&
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button variant="contained" color="primary" onClick={() => setValue(-1)}>Uncheck</Button>
                </Grid>
            }
        </>
    )
}

export default LinearScaleAnswer;