import React, { useState } from 'react';
import { Button, ButtonGroup, Container, Grid, Paper, TextField, Tooltip, Typography } from '@material-ui/core';
import useStyles from './styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Section from './Section';
import FormModel from '../../../models/form';
import SectionModel from '../../../models/section';


export const AddForm = () => {
    const classes = useStyles();
    const [dragId, setDragId] = useState();
    const [sectionsNumber, setSectionsNumber] = useState(1);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [sections, setSections] = useState([{ questionText: "", questionType: "shortText", id: `Section-${sectionsNumber}`, order: sectionsNumber, required: false, options: [], otherOption: false }]);

    const handleChange = (index, event, inputType) => {
        let newSections = [...sections];
        newSections[index][inputType] = event.target.value;
        setSections(newSections);
    }

    const handleSwitchChange = (currentValue, index) => {
        let newSections = [...sections];
        newSections[index].required = !currentValue;
        setSections(newSections);
    }

    const handleOptions = (options, index) => {
        let newSections = [...sections];
        newSections[index].options = options;
        setSections(newSections);
    }

    const handleOtherOption = (isOtherOption, index) => {
        let newSections = [...sections];
        newSections[index].otherOption = isOtherOption;
        setSections(newSections);
    }

    const addSection = () => {
        setSections([...sections, { questionText: "", questionType: "shortText", id: `Section-${sectionsNumber + 1}`, order: sectionsNumber + 1, required: false, options: [], otherOption: false }])
        setSectionsNumber(sectionsNumber + 1);
    }

    const removeSection = (index) => {
        let newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
        setSectionsNumber(sectionsNumber - 1);
    }

    const handleDrag = (event) => setDragId(event.currentTarget.id);

    const handleDrop = (event) => {
        const dragSection = sections.find((section) => section.id === dragId);
        const dropSection = sections.find((section) => section.id === event.currentTarget.id);

        const dragSectionOrder = dragSection.order;
        const dropSectionOrder = dropSection.order;

        const newSectionState = sections.map((section) => {
            if (section.id === dragId) {
                section.order = dropSectionOrder;
            }
            if (section.id === event.currentTarget.id) {
                section.order = dragSectionOrder;
            }
            return section;
        });

        setSections(newSectionState);
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = new FormModel();
        form.title = formTitle;
        form.description = formDescription;

        for(let section of sections) {
            const sectionObj = new SectionModel();
            sectionObj.questionText = section.questionText;
            sectionObj.questionType = section.questionType;
            sectionObj.required = section.required;
            
            if(section.options.length > 0) {
                sectionObj.questionDetails = {
                    options: section.options,
                    otherOption: section.otherOption
                }
            }
            form.sections.push(sectionObj);
        }

        console.log(form);
    }

    return (
        <Container component="main" style={{ marginTop: "100px" }}>
            <form onSubmit={handleSubmit}>
                <Paper className={classes.paper} elevation={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={10} alignItems="center">
                            <Typography component="h1" variant="h5" align="center" gutterBottom>Add Form</Typography>
                            <TextField onChange={(e) => {setFormTitle(e.target.value)}} value={formTitle} placeholder="Formularz bez nazwy" fullWidth variant="filled" inputProps={{ style: { fontSize: 40 } }} style={{ fontSize: "30px", marginBottom: "30px" }} />
                            <TextField onChange={(e) => {setFormDescription(e.target.value)}} value={formDescription} placeholder="Opis formularza" fullWidth style={{ marginBottom: "30px" }} />
                        </Grid>
                        <Grid item xs={12} sm={2} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ButtonGroup orientation="vertical" variant="contained" color="primary">
                                <Tooltip title="Dodaj pytanie" placement="right"><Button onClick={() => addSection()}><AddCircleOutlineOutlinedIcon /></Button></Tooltip>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Paper>
                {
                    sections
                        .sort((a, b) => a.order - b.order)
                        .map((section, index) => (
                            <Section
                                section={section}
                                key={index}
                                index={index}
                                removeSection={removeSection}
                                handleChange={handleChange}
                                handleSwitchChange={handleSwitchChange}
                                handleOptions={handleOptions}
                                handleOtherOption={handleOtherOption}
                                sectionNumber={section.id} 
                                handleDrag={handleDrag}
                                handleDrop={handleDrop}
                            />
                        ))
                }
                <Button variant="contained" color="primary" fullWidth type="submit">Zapisz formularz</Button>
            </form>
        </Container>
    )
}

export default AddForm;