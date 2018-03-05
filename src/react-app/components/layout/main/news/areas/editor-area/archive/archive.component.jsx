import ArchiveTable from "./archive-table/archive-table.component";
import React from "react";
import { ApiInvoker } from "../../../../../../../../core/api";
import { Endpoints } from "../../../../../../../../core/endpoints";
import { TemplateHelpers } from "../../../../../../../../core/helpers/templates/template.helper";
import * as actions from "./archive.actions";
import { connect } from "react-redux"
import { ArchiveFilter } from "./archive-filter/archive-filter.component";

import { RegexStoreService } from "../../../../../../../../core/services/regex-store.service";
import { ArchivePanel } from "./archive-panel/archive-panel.component";
import { EditorMode } from "../../../../../../../../core/enums/editor-mode.enum";
import { ArchiveEditor } from "./archive-editor/archive-editor.component";

import "./archive.component.scss";
class ArchivePresentor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(this.getArticlesHttp)
    }

    getArticlesHttp(dispatch) {
        let apiInvoker = ApiInvoker.i();
        dispatch(actions.articlesFetchStarted());
        apiInvoker.invokeGet(Endpoints.Articles())
            .then(data => dispatch(actions.aticlesFetchFinished(TemplateHelpers.getInstance().formatArticles(data.articles))))
            .catch(error => dispatch((actions.articlesFetchRejected(error))));
    }

    display() {
        const table = (
            <div>
                <ArchivePanel />
                <ArchiveFilter />
                <ArchiveTable articles={this.props.articles} filter={this.props.filter} />
            </div>
        );
        const editor = (
            <div>
                <ArchiveEditor />
            </div>
        );

        const result = this.props.mode === EditorMode.Add
            ? editor
            : table
        return result;
    }

    isMode(mode) {
        return this.props.mode === mode;
    }


    render() {
        return (
            <div class="archive--position">
                <div class="container">
                    <div class="row justify-content-between">
                        <div class="col-4">
                            <ArchiveFilter />
                        </div>
                        <div class="col-1">
                            <ArchivePanel />
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                    {
                                        this.isMode(EditorMode.Add) 
                                        ? <ArchiveEditor /> 
                                        : <ArchiveTable articles={this.props.articles} filter={this.props.filter} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const Archive = connect(
    (state) => ({
        mode: state.archiveState.editorMode,
        articles: RegexStoreService.i().filterArticlesByTitle(state.archiveState.articles, state.archiveState.filter),
        filter: state.archiveState.filter
    })
)(ArchivePresentor);