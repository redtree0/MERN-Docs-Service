import React, { Component } from 'react'
import axios, { post } from 'axios';

class FileUploadPanel extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file);
    }
    
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }

    fileUpload(file){
        
        const url = '/upload';
        const formData = new FormData();
        const { socket } = this.props;

        console.log(file);
        formData.append('file',file)
        formData.append("filename", file.name);
        const config = {
                headers: { 'content-type': 'multipart/form-data' }
        }
        return post(url, formData,config).then( res => {
            console.log("FileUpload");
            this.onUpload();
        });

    }

    onUpload(){ 
        console.log("FileUpload onUpload");
        this.props.onUploaded();
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} name="uploadFile"/>
                <button type="submit">Upload</button>
            </form>
        )
    }
}
export default FileUploadPanel