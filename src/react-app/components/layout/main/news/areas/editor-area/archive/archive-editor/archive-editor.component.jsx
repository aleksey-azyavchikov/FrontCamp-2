import React from "react";
import { connect } from "react-redux";
import { setEditorMode } from "../../../../../../../../redux/modules/archive";
import { EditorMode } from "../../../../../../../../../core/enums/editor-mode.enum";
import defaultImage from "../../../../../../../../../content/images/default-thumbnail.jpg";
import "./archive-editor.component.scss";
class ArchiveEditorPresenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: null,
            imagePath: null
        }
        this.loadImage.bind(this);
    }

    loadImage(event) {
        const path = event.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = (loadEvent) => {
            this.setState({...this.state, imageData: loadEvent.target.result, imagePath: path});
        }
        fileReader.readAsDataURL(path);
    }

    render() {
        return (
            <form>
                <div class="form-group">
                    <label for="inputTitle">Title</label>
                    <input type="text" class="form-control" id="inputTitle" placeholder="Title" />
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="inputSource">Source</label>
                        <input type="url" class="form-control" id="inputSource" placeholder="Source" />
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inputImageUrl">Image url</label>
                        <input type="url" class="form-control" id="inputImageUrl" placeholder="Image url" disabled/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputDescription">Description</label>
                    <textarea name="description" class="form-control" id="inputDescription" placeholder="Description"></textarea>
                </div>
                <div class="form-group">
                    <p >No Image</p>
                    <img src={this.state.imageData ? this.state.imageData : defaultImage} id="image" class="img-thumbnail loading" name="image" />
                </div>
                <div class="form-group">
                    <label for="fileInput">Example file input</label>
                    <input type="file" onChange={(event) => this.loadImage(event)} class="form-control-file" id="fileInput" />
                </div>
                <div class="form-group">
                    <label for="inputAuthor">Author</label>
                    <input type="text" class="form-control" id="inputAuthor" placeholder="Author" />
                </div>
                <button id="submit" type="button" class="btn btn-primary cs-padding">Submit</button>
                <button id="cancel" onClick={this.props.onCancelClick} type="button" class="btn btn-secondary cs-padding">Cancel</button>
            </form>
        );
    }
}

export const ArchiveEditor = connect(
    null,
    (dispatch) => ({
        onCancelClick: () => { dispatch(setEditorMode(EditorMode.None)) }
    })
)(ArchiveEditorPresenter);