import { Button, ButtonGroup, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, Switch, TextField, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { QuestionHelper } from '../../../constants/questionTypes';
import useStyles from './styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import LinearScale from '../../Helpers/LinearScale';
import MultipleChoice from '../../Helpers/MultipleChoice';
import SingleChoice from '../../Helpers/SingleChoice';
import LongText from '../../Helpers/LongText';
import ShortText from '../../Helpers/ShortText';

const Section = ({ section, index, removeSection, handleChange, handleSwitchChange, handleOptions, handleOtherOption, handleLinearScale, sectionNumber, handleDrag, handleDrop }) => {
    const classes = useStyles();

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
                    <TextField placeholder="Pytanie" variant="filled" fullWidth value={section.questionText || ""} onChange={e => handleChange(index, e, 'questionText')} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <FormControl fullWidth={true}>
                        <InputLabel id="questionType">Typ pytania</InputLabel>
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
                            <Tooltip title="Usuń pytanie" placement="bottom"><Button onClick={() => removeSection(index)}><DeleteForeverOutlinedIcon /></Button></Tooltip>
                        </ButtonGroup>
                    </Grid>
                }
 
                {
                    section.questionType === 'shortText' ? 
                        <ShortText />
                        : (
                            section.questionType === 'longText' ?
                                <LongText />
                                : (
                                    section.questionType === 'singleChoice' ?
                                        <SingleChoice handleOptions={handleOptions} handleOtherOption={handleOtherOption} index={index} section={section}  />  
                                        : (
                                            section.questionType === 'multipleChoice' ? 
                                                <MultipleChoice handleOptions={handleOptions} handleOtherOption={handleOtherOption} index={index} />
                                                :
                                                <LinearScale handleLinearScale={handleLinearScale} index={index} />
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
                                value={section.required}
                                onChange={() => handleSwitchChange(section.required, index)}
                                control={<Switch color="primary" />}
                                label="Wymagane"
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