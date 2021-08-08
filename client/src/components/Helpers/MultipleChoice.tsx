import { Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import useStyles from '../Forms/AddForm/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const MultipleChoice = ({ handleOptions, handleOtherOption, index }) => {
    const classes = useStyles();
    const [options, setOptions] = useState([{ startIcon: <CheckBoxOutlineBlankIcon />, placeholder: "Opcja 1", deleteIcon: <HighlightOffIcon />, value: "" }]);
    const [customOptionVisible, setCustomOptionVisible] = useState(false);

    const deleteOption = (i) => {
        let newOptions = [...options];
        newOptions.splice(i, 1);
        setOptions(newOptions);
    }

    const addRadioOption = (counter) => { 
        setOptions([...options, { startIcon: <CheckBoxOutlineBlankIcon />, placeholder: `Opcja ${counter}`, deleteIcon: <HighlightOffIcon />, value: "" }]) 
    }

    const handleChange = (i, e) => {
        let newOptions = [...options];
        newOptions[i].value = e.target.value;
        setOptions(newOptions);

        const values = newOptions.map(option => option.value.trim());
        handleOptions(values, index);
    }

    useEffect(() => {
        const values = options.map(option => option.value.trim());
        handleOptions(values, index);
    }, [options]);

    return (
        <Grid item xs={10}>
            {options.map((element, index) => {
                return (
                    <div key={index}>
                        <TextField
                            value={options[index].value}
                            onChange={e => handleChange(index, e)}
                            placeholder={element.placeholder}
                            InputProps={{
                                classes: { underline: classes.underline },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        {element.startIcon}
                                    </InputAdornment>
                                ),
                                endAdornment: options.length >= 2 && (
                                    <Tooltip title="Usuń" placement="right">
                                        <IconButton className={classes.singleChoiceOptionMargin} onClick={() => deleteOption(index)}>
                                            {element.deleteIcon}
                                        </IconButton>
                                    </Tooltip>
                                )
                            }}
                        />
                    </div>
                )
            })}
            {
                customOptionVisible &&
                <TextField
                    placeholder="Inna odpowiedź..."
                    disabled
                    InputProps={{
                        classes: { underline: classes.underline },
                        startAdornment: (
                            <InputAdornment position="start">
                                <CheckBoxOutlineBlankIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <Tooltip title="Usuń" placement="right">
                                <IconButton className={classes.singleChoiceOptionMargin} onClick={() => setCustomOptionVisible(false)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }}
                />
            }

            <div className={classes.singleChoiceButtonsContainer}>
                <Button variant="contained" color="primary" onClick={() => addRadioOption(options.length + 1)}>Dodaj opcję</Button>
                {
                    !customOptionVisible &&
                    <>
                        <Typography>lub</Typography>
                        <Button variant="contained" color="primary" onClick={() => {
                            setCustomOptionVisible(true);
                            handleOtherOption(true, index);
                        }}>Dodaj opcję "inne"</Button>
                    </>
                }
            </div>
        </Grid>
    )
}


export default MultipleChoice;