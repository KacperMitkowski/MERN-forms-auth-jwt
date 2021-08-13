import { FormControl, FormControlLabel, Grid, InputAdornment, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import useStyles from '../../Forms/AddForm/styles';

const LinearScaleQuestion = ({ handleLinearScale, index, section = null }) => {
    const classes = useStyles();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5);
    const [minEtiquette, setMinEtiquette] = useState('');
    const [maxEtiquette, setMaxEtiquette] = useState('');

    useEffect(() => {
        if (section) {
            setMin(section.linearDetails.min);
            setMinEtiquette(section.linearDetails.minText);
            setMax(section.linearDetails.max);
            setMaxEtiquette(section.linearDetails.maxText);
        }
    }, [section]);

    useEffect(() => {
        const details = {
            min,
            max,
            minText: minEtiquette.trim(),
            maxText: maxEtiquette.trim()
        }
        handleLinearScale(details, index);
    }, [min, minEtiquette, max, maxEtiquette])

    const handleChange = (i, e) => {
        const name = e.target.name;
        const value = e.target.value; 
        if(name === 'min') {
            setMin(value);
        }
        else if(name === 'minText') {
            setMinEtiquette(value.trim());
        }
        else if(name === 'max') {
            setMax(value);
        }
        else if(name === 'maxText') {
            setMaxEtiquette(value.trim());
        }
    }

    const getScale = () => {
        const options = [];
        for (let i = min; i <= max; i++) {
            options.push(
                <FormControlLabel
                    disabled
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
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <Select
                        name="min"
                        value={min}
                        onChange={e => handleChange(index, e)}
                        variant="outlined"
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Select
                        name="max"
                        value={max}
                        onChange={e => handleChange(index, e)}
                        variant="outlined"
                    >
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ marginTop: "20px" }}>
                    <TextField
                        value={minEtiquette}
                        name="minText"
                        placeholder="Etiquette (optional)"
                        onChange={e => handleChange(index, e)}
                        InputProps={{
                            classes: { underline: classes.underlineLinear },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span>{min}</span>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <TextField
                        value={maxEtiquette}
                        name="maxText"
                        placeholder="Etiquette (optional)"
                        onChange={e => handleChange(index, e)}
                        InputProps={{
                            classes: { underline: classes.underlineLinear },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span>{max}</span>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
                <FormControl component="fieldset">
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <Typography className={classes.typographyLinear} noWrap>{minEtiquette}</Typography>
                        {getScale().map(option => option)}
                        <Typography className={classes.typographyLinear} noWrap>{maxEtiquette}</Typography>
                    </RadioGroup>
                </FormControl>
            </Grid>
        </>
    )
}

export default LinearScaleQuestion;