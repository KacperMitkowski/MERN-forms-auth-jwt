import dotenv from 'dotenv';
import Form from '../models/form.js';
import Section from '../models/section.js';

dotenv.config();

export const createForm = async (req, res) => {
    try {
        const form = req.body;
        const sections = [];

        if (form?.title?.trim()?.length === 0) return res.status(200).json({ error: "No title given" });
        if (form?.description?.trim()?.length === 0) return res.status(200).json({ error: "No description given" });

        for(let section of form.sections) {
            const s = new Section({
                required: section.required,
                questionText: section.questionText,
                questionType: section.questionType,
                questionDetails: section.questionDetails
            });
            sections.push(s);
        }

        const f = new Form({
            title: form.title,
            description: form.description,
            userId: form.userId,
            sections: sections
        });

        await f.save();
        res.status(201).json(f);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};
