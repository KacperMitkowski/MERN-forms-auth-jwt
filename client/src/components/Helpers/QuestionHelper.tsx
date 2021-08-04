import React from 'react';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

export class QuestionHelper {
    static SHORT_TEXT = { icon: <ShortTextIcon />, text: "Krótka odpowiedź", value: "shortText" }
    static LONG_TEXT = { icon: <SubjectIcon />, text: "Długa odpowiedź", value: "longText" }
    static SINGLE_CHOICE = { icon: <RadioButtonCheckedIcon />, text: "Jednokrotny wybór", value: "singleChoice" }
    static MULTIPLE_CHOICE = { icon: <CheckBoxIcon />, text: "Wielokrotny wybór", value: "multipleChoice" }
    static LINEAR_SCALE = { icon: <LinearScaleIcon />, text: "Skala liniowa", value: "linearScale" }
} 