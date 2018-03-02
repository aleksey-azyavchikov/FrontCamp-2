import ArchiveTable from "./archive-table/archive-table.component";
import React from "react";
import { ApiInvoker } from "../../../../../../../../core/api";
import { Endpoints } from "../../../../../../../../core/endpoints";
import { TemplateHelpers } from "../../../../../../../../core/helpers/templates/template.helper";
import * as actions from "./archive.actions";
import { connect } from "react-redux"
import { ArchiveFilter } from "./archive-filter/archive-filter.component";

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


    render() {
        return (
            <div class="archive--position">
                <div class="container">
                    <div class="card">
                        <div class="card-body">
                            <ArchiveFilter />
                            <ArchiveTable articles={this.props.articles} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const Archive = connect(
    (state) => ({ articles: state.archiveState.articles })
)(ArchivePresentor);