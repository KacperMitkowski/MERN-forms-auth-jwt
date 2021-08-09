import Form from '../models/form.js';
import Section from '../models/section.js';

export const getForms = async (req, res) => {

    try {
        const forms = await Form.find().sort({ _id: -1 });
        res.status(200).json({ data: forms });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getForm = async (req, res) => {
    const { id } = req.params;

    try {
        const form = await Form.findById(id);
        res.status(200).json(form);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
} 

export const createForm = async (req, res) => {
    try {
        const form = req.body;
        console.log(form);

        for(let section of form.sections) {
            console.log(section.linearDetails);
            console.log(section.singleMultiDetails);
        }
        // const sections = [];

        if (form?.title?.trim()?.length === 0) return res.status(200).json({ error: "No title given" });
        if (form?.description?.trim()?.length === 0) return res.status(200).json({ error: "No description given" });

        const newForm = new Form({
            title: form.title,
            description: form.description,
            userId: form.userId,
            sections: form.sections
        });
        await newForm.save();

        res.status(201).json(newForm);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const updateForm = async (req, res) => {
    const { id } = req.params;
    const updatedForm = req.body;

    try {
        await Form.findByIdAndUpdate(id, updatedForm, { new: true });
        res.status(201).json(updatedForm);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}