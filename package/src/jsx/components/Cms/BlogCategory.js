import React, { useEffect, useReducer, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';


const initialState = true;
const reducer = (state, action) => {
    switch (action.type) {
        case 'openCollapse1':
            return { ...state, openCollapse1: !state.openCollapse1 }
        case 'openCollapse2':
            return { ...state, openCollapse2: !state.openCollapse2 }
        default:
            return state
    }
}

const BlogCategory = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { blogId } = useParams();

    // Provide initial values for data
    const [data, setdata] = useState({
        blog: {
            title: '',
            content: ''
        }
    });

    useEffect(() => {
        const fetchBlogById = async () => {
            try {
                const response = await fetch(`http://localhost:5000/getblogbyid/${blogId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data1 = await response.json();
                setdata(data1);
            } catch (error) {
                console.error('Error fetching blog:', error.message);
            }
        };

        fetchBlogById();
    }, [blogId]);

    const handleSave = async () => {
        try {
            const updateddata = data.blog;
            const response = await fetch(`http://localhost:5000/updateblog/${blogId}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: updateddata }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log('Blog updated successfully!');

            window.alert('Blog updated successfully!')
            
        } catch (error) {
            console.error('Error updating blog:', error.message);
        }
    };

    const handleTitleChange = (e) => {
        setdata({
            ...data,
            blog: {
                ...data.blog,
                title: e.target.value
            }
        });
    };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="row page-titles">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to={"#"}>CMS</Link></li>
                            <li className="breadcrumb-item active"><Link to={"#"}>Blog Category</Link></li>
                        </ol>
                    </div>
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="filter cm-content-box box-primary">
                                <div className="content-title">
                                    <div className="cpa">
                                        Add Blog Category
                                    </div>
                                    <div className="tools">
                                        <Link to={"#"}
                                            className={`SlideToolHeader ${state.openCollapse1 ? 'collapse' : 'expand'}`}
                                            onClick={() => dispatch({ type: 'openCollapse1' })}
                                        >
                                            <i className="fas fa-angle-up" />
                                        </Link>
                                    </div>
                                </div>
                                <Collapse in={!state.openCollapse1}>
                                    <div className="cm-content-body  form excerpt">
                                        <div className="card-body">
                                            <div className="mb-3">
                                                <label className="form-label">Title</label>
                                                <input
                                                    type="text"
                                                    value={data.blog.title || ''}
                                                    onChange={handleTitleChange}
                                                    className="form-control"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label for="exampleFormControlTextarea1" className="form-label">Content</label>
                                                <div
                                                    style={{
                                                        border: '1px solid #ced4da',
                                                        borderRadius: '.25rem',
                                                        padding: '.375rem .75rem',
                                                        minHeight: '100px',
                                                        overflow: 'auto'
                                                    }}
                                                    dangerouslySetInnerHTML={{ __html: data && data.blog && data.blog.content || 'N/A' }}
                                                    contentEditable={true}
                                                />
                                            </div>

                                            <div>
                                                <button onClick={handleSave} type="submit" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogCategory;