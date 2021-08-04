import { Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useState } from 'react';
import useStyles from './styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


const SingleChoice = ({ singleChoiceOptionCounter, setSingleChoiceOptionCounter }) => {
    const classes = useStyles();
    const [optionsAmount, setOptionsAmount] = useState(1);
    
    const options = [];
    const deleteOption = () => {

    }

    const getOptions = () => {
        for (let i = 0; i < optionsAmount; i++) {
            options.push(
                <div>
                    <TextField
                        placeholder={`Opcja ${i + 1}`}
                        InputProps={{
                            classes: { underline: classes.underline },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <RadioButtonUncheckedIcon />
                                </InputAdornment>
                            ),
                            endAdornment: optionsAmount >= 2 && (
                                <Tooltip title="Usuń" placement="right">
                                    <IconButton className={classes.singleChoiceOptionMargin} onClick={() => setOptionsAmount(optionsAmount - 1)}>
                                        <HighlightOffIcon />
                                    </IconButton>
                                </Tooltip>
                            )
                        }}
                    />
                </div>
            )
        }
        options.push(
            <div>
                <TextField
                    placeholder="Dodaj opcję"
                    onClick={() => setOptionsAmount(optionsAmount + 1)}
                    InputProps={{
                        classes: { underline: classes.underline },
                        startAdornment: (
                            <InputAdornment position="start">
                                <RadioButtonUncheckedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <>
                                <Typography style={{ marginLeft: "150px" }}>lub</Typography>
                                <Button className={classes.singleChoiceOption} size="large" fullWidth>Dodaj opcję "inne"</Button>
                            </>
                        )
                    }}
                />
            </div>
        )
        return options;
    }

    return (
        <Grid item xs={10}>
            {getOptions()}
        </Grid>
    )
}

export default SingleChoice;