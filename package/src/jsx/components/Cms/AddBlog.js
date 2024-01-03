// AddBlog.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CkEditorBlog from '../Forms/CkEditor/CkEditorBlog';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [file, setFile] = React.useState(null);
    const [editorContent, setEditorContent] = useState('');

    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    };

    const handleContentChange = (content) => {
        setEditorContent(content);
    };
      const handleAddBlog =async (e) => {

        e.preventDefault();
        // const formData = new FormData();
        // formData.append('title', title);
        // formData.append('content', editorContent);
        // formData.append('image', file);


        // console.log(title,editorContent,file)

        // console.log('FormData:', formData);

        // const backendUrl = `http://localhost:5000/addblog`;

        // fetch(backendUrl, {
        //   method: 'POST',
        //   body: formData,
        // })
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
        //     return response.json();
        //   })
        //   .then(data => {
        //     console.log('Blog added successfully:', data);
        //   })
        //   .catch(error => {
        //     console.error('Error adding blog:', error.message);
        //   });


        try {
            const response = await fetch('http://localhost:5000/addblog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content:editorContent, file })
            });


            console.log(title,editorContent,file)
            const data = await response.json();

            if (response.status !== 200) {
                // return navigate('/Error404', { replace: true });
            }

            if (response.status === 201) {
                // return navigate('/home', { replace: true });
                window.alert('blog added successfully')
            }

        } catch (error) {
            console.error('Error adding blog:', error.message);
        }
        // setLoading(false);



      };




 
    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"#"}>CMS</Link></li>
                            <li className="breadcrumb-item active"><Link to={"#"}>Add Blog</Link></li>
                        </ol>
                    </div>
                    <div className="mb-5">
                        <ul className="d-flex align-items-center flex-wrap">
                            <li><Link to={"/blog"} className="btn btn-primary">Blog List</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-primary mx-1">Blog Category</Link></li>
                            <li><Link to={"/blog-category"} className="btn btn-primary me-1 mt-sm-0 mt-1">Add Blog Category</Link></li>
                            <li>
                                <Link to={"#"} className="btn btn-primary open mt-1 mt-md-0">
                                    Screen Option
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="mb-3 ">
                        <input type="text" className="form-control w-50" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-xxl-12">
                            <div className="card h-auto">
                                <div className="card-body pt-3">
                                    <div className="custom-ekeditor cms-radius add-content-ckeditor mb-3">
                                        <CkEditorBlog onContentChange={handleContentChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleAddBlog}>
                        Add Blog
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddBlog;
