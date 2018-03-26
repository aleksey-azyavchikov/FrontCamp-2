import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setEditorMode } from "../../../../../../../../redux/modules/archive";
import { EditorMode } from "../../../../../../../../../core/enums/editor-mode.enum";
import defaultImage from "../../../../../../../../../content/images/default-thumbnail.jpg";
import "./archive-editor.component.scss";
import { ApiInvokerService } from "../../../../../../../../../core/api";
import { Endpoints } from "../../../../../../../../../core/endpoints";
class ArchiveEditorPresenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                data: null,
                path: null
            },
            title:"",
            author: "",
            description: "",
            url: ""
        }
        this.state = this.props.article ? { ...this.props.article } : this.state;
        this.loadImage.bind(this);
    }

    onFieldChange(propName, event) {
        this.setState({ ...this.state, [propName]: event.target.value })
    }

    loadImage(event) {
        const path = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (loadEvent) => {
            this.setState({...this.state, image: { data: loadEvent.target.result, path: path }});
        }
        fileReader.readAsDataURL(path);
    }

    onSubmit(event) {
        event.preventDefault();
        ApiInvokerService.invokePost(Endpoints.Articles(), { ...this.state })
        .then(() => this.props.onCancelClick());
    }

    render() {
        return (
        <form onSubmit={this.onSubmit.bind(this)}>
                <div class="form-group">
                    <label for="inputTitle">Title</label>
                    <input type="text" value={this.state.title} onChange={this.onFieldChange.bind(this, "title")} class="form-control" id="inputTitle" placeholder="Title" />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputSource">Source</label>
                        <input type="text" value={this.state.url} onChange={this.onFieldChange.bind(this, "url")} class="form-control" id="inputSource" placeholder="Source" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputImageUrl">Image url</label>
                        <input type="url" class="form-control" id="inputImageUrl" placeholder="Image url" disabled/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputDescription">Description</label>
                    <textarea name="description" value={this.state.description} onChange={this.onFieldChange.bind(this, "description")} class="form-control" id="inputDescription" placeholder="Description"></textarea>
                </div>
                <div class="form-group">
                    <p >No Image</p>
                    <img src={this.state.image && this.state.image.data ? this.state.image.data : defaultImage} id="image" class="img-thumbnail loading" name="image" />
                </div>
                <div class="form-group">
                    <label for="fileInput">Example file input</label>
                    <input type="file" onChange={(event) => this.loadImage(event)} class="form-control-file" id="fileInput" />
                </div>
                <div class="form-group">
                    <label for="inputAuthor">Author</label>
                    <input type="text" value={this.state.author} onChange={this.onFieldChange.bind(this, "author")} class="form-control" id="inputAuthor" placeholder="Author" />
                </div>
                <button id="submit" type="submit" class="btn btn-primary cs-padding">Submit</button>
                <button id="cancel" onClick={this.props.onCancelClick} type="button" class="btn btn-secondary cs-padding">Cancel</button>
            </form>
        );
    }
}

export const ArchiveEditor = withRouter(connect(
    null,
    (dispatch) => ({
        onCancelClick: () => { dispatch(setEditorMode(EditorMode.None)) }
    })
)(ArchiveEditorPresenter));