import Answer from "./answer";

class FormAnswer {
    formId: String = "";
    nick: String = "";
    answers: Answer[] = [];

    constructor(formId) {
        this.formId = formId;
    }
}

export default FormAnswer; 