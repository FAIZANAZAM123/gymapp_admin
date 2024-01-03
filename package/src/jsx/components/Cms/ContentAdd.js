import React, { useReducer, useState} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import { Collapse } from 'react-bootstrap';

import axios from 'axios'





const initialState = true;
const reducer = (state, action) =>{
    switch (action.type){
        case 'collpase0':
            return { ...state, collpase0: !state.collpase0 }
        case 'collpase1':
            return { ...state, collpase1: !state.collpase1 }
        case 'collpase2':
            return { ...state, collpase2: !state.collpase2 }
        case 'collpase3':
            return { ...state, collpase3: !state.collpase3 }       
        case 'collpase4':
            return { ...state, collpase4: !state.collpase4 }       
        case 'collpase5':
            return { ...state, collpase5: !state.collpase5 }       
        case 'collpase6':
            return { ...state, collpase6: !state.collpase6 }       
        case 'collpase7':
            return { ...state, collpase7: !state.collpase7 }       
        case 'collpase8':
           return { ...state, collpase8: !state.collpase8 }
        case 'collpase9':
           return { ...state, collpase9: !state.collpase9 }
        case 'section1':
            return { ...state, section1: !state.section1 }
        case 'section2':
            return { ...state, section2: !state.section2 }
        case 'section3':
            return { ...state, section3: !state.section3 }
        case 'section4':
            return { ...state, section4: !state.section4 }
        case 'section5':
            return { ...state, section5: !state.section5 }
        case 'section6':
            return { ...state, section6: !state.section6 }
        case 'section7':
            return { ...state, section7: !state.section7 }
        case 'section8':
            return { ...state, section8: !state.section8 }
        case 'section9':
            return { ...state, section9: !state.section9 }
        default:
            return state	
    }	
}



const ContentAdd = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [file, setFile] = React.useState(null)
    const fileHandler = (e) => {       
        setFile(e.target.files[0]);		
    }
    const [Inventory, setInventory] =useState();

    const [Quantity, setQuantity] =useState();



    const handleSubmit = async () => {
        try {
          const response = await axios.post('http://localhost:5000/AddInverntory', {
            Inventoryname: Inventory,
            quantity: Quantity,
          });
    
          console.log(response.data);

if(response.status===201)
{
    window.alert('Inventory added successfully');
    window.location.href='/content'
}

        } catch (error) {
          
          console.error('Error:', error);
        }
      };

    return (
        <>
           
            <div className="row">
                <div className="col-xl-12">
                    <div className="row page-titles">
                        <ol className="breadcrumb">                           
                            <li className="breadcrumb-item"><Link to={"#"}>Content</Link></li>
                            <li className="breadcrumb-item active">Add</li>
                        </ol>
                    </div>
                    <div>
                        <Link to={"/content"} className="btn btn-primary mb-3">Content List</Link>{" "}
                       
                    </div>
                  
                    <div className="row">
                        <div className="col-xl-12">
                            
                            {!state.section1 &&               
                                <div className="filter cm-content-box box-primary">
                                    <div className="content-title">
                                        <div className="cpa">
                                            Add Inventory
                                        </div>
                                        <div className="tools">
                                            <Link to={"#"}                                                 
                                                onClick={() => dispatch({type:'collpase1'})}
                                                className={`SlideToolHeader ${state.collpase1 ? 'collapse' : 'expand' }`}
                                            >
                                                <i className="fas fa-angle-up"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <Collapse in={!state.collpase1}>
                                        <div className="cm-content-body form excerpt">
                                            <div className="card-body">
                                                <h6>Add New Inventory</h6>
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <form>
                                                        <div className="mb-3">
                                                            <label  className="from-label">Inventory Name</label>
                                                            <input onChange={((e)=>{
                                                                setInventory(e.target.value)

                                                            })} type="text" className="form-control" placeholder="Name" />
                                                        </div>
                                                        </form>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6">
                                                    <label  className="from-label">Quantity</label>
                                                    <input onChange={((e)=>{
                                                                setQuantity(e.target.value)

                                                            })} type="text" className="form-control" placeholder="Quantity" />
                                                    </div>
                                                </div>	
                                                <button onClick={handleSubmit} type="submit" className="btn btn-primary mt-3 mt-sm-0">Add Inventory</button>
                                            </div>
                                        </div>
                                    </Collapse>
                                </div>
                            } 
                         
                         
                        </div>
                        
                    </div>
                </div>
            </div>
			
        </>
    );
};

export default ContentAdd;
