
import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { ImageUpload }  from 'quill-image-upload';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

Quill.register('modules/imageUpload', ImageUpload);

interface QuillEditorProps {}

interface QuillEditorState {
    content : string | undefined;
}

class QuillEditor extends React.Component<QuillEditorProps, QuillEditorState> {
    constructor(props: QuillEditorProps) {
        super(props);

        this.state = {
            content : ''
        };
    }
    quillRef : ReactQuill | null = null;
    modules = {
        toolbar: {
        container: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image']
        ],
        // container:  [['bold', 'italic', 'underline', 'blockquote'],
        // [{'list': 'ordered'}, {'list': 'bullet'}],
        // ['formula','link', 'image'],
        // ['clean']],
        // handlers: { 'image' : this.handleImage }
        },
        imageUpload: {
            url: "http:/123", // server url https://ou3hw62xoc.execute-api.ap-northeast-2.amazonaws.com/nomad
            method: "POST", // change query method, default 'POST'            
            name : 'file', // 아래 설정으로 image upload form의 key 값을 변경할 수 있다.
            withCredentials: false, // withCredentials
            headers: {
                "Content-Type":"application/x-www-form-urlencoded"
            },
            customUploader: async (file,next)=>{
                const formData = new FormData();
                formData.append("file", file);
                formData.append("api_key", "811881451928618");
                formData.append("upload_preset", "tqecb16q");
                formData.append("timestamp", String(Date.now() / 1000));
                const {
                    data: { secure_url }
                } = await axios.post(
                    "https://api.cloudinary.com/v1_1/djjpx4ror/image/upload",
                    formData
                );
                next(secure_url);
            },
            callbackOK: (serverResponse, next) => { // 성공하면 리턴되는 함수
                // next(serverResponse);
            },
            callbackKO: (serverError) => { // 실패하면 리턴되는 함수
                // console.log(serverError);
                // alert(serverError);
            },
            // optional
            // add callback when a image have been chosen
            checkBeforeSend: (file, next) => {
                // const buffered = Buffer.from(file,'base64');
                // console.log(buffered);
                console.log(file);
                // console.log(file);
                // console.log({name:file.name, type: file.type});
                next(file); // go back to component and send to the server
            }
        },
        clipboard: {
        // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
        // imageDrop: true, // imageDrop 등록
        // imageResize: {} // imageResize 등록
    }

   
    formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ]

    // 핸들러
    changeEditor = e => {
        console.log('quill editor 핸들러 호출', e);
        // this.setState({ content: '1' })
    };

    render(){
        return (
            < ReactQuill
                ref={(el) => this.quillRef = el}
                value={this.state.content} // state 값
                theme="snow" // 테마값 이미 snow.css를 로드해서 제거해도 무망
                onChange={this.changeEditor}
                modules={this.modules}
                formats={this.formats}
                style={{height:'400px'}}
                placeholder={'내용을 입력해주세요.'}
            />)
    };
}

export default QuillEditor;