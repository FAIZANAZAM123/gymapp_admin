import React,{useReducer} from 'react';
import {Link} from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import PageTitle from '../../layouts/PageTitle';
import {Feather} from './SvgData';

const svgBlogData = [    
    {Iconname : 'activity.svg', svgtype : Feather.activity},
    {Iconname : 'airplay.svg', svgtype : Feather.airplay},
    {Iconname : 'alert-circle.svg', svgtype : Feather.alert},
    {Iconname : 'alert-octagon.svg', svgtype : Feather.octagon},
    {Iconname : 'alert-triangle.svg', svgtype : Feather.triangle},
    {Iconname : 'align-center.svg', svgtype : Feather.center},
    {Iconname : 'align-justify.svg', svgtype : Feather.justify},
    {Iconname : 'align-left.svg', svgtype : Feather.left},
    {Iconname : 'align-right.svg', svgtype : Feather.right},
    {Iconname : 'anchor.svg', svgtype : Feather.anchor},
    {Iconname : 'aperture.svg', svgtype : Feather.aperture},
    {Iconname : 'archive.svg', svgtype : Feather.archive},
    {Iconname : 'arrow-down.svg', svgtype : Feather.down},
    {Iconname : 'arrow-down-circle.svg', svgtype : Feather.arrowdown},
    {Iconname : 'arrow-down-left.svg', svgtype : Feather.arrowdownleft},
    {Iconname : 'arrow-down-right.svg', svgtype : Feather.arrowdownright},
    {Iconname : 'arrow-left.svg', svgtype : Feather.arrowleft },
    {Iconname : 'arrow-left-circle.svg', svgtype : Feather.arrowleftcircle},
    {Iconname : 'arrow-right.svg', svgtype : Feather.arrowright},
    {Iconname : 'arrow-right-circle.svg', svgtype : Feather.arrowrightcircle},
    {Iconname : 'arrow-up.svg', svgtype : Feather.arrowup },
    {Iconname : 'arrow-up-circle.svg', svgtype : Feather.arrowupcircle},
    {Iconname : 'arrow-up-left.svg', svgtype : Feather.arrowupleft},
    {Iconname : 'arrow-up-right.svg', svgtype : Feather.arrowupright},
    {Iconname : 'at-sign.svg', svgtype : Feather.atsign},
    {Iconname : 'award.svg', svgtype : Feather.award},
    {Iconname : 'bar-chart.svg', svgtype : Feather.barchart},
    {Iconname : 'bar-chart2.svg', svgtype : Feather.barchart2},
    {Iconname : 'battery.svg', svgtype : Feather.battery},
    {Iconname : 'battery-charging.svg', svgtype : Feather.batterycharging},
    {Iconname : 'bell.svg', svgtype : Feather.bell},
    {Iconname : 'bell-off.svg', svgtype : Feather.belloff },
    {Iconname : 'bluetooth.svg', svgtype : Feather.bluetooth},
    {Iconname : 'bold.svg', svgtype : Feather.bold},
    {Iconname : 'book.svg', svgtype : Feather.book},
    {Iconname : 'bookmark.svg', svgtype : Feather.bookmark},
    {Iconname : 'bookopen.svg', svgtype : Feather.bookopen},
    {Iconname : 'box.svg', svgtype : Feather.box},
    {Iconname : 'briefcase.svg', svgtype : Feather.briefcase},
    {Iconname : 'calendar.svg', svgtype : Feather.calendar},
    {Iconname : 'camera.svg', svgtype : Feather.camera},
    {Iconname : 'camera-off.svg', svgtype : Feather.cameraoff},
    {Iconname : 'cast.svg', svgtype : Feather.cast},
    {Iconname : 'check.svg', svgtype : Feather.check},
    {Iconname : 'check-circle.svg', svgtype : Feather.checkcircle},
    {Iconname : 'check-square.svg', svgtype : Feather.checksquare},
    {Iconname : 'chevron-down.svg', svgtype : Feather.chevrondown},
    {Iconname : 'chevron-right.svg', svgtype : Feather.chevronright},
    {Iconname : 'chevrons-down.svg', svgtype : Feather.chevronsdown},
    {Iconname : 'chevrons-left.svg', svgtype : Feather.chevronsleft},
    {Iconname : 'chevrons-right.svg', svgtype : Feather.chevronsright},
    {Iconname : 'chevrons-up.svg', svgtype : Feather.chevronupf},
    {Iconname : 'chevron-up.svg', svgtype : Feather.chevronsup},
    {Iconname : 'chrome.svg', svgtype : Feather.chrome},
    {Iconname : 'circle.svg', svgtype : Feather.circle},
    {Iconname : 'clipboard.svg', svgtype : Feather.clipboard},
    {Iconname : 'clock.svg', svgtype : Feather.clock},
    {Iconname : 'cloud.svg', svgtype : Feather.cloud},
    {Iconname : 'cloud-drizzle.svg', svgtype : Feather.clouddrizzle},
    {Iconname : 'cloud-lightning.svg', svgtype : Feather.cloudlightning},
    {Iconname : 'cloud-off.svg', svgtype : Feather.cloudoff},
    {Iconname : 'cloud-rain.svg', svgtype : Feather.cloudrain},
    {Iconname : 'cloud-snow.svg', svgtype : Feather.cloudsnow},
    {Iconname : 'code.svg', svgtype : Feather.code},
    {Iconname : 'codepen.svg', svgtype : Feather.codepen},
    {Iconname : 'codesandbox.svg', svgtype : Feather.codesandbox},
    {Iconname : 'coffee.svg', svgtype : Feather.coffee},
    {Iconname : 'columns.svg', svgtype : Feather.columns},
    {Iconname : 'command .svg', svgtype : Feather.command },
    {Iconname : 'compass.svg', svgtype : Feather.compass},
    {Iconname : 'copy.svg', svgtype : Feather.copy},
    {Iconname : 'corner-down-left.svg', svgtype : Feather.cornerdownleft},
    {Iconname : 'corner-down-right.svg', svgtype : Feather.cornerdownright},
    {Iconname : 'corner-left-down.svg', svgtype : Feather.cornerleftdown},
    {Iconname : 'corner-left-up.svg', svgtype : Feather.cornerleftup},
    {Iconname : 'corner-right-down.svg', svgtype : Feather.cornerrightdown},
    {Iconname : 'corner-right-up.svg', svgtype : Feather.cornerrightup},
    {Iconname : 'corner-up-left.svg', svgtype : Feather.cornerupleft},
    {Iconname : 'corner-up-right.svg', svgtype : Feather.cornerupright},
    {Iconname : 'cpu.svg', svgtype : Feather.cpu},
    {Iconname : 'credit-card.svg', svgtype : Feather.creditcard},
    {Iconname : 'crop.svg', svgtype : Feather.crop},
    {Iconname : 'crosshair.svg', svgtype : Feather.crosshair},
    {Iconname : 'database.svg', svgtype : Feather.database},
    {Iconname : 'delete.svg', svgtype : Feather.delete},
    {Iconname : 'disc.svg', svgtype : Feather.disc},
    {Iconname : 'dollar-sign.svg', svgtype : Feather.dollarsign},
    {Iconname : 'download.svg', svgtype : Feather.download},
    {Iconname : 'download-cloud.svg', svgtype : Feather.downloadcloud},
    {Iconname : 'droplet.svg', svgtype : Feather.droplet},
    {Iconname : 'edit.svg', svgtype : Feather.edit},
    {Iconname : 'edit-2.svg', svgtype : Feather.edit2},
    {Iconname : 'edit-3.svg', svgtype : Feather.edit3},
    {Iconname : 'external-link.svg', svgtype : Feather.externallink},
    {Iconname : 'eye.svg', svgtype : Feather.eye},
    {Iconname : 'eye-off.svg', svgtype : Feather.eyeoff},
    {Iconname : 'facebook.svg', svgtype : Feather.facebook},
    {Iconname : 'feather.svg', svgtype : Feather.feather},
    {Iconname : 'fast-forward.svg', svgtype : Feather.fastforward},
]

const initialState = false;
const reducer = (state, action) =>{   
	switch (action.type){
		case 'imageModal':
			return { ...state, imageModal: !state.imageModal, content : action.content}
		case 'svgModal':
			return { ...state, svgModal: !state.svgModal, content : action.content, title: action.title}			
		default:
			return state
	}	
}

const FeatherIcons = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            <PageTitle activeMenu="Feather Icons" motherMenu="Icons"/>   
            <div className="row">
                <div className="col-xl-12">
                    <div className="card p-0">
                        <div className="card-header"><h4 className="text-black mb-0">Feather Icons</h4></div>
                        <div className="card-body svg-area px-3">
                            <div className="row">
                                {svgBlogData.map((item, ind)=>(
                                    <div className="col-xl-2 col-lg-3 col-xxl-3 col-md-4 col-sm-6 col-12" key={ind}>
                                        <div className="svg-icons-ov">
                                            <div className="svg-icons-prev">
                                                <div dangerouslySetInnerHTML={{ __html: item.svgtype }} />
                                            </div>
                                            <div className="svg-classname">{item.Iconname}</div>
                                            <div className="svg-icon-popup">
                                                <Link to={"#"}  onClick={() => dispatch({type:'imageModal', content: item.Iconname })} className="btn btn-sm btn-brand"><i className="fa-solid fa-image"></i></Link>
                                                <Link to={"#"} onClick={() => dispatch({type:'svgModal', content: item.Iconname, title : item.svgtype })} className="btn btn-sm btn-brand"><i className="fa fa-code"></i></Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
            <Modal className="modal fade" show={state.imageModal} onHide={()=>dispatch({type:'imageModal'})} centered>                                
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="svg_img_label_Brassieresvg">{state.content}</h5>
                        <button type="button" className="btn-close" onClick={() => dispatch({type:'imageModal'})}></button>
                    </div>
                    <div className="modal-body">                                  
                        <pre>                           
{`import MyImage from "../icons/feather/${state.content}";
export default function Imageblog() {   
return  
<div>
    <img src={MyImage} alt="Example" />   
</div>
}`}
;
                        </pre>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => dispatch({type:'imageModal'})}>Close</button>
                    </div>
                </div>
                
            </Modal>
            <Modal className="modal fade" show={state.svgModal} onHide={()=>dispatch({type:'svgModal'})} centered >                    
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="svg_inline_label_Brassieresvg">{state.content}</h5>
                        <button type="button" className="btn-close"   onClick={() => dispatch({type:'svgModal'})}>
                        </button>
                    </div>
                    <div className="modal-body">                  
<pre>   
{state.title}    
</pre>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => dispatch({type:'svgModal'})}>Close</button>
                    </div>
                </div>
                
            </Modal>
        </>
    );
};

export default FeatherIcons;