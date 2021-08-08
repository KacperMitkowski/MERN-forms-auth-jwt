import { FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import useStyles from '../Forms/AddForm/styles'; 

const LinearScale = ({ handleLinearScale ,index }) => {
    const classes = useStyles();
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(5);
    const [minEtiquette, setMinEtiquette] = useState('');
    const [maxEtiquette, setMaxEtiquette] = useState('');

    const getScale = () => {
        const options = [];
        for (let i = min; i <= max; i++) {
            options.push(
                <FormControlLabel
                    key={i}
                    control={<Radio color="primary" />}
                    label={i}
                    labelPlacement="top"
                />
            )
        }
        return options;
    }

    useEffect(() => {
        const details = {
            min,
            max,
            minEtiquette : minEtiquette.trim(),
            maxEtiquette : maxEtiquette.trim()
        }
        handleLinearScale(details, index);
    }, [min, minEtiquette, max, maxEtiquette])

    return (
        <>
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <Select
                        value={min}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => setMin(event.target.value as number)}
                        variant="outlined"
                    >
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Select
                        value={max}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => setMax(event.target.value as number)}
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
                        placeholder="Etykieta (opcjonalna)"
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setMinEtiquette(event.target.value)}
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
                        placeholder="Etykieta (opcjonalna)"
                        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setMaxEtiquette(event.target.value)}
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

export default LinearScale;