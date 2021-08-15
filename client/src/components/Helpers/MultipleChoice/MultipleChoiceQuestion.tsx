import { Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import useStyles from '../../Forms/AddForm/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const MultipleChoiceQuestion = ({ handleOptions, handleOtherOption, index, section = null }) => {
    const classes = useStyles(); 
    const [options, setOptions] = useState([]);
    const [customOptionVisible, setCustomOptionVisible] = useState(false);

    useEffect(() => {
        if (section) {
            const sectionOptions = [];
            for (let i = 0; i < section.singleMultiDetails.options.length; i++) {
                const obj = {
                    startIcon:  <CheckBoxOutlineBlankIcon />,
                    placeholder: `Option ${i + 1}`,
                    deleteIcon: <HighlightOffIcon />,
                    value: section.singleMultiDetails.options[i]
                }
                sectionOptions.push(obj);
            }
            setOptions(sectionOptions);
            setCustomOptionVisible(section.singleMultiDetails.otherOption);
        }
        else {
            setOptions([{ startIcon:  <CheckBoxOutlineBlankIcon />, placeholder: "Option 1", deleteIcon: <HighlightOffIcon />, value: "" }]);
        }
    }, [section]);

    const deleteOption = (i) => {
        let newOptions = [...options];
        newOptions.splice(i, 1);
        setOptions(newOptions);

        const values = newOptions.map(option => option.value.trim());
        handleOptions(values, index);
    }

    const addRadioOption = (counter) => { 
        setOptions([...options, { startIcon: <CheckBoxOutlineBlankIcon />, placeholder: `Option ${counter}`, deleteIcon: <HighlightOffIcon />, value: "" }]) 
    }

    const handleChange = (i, e) => {
        let newOptions = [...options];
        newOptions[i].value = e.target.value;
        setOptions(newOptions);

        const values = newOptions.map(option => option.value.trim());
        handleOptions(values, index);
    }

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
                                    <Tooltip title="Delete option" placement="right">
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
                    placeholder="Other option..."
                    disabled
                    InputProps={{
                        classes: { underline: classes.underline },
                        startAdornment: (
                            <InputAdornment position="start">
                                <CheckBoxOutlineBlankIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <Tooltip title="Delete option" placement="right">
                                <IconButton className={classes.singleChoiceOptionMargin} onClick={() => setCustomOptionVisible(false)}>
                                    <HighlightOffIcon />
                                </IconButton>
                            </Tooltip>
                        )
                    }}
                />
            }

            <div className={classes.singleChoiceButtonsContainer}>
                <Button variant="contained" color="primary" onClick={() => addRadioOption(options.length + 1)}>Add option</Button>
                {
                    !customOptionVisible &&
                    <>
                        <Typography>or</Typography>
                        <Button variant="contained" color="primary" onClick={() => {
                            setCustomOptionVisible(true);
                            handleOtherOption(true, index);
                        }}>Add option "other"</Button>
                    </>
                }
            </div>
        </Grid>
    )
}


export default MultipleChoiceQuestion;