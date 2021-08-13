import React, { useState } from 'react';
import { Button, ButtonGroup, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Tooltip } from '@material-ui/core';
import { QuestionHelper } from '../../constants/questionTypes';
import useStyles from './AddForm/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import LinearScaleQuestion from '../Helpers/LinearScale/LinearScaleQuestion';
import MultipleChoiceQuestion from '../Helpers/MultipleChoice/MultipleChoiceQuestion';
import SingleChoiceQuestion from '../Helpers/SingleChoice/SingleChoiceQuestion';
import LongTextQuestion from '../Helpers/LongText/LongTextQuestion';
import ShortTextQuestion from '../Helpers/ShortText/ShortTextQuestion';
import { useEffect } from 'react';

const Section = ({ section, index, removeSection, handleChange, handleRequired, handleOptions, handleOtherOption, handleLinearScale, sectionNumber, handleDrag, handleDrop }) => {
    const classes = useStyles();
    const [required, setRequired] = useState(false);

    useEffect(() => {
        setRequired(section.required);
    }, [section])

    return (
        <Paper 
            className={classes.paper}
            elevation={6}
            style={{ marginTop: "10px" }}
            draggable={true}
            id={sectionNumber}
            onDragOver={(ev) => ev.preventDefault()}
            onDragStart={handleDrag}
            onDrop={handleDrop}
        >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={5}>
                    <TextField placeholder="Question" variant="filled" fullWidth value={section.questionText || ""} onChange={e => handleChange(index, e, 'questionText')} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth={true}>
                        <InputLabel id="questionType">Question type</InputLabel>
                        <Select
                            labelId="questionType"
                            value={section.questionType}
                            onChange={e => handleChange(index, e, 'questionType')}
                            MenuProps={{
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                getContentAnchorEl: null
                            }}
                        >
                            {
                                Object.keys(QuestionHelper).map((option, index) => (
                                    <MenuItem key={index} value={QuestionHelper[option].value}>
                                        <span>{QuestionHelper[option].icon}</span>
                                        <span style={{ marginLeft: "20px", fontSize: "20px" }}>{QuestionHelper[option].text}</span>
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>


                {index &&
                    <Grid item xs={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ButtonGroup orientation="vertical" variant="contained" color="primary">
                            <Tooltip title="Delete question" placement="bottom"><Button onClick={() => removeSection(index)}><DeleteForeverOutlinedIcon /></Button></Tooltip>
                        </ButtonGroup>
                    </Grid>
                }

                {
                    section.questionType === 'shortText' ?
                        <ShortTextQuestion />
                        : (
                            section.questionType === 'longText' ?
                                <LongTextQuestion />
                                : (
                                    section.questionType === 'singleChoice' ?
                                        <SingleChoiceQuestion handleOptions={handleOptions} handleOtherOption={handleOtherOption} index={index} section={section} /> 
                                        : (
                                            section.questionType === 'multipleChoice' ? 
                                                <MultipleChoiceQuestion handleOptions={handleOptions} handleOtherOption={handleOtherOption} index={index} section={section} />
                                                :
                                                <LinearScaleQuestion handleLinearScale={handleLinearScale} index={index} section={section} />
                                        )
                                )
                        )
                }

                <Grid item xs={10}>
                    <Divider orientation="horizontal" />
                </Grid>
                <Grid item xs={10}>
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                checked={required}
                                onChange={() => {
                                    setRequired(!required);
                                    handleRequired(section.required, index);
                                }}
                                control={<Switch color="primary" />}
                                label="Required"
                                labelPlacement="start"
                            />
                        </FormGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Section;