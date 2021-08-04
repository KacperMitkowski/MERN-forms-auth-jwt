import { Button, ButtonGroup, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, Switch, TextField, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import { QuestionHelper } from '../../Helpers/QuestionHelper';
import useStyles from './styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import QuestionSection from './QuestionSection';

const Section = ({ sectionIndex, sectionsNumber, setSectionsNumber }) => {
    const [questionType, setQuestionType] = useState('');

    return (
        <>
            <Grid item xs={12} sm={5}>
                <TextField placeholder="Pytanie" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={5}>
                <FormControl fullWidth={true}>
                    <InputLabel id="questionType">
                        Typ pytania
                    </InputLabel>
                    <Select
                        labelId="questionType"
                        value={questionType}
                        onChange={(event: any) => setQuestionType(event.target.value)}
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
            {sectionIndex === sectionsNumber &&
                <Grid item xs={2}>
                    <ButtonGroup orientation="vertical" variant="contained" color="primary">
                        <Tooltip title="Dodaj pytanie" placement="bottom"><Button onClick={() => setSectionsNumber(sectionsNumber + 1)}><AddCircleOutlineOutlinedIcon /></Button></Tooltip>
                        <Tooltip title="Usuń pytanie" placement="bottom"><Button onClick={() => setSectionsNumber(sectionsNumber - 1)}><DeleteForeverOutlinedIcon /></Button></Tooltip>
                    </ButtonGroup>
                </Grid>
            }
            
                { <QuestionSection questionType={questionType} /> }
            <Grid item xs={10}>
                <Divider orientation="horizontal" />
            </Grid>
            <Grid item xs={10}>
                <Tooltip title="Duplikuj pytanie" placement="bottom">
                    <Button onClick={() => { }}><FileCopyIcon /></Button>
                </Tooltip>
                <Tooltip title="Usuń pytanie" placement="bottom">
                    <Button onClick={() => { }}><DeleteOutlineIcon /></Button>
                </Tooltip>
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="Wymagane"
                            control={<Switch color="primary" />}
                            label="Wymagane"
                            labelPlacement="start"
                        />
                    </FormGroup>
                </FormControl>
            </Grid>

        </>
    )
}

export default Section;