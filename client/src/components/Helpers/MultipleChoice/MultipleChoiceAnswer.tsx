import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';

const MultipleChoiceAnswer = ({ section, handleMultipleOptions, index }) => {
    const [options, setOptions] = useState({});

    useEffect(() => {
        const obj = {};
        for (let i = 0; i < section.singleMultiDetails.options.length; i++) {
            obj[section.singleMultiDetails.options[i]] = false;
        }
        if(section.singleMultiDetails.otherOption) {
            obj['otherOption'] = "";
        }
        setOptions(obj);
    }, []);

    useEffect(() => {
        handleMultipleOptions(options, index)
    }, [options])

    const handleChange = (event) => { 
        setOptions({ ...options, [event.target.name]: event.target.checked });
    }

    return (
        <Grid item xs={12}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Choose option</FormLabel>
                <FormControl component="fieldset">
                    <FormGroup>
                        {
                            section.singleMultiDetails.options.map((option, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        control={<Checkbox color="primary" checked={options[option] || false} onChange={handleChange} name={option} />}
                                        label={option}
                                    />
                                )
                            })
                        }
                    </FormGroup>
                </FormControl>
                {section.singleMultiDetails.otherOption &&
                    <TextField id="standard-required" label="Other option" value={options['otherOption']} name="otherOption" onChange={(event) => setOptions({ ...options, [event.target.name]: event.target.value })}/>
                }
            </FormControl>
        </Grid>
    )
}

export default MultipleChoiceAnswer;