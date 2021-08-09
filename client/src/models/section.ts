import LinearDetails from "./linearDetails";
import SingleMultiDetails from "./singleMultiDetails";

class Section {
    id: String = "";
    order: number = 1;
    required: boolean = false;
    questionText: String = "";
    questionType: String = "";
    singleMultiDetails: SingleMultiDetails;
    linearDetails: LinearDetails;

    constructor(id: String, order: number, required: boolean, questionText: String, questionType: String, singleMultiDetails: SingleMultiDetails, linearDetails: LinearDetails) {
        this.id = id;
        this.order = order;
        this.required = required;
        this.questionText = questionText; 
        this.questionType = questionType;
        this.singleMultiDetails = singleMultiDetails;
        this.linearDetails = linearDetails;
    }
}

export default Section;