import React from 'react';
import ShortText from './ShortText';
import LongText from './LongText';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice'; 
import LinearScale from './LinearScale';

const QuestionSection = ({ questionType }) => {
    switch (questionType) {
        case 'shortText':
            return <ShortText />
        case 'longText':
            return <LongText />
        case 'singleChoice': 
            // return <SingleChoice />
        case 'multipleChoice':
            // return <MultipleChoice />
        case 'linearScale':
            return <LinearScale />
        default:
            return <></>

            
    }
}

export default QuestionSection;
