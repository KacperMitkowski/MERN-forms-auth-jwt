import React from 'react';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import SubjectIcon from '@material-ui/icons/Subject';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import LinearScaleIcon from '@material-ui/icons/LinearScale';

export class QuestionHelper {
    static SHORT_TEXT = { icon: <ShortTextIcon />, text: "Short answer", value: "shortText",  }
    static LONG_TEXT = { icon: <SubjectIcon />, text: "Long answer", value: "longText",  }
    static SINGLE_CHOICE = { icon: <RadioButtonCheckedIcon />, text: "Single choice", value: "singleChoice",  }
    static MULTIPLE_CHOICE = { icon: <CheckBoxIcon />, text: "Multiple Choice", value: "multipleChoice",  }
    static LINEAR_SCALE = { icon: <LinearScaleIcon />, text: "Linear scale", value: "linearScale",  }
} 