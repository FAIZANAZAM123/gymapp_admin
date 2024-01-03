import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CkEditorBlog = ({ onContentChange }) => {
    return (
        <>
            <CKEditor
                editor={ ClassicEditor }
            // data="<p>Hello from CKEditor 5!</p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={(event, editor) => {
                    const content = editor.getData();
                    onContentChange(content); // Pass content to parent component
                  }}
            
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            /> 
        </>
    );
};

export default CkEditorBlog;