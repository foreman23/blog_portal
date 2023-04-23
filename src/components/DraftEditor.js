import { React, useState } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useNavigate } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { Button, Icon, Input } from 'semantic-ui-react';
import { Container, Col, Row } from 'react-bootstrap';

const DraftEditor = () => {

    // Init navigate
    const navigate = useNavigate();

    // Return to last page
    const goBack = () => {
        navigate(-1);
    }


    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    const [convertedContent, setConvertedContent] = useState();

    // Save data (convert TO raw)
    function saveData() {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const convertedContent = JSON.stringify(rawContentState);
        setConvertedContent(convertedContent);
        console.log(convertedContent);
    };

    // Load data (convert FROM raw)
    function loadData() {
        try {
            const rawContentState = JSON.parse(convertedContent);
            const contentState = convertFromRaw(rawContentState);
            setEditorState(EditorState.createWithContent(contentState));
        } catch (error) {
            console.error('Failed to load data', error);
        }
    }

    return (
        <div>
            <Container fluid>
                <Row fluid style={{ display: 'flex', backgroundColor: '#D9D9D9', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingBottom: '10px', paddingTop: '10px', marginBottom: '20px' }}>
                    <Col><Button href='/' size='medium' style={{ backgroundColor: '#FFFFFF' }}><Icon style={{ margin: 'auto' }} name='home'></Icon></Button><Button size='medium' style={{ backgroundColor: '#FFFFFF' }} onClick={goBack}>Back</Button></Col>
                    <Col><Input style={{ width: '500px' }} size='large' defaultValue='Title'></Input></Col>
                    <Col><Button onClick={loadData} color='blue'>Load</Button><Button onClick={saveData} color='green'>Save</Button></Col>
                </Row>
            </Container>
            <Container>
                <Row></Row>
            </Container>
            <Container style={{ width: '40vw', justifyContent: 'center' }}>
                <Row>
                    <div style={{ textAlign: 'center', justifyContent: 'center', display: 'flex', minHeight: '60vh', marginTop: '20px' }}>
                        <Editor toolbar
                            toolbarStyle={{ paddingLeft: '20px', paddingRight: '20px', paddingBottom: '5px', paddingTop: '7px' }}
                            wrapperClassName='blogWrapper'
                            editorClassName='blogEditor'
                            editorState={editorState}
                            onEditorStateChange={setEditorState}>
                        </Editor>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default DraftEditor