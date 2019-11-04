import React ,{useState,useEffect} from 'react';
import Axios from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { Card, Icon, Image } from 'semantic-ui-react'


const PublicPosts =(props)=> {

    const [title,setTitle] = useState("")
    const [description,setdescription] = useState("")
    const [updatedDate,setUpdatedDate] = useState("")
    const [createdDate,setCreatedDate] = useState("")

     useEffect(()=>{

        Axios.get(`/newPosts/${props.match.params.id}.json`)
            .then(response => {

                setTitle(response.data.title)
                setdescription(response.data.description)
                setUpdatedDate(response.data.updatedDate)
                setCreatedDate(response.data.createdDate);
           
            })},[props.match.params.id])

        
            return(
            
                    <div><br/><hr/>
                   
                        <p><b>Title :</b> {title}</p>
                        <p><b>Description :</b>
                        <div>{ReactHtmlParser(description) }
                        </div></p>
                        <p><b>Created Date :</b> {createdDate}</p>
                        <p><b>Updated Date :</b> {updatedDate}</p>
                        
                    </div>
            )
        }



export default withRouter(PublicPosts);
