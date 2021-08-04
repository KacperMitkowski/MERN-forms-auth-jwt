import { FormControl, FormControlLabel, FormLabel, Grid, InputAdornment, Radio, RadioGroup, TextField } from '@material-ui/core';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React, { useState } from 'react';
import SingleChoice from './SingleChoice';

const QuestionSection = ({ questionType }) => {
    const [value, setValue] = useState('female');
    const [singleChoiceOptionCounter, setSingleChoiceOptionCounter] = useState(1);

    switch (questionType) {
        case 'shortText':
            return <Grid item xs={5}>
                <TextField placeholder="Tekst krótkiej odpowiedzi" fullWidth />
            </Grid>
        case 'longText':
            return <Grid item xs={10}>
                <TextField placeholder="Tekst długiej odpowiedzi" fullWidth />
            </Grid>
        case 'singleChoice':
            return <SingleChoice singleChoiceOptionCounter={singleChoiceOptionCounter} setSingleChoiceOptionCounter={setSingleChoiceOptionCounter} />
        case 'multipleChoice':
            return <div>4</div>
        case 'linearScale':
            return <div>5</div>
        default:
            return <></>
    }
}

export default QuestionSection;