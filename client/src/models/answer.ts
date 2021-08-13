class Answer {
    text: String = "";
    singleOption: String = "";
    multiOptions: String[] = [];
    linearOption: number = -1;
    questionType: String = "";
    required: boolean = false;
    questionText : String = "";

    constructor(questionType, required, questionText) {
        this.questionType = questionType;
        this.required = required;
        this.questionText = questionText;
    }
}

export default Answer; 