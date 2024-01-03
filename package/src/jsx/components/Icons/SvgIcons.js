import React,{ useState} from 'react';
import { Modal } from 'react-bootstrap';
import {Link} from 'react-router-dom';
//Pagettitle
import PageTitle from '../../layouts/PageTitle';
import {SvgData} from './SvgData';

const svgIconData = [
    {iconname:'bell.svg', svgtype: SvgData.bell },
    {iconname:'message.svg',svgtype: SvgData.message },
    {iconname:'gift.svg', svgtype : SvgData.gift },
    {iconname:'cup.svg',svgtype : SvgData.cup},
    {iconname:'user.svg',svgtype : SvgData.user},
    {iconname:'doller.svg',svgtype : SvgData.doller},
    {iconname:'heart.svg',svgtype : SvgData.heart},
    {iconname:'check-circle.svg',svgtype : SvgData.check},
    {iconname:'delete-circle.svg',svgtype : SvgData.delete},
    {iconname:'calendar.svg',svgtype : SvgData.calendar},
    {iconname:'delivery.svg',svgtype : SvgData.delivery},
    {iconname:'progess.svg',svgtype : SvgData.progess},
    {iconname:'running.svg',svgtype : SvgData.running},
    {iconname:'order.svg',svgtype : SvgData.order},
    {iconname:'cycling.svg',svgtype : SvgData.cycling},
    {iconname:'yoga.svg',svgtype : SvgData.yoga},
    {iconname:'star.svg',svgtype : SvgData.star},
    {iconname:'body.svg',svgtype : SvgData.body},
    {iconname:'flag.svg',svgtype : SvgData.flag},
    {iconname:'call.svg',svgtype : SvgData.call},
    {iconname:'calling.svg',svgtype : SvgData.calling},
];


const SvgIcons = () => {
    const [openModal, setOpenModal] = useState(false);
    const [getValueType, setGetValueType] = useState("");
    return (
        <>
            <PageTitle activeMenu="SVG icons" motherMenu="Icons" />
            <div className="row">
                <div className="col-xl-12">
                    <div className="card p-0">
                        <div className="card-header"><h4 className="text-black mb-0">SVG Icons</h4></div>
                        <div className="card-body svg-area px-3">
                            <div className="row">
                                {svgIconData.map((item, index)=>(
                                    <div className="col-xl-2 col-lg-3 col-xxl-3 col-md-4 col-sm-6 col-12" key={index}>
                                        <div className="svg-icons-ov">
                                            <div className="svg-icons-prev">                                               
                                                <div dangerouslySetInnerHTML={{ __html: item.svgtype }} />
                                            </div>
                                            <div className="svg-classname">{item.iconname}</div>
                                            <div className="svg-icon-popup">
                                                <Link to={"#"}  onClick={()=>{setOpenModal("imagetype"); setGetValueType(index)}} className="btn btn-sm btn-brand"><i className="fa-solid fa-image" /></Link>
                                                <Link to={"#"}  onClick={()=>{setOpenModal("codeType" ); setGetValueType(index)} } className="btn btn-sm btn-brand"><i className="fa fa-code" /></Link>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="modal fade" show={openModal} onHide={setOpenModal} centered>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="svg_img_label_Brassieresvg">{svgIconData[getValueType]?.iconname}</h5>
                        <button type="button" className="btn-close" onClick={()=>setOpenModal(false)} >
                        </button>
                    </div>
                    <div className="modal-body">
                       {openModal==="imagetype" && 
<pre>
    
{`import MyImage from "../images/iconly/Bulk/${svgIconData[getValueType]?.iconname}";
export default function Imageblog() {   
 return  
  <div>
   <img src={MyImage} alt="Example" />   
  </div>
}`}
;
</pre> 
}
                            {openModal==="codeType" && 
<pre>{
svgIconData[getValueType]?.svgtype}
</pre>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>setOpenModal(false)}>Close</button>
                    </div>
                </div>                
            </Modal>            
        </>
    );
};

export default SvgIcons;