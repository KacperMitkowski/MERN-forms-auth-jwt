import Section from "./section";

class Answer {
    text: String = "";
    singleOption: String = "";
    multiOptions: String[] = [];
    linearOption: number = -1;
    questionType: String = "";
    required: boolean = false;

    constructor(questionType, required) {
        this.questionType = questionType;
        this.required = required;
    }
}

export default Answer; 