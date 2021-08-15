import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const SingleChoiceAnswer = ({ section, handleSingleOption, index }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [otherOption, setOtherOption] = useState('');
    const [option, setOption] = useState('');

    useEffect(() => {
        handleSingleOption(option, index)
    }, [option]);

    return (
        <>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Choose only one option</FormLabel>
                    <RadioGroup aria-label="singleChoice" name="singleChoice" value={selectedValue} onChange={(e) => {
                        setSelectedValue(e.target.value);
                        setOption(e.target.value);
                        setOtherOption('');
                    }}>
                        {
                            section.singleMultiDetails.options.map((option, index) => {
                                return (
                                    <FormControlLabel key={index} value={option} control={<Radio color="primary" />} label={option} />
                                )
                            })
                        }
                    </RadioGroup>
                    {section.singleMultiDetails.otherOption &&
                        <TextField id="standard-required" label="Other answer" value={otherOption} disabled={selectedValue.length > 0} onChange={(e) => {
                            setOtherOption(e.target.value);
                            setOption(e.target.value);
                        }}/>
                    }
                </FormControl>
            </Grid>
            {selectedValue &&
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={() => {
                        setSelectedValue('');
                        setOption('');
                    }}>Uncheck</Button>
                </Grid>
            }
        </>
    )
}

export default SingleChoiceAnswer;