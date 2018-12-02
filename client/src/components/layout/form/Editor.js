import React from 'react';
import withContext from '../../../context/Context_HOC';
import { RowWrapper, EditorWrapper } from '../../../styles/layout/Landing.js';
import Typography from '@material-ui/core/Typography';
import MonacoEditor from 'react-monaco-editor';

export default withContext(function({ code, onEditorChange, context }) {
   const options = {
      selectOnLineNumbers: true
   };

   const props = {
      width: context.isMobile ? '330' : ''
   };
   return (
      <RowWrapper leftMargin>
         <Typography variant="h6">Wklej kod rozwiązania</Typography>
         <Typography variant="caption" gutterBottom>
            Tu wklej cały kod funkcji, wraz z funkcją Main. W Main należy zademonstrować działanie
            funkcji na przykładowych zestawach testowych.
         </Typography>
         <EditorWrapper>
            <MonacoEditor
               {...props}
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
});
