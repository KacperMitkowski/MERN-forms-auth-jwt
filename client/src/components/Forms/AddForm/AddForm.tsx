import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Grid, Paper, Snackbar, TextField, Tooltip, Typography } from '@material-ui/core';
import useStyles from './styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Section from '../Section';
import FormModel from '../../../models/form';
import SectionModel from '../../../models/section';
import { useDispatch, useSelector } from 'react-redux';
import { ERROR } from '../../../constants/actionTypes';
import Alert from '../../Helpers/Alert';
import { useHistory } from 'react-router-dom';
import { createForm } from '../../../actions/forms';
import SingleMultiDetails from '../../../models/singleMultiDetails';
import LinearDetails from '../../../models/linearDetails';

export const AddForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const { error } = useSelector((state: any) => state.error);
    const [showError, setShowError] = useState(false);
    const [dragId, setDragId] = useState();
    const [sectionsNumber, setSectionsNumber] = useState(1);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const profile = localStorage.getItem('profile')!;
    const [user, setUser] = useState(JSON.parse(profile));
    const [sections, setSections] = useState([new SectionModel(`Section-${sectionsNumber}`, sectionsNumber, false, "", "shortText", new SingleMultiDetails(), new LinearDetails())]);

    useEffect(() => {
        if (error) {
            setShowError(true);
        }
    }, [error]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch({ type: ERROR, data: null });
        setShowError(false);
    };

    const handleChange = (index, event, inputType) => {
        let newSections = [...sections];
        newSections[index][inputType] = event.target.value;
        setSections(newSections);
    }

    const handleRequired = (required, index) => {
        let newSections = [...sections];
        newSections[index].required = !required;
        setSections(newSections);
    }

    const handleOptions = (options, index) => {
        let newSections = [...sections];
        newSections[index].singleMultiDetails.options = options;
        setSections(newSections);
    }

    const handleOtherOption = (isOtherOption, index) => {
        let newSections = [...sections];
        newSections[index].singleMultiDetails.otherOption = isOtherOption;
        setSections(newSections);
    }

    const handleLinearScale = (details, index) => {
        let newSections = [...sections];
        newSections[index].linearDetails = details;
        setSections(newSections);
    }

    const addSection = () => {
        // setSections([...sections, { questionText: "", questionType: "shortText", id: `Section-${sectionsNumber + 1}`, order: sectionsNumber + 1, required: false, options: [], otherOption: false, linearScaleDetails: Object }])
        setSections([...sections, new SectionModel(`Section-${sectionsNumber + 1}`, sectionsNumber + 1, false, "", "shortText", new SingleMultiDetails(), new LinearDetails())]);
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
        form.title = formTitle.trim();
        form.description = formDescription.trim();
        form.userId = user.result._id;

        for (let section of sections) {
            const sectionObj = new SectionModel(section.id, section.order, section.required, section.questionText, section.questionType, section.singleMultiDetails, section.linearDetails);
            form.sections.push(sectionObj);
        }

        const formResult = validateForm(form);
        if (!formResult.ok) {
            return dispatch({ type: ERROR, data: { error: formResult.error } });
        }

        dispatch(createForm(form, history));
    }

    const validateForm = (form: FormModel) => {
        if (form.title.trim().length === 0) {
            return { ok: false, error: "No form title" };
        }
        if (form.description.trim().length === 0) {
            return { ok: false, error: "No form description" };
        }
        for (let section of form.sections) {
            if (section.questionText.length === 0) {
                return { ok: false, error: "No question text" };
            }

            if (section.singleMultiDetails.options.length > 0) {
                for (let option of section.singleMultiDetails.options) {
                    if (option.length === 0) {
                        return { ok: false, error: "No option text" };
                    }
                }
            }

            if((section.questionType === "singleChoice" || section.questionType === "multipleChoice") && section.singleMultiDetails.options.length === 0) {
                return { ok: false, error: "No option text" };
            }
        }
        return { ok: true }
    }


    return (
        <Container component="main" style={{ marginTop: "100px" }}>
            <form onSubmit={handleSubmit}>
                <Paper className={classes.paper} elevation={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={10} alignItems="center">
                            <Typography component="h1" variant="h5" align="center" gutterBottom>Add Form</Typography>
                            <TextField onChange={(e) => { setFormTitle(e.target.value) }} value={formTitle} placeholder="Formularz bez nazwy" fullWidth variant="filled" inputProps={{ style: { fontSize: 40 } }} style={{ fontSize: "30px", marginBottom: "30px" }} />
                            <TextField onChange={(e) => { setFormDescription(e.target.value) }} value={formDescription} placeholder="Opis formularza" fullWidth style={{ marginBottom: "30px" }} />
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
                                handleRequired={handleRequired}
                                handleOptions={handleOptions}
                                handleOtherOption={handleOtherOption}
                                handleLinearScale={handleLinearScale}
                                sectionNumber={section.id}
                                handleDrag={handleDrag}
                                handleDrop={handleDrop}
                            />
                        ))
                }
                <Button variant="contained" color="primary" fullWidth type="submit">Zapisz formularz</Button>
            </form>
            <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" className={classes.alert}>{error}</Alert>
            </Snackbar>
        </Container>
    )
}

export default AddForm;