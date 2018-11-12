import React from "react";
import { RowWrapper, EditorWrapper } from "../../../styles/layout/Landing.js";
import Typography from "@material-ui/core/Typography";
import MonacoEditor from "react-monaco-editor";
//import withContext from "../../../context/Context_HOC";

export default function Editor({ code, onEditorChange }) {
    const options = {
        selectOnLineNumbers: true
    };
    //const { code, onEditorChange } = context;
    return (
        <RowWrapper>
            <Typography variant="h6">Wklej kod rozwiązania</Typography>
            <Typography variant="body2" gutterBottom>
                Tu wklej cały kod funkcji, wraz z funkcją Main. W Main należy zademonstrować
                działanie funkcji na przykładowych zestawach testowych.
            </Typography>
            <EditorWrapper>
                <MonacoEditor
                    language="csharp"
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={onEditorChange}
                    //editorDidMount={this.editorDidMount}
                />
            </EditorWrapper>
        </RowWrapper>
    );
}
