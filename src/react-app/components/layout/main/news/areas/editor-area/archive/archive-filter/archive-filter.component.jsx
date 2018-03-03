
import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../archive.actions";
import "./archive-filter.component.scss";

class ArchiveFilterPresenter extends React.Component {

    render() {
        return this.layout();
    }

    layout = () => (
        <div class="archive-filter--padding">
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline-info my-2 my-sm-0 cs-btn" type="button" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="false" aria-controls="collapseSearch">
                    Filter
                </button>
                <div class="collapse" id="collapseSearch">
                    <input class="form-control mr-sm-2" onChange={this.props.OnFilterChange} type="filter" placeholder="Some text" aria-label="Filter" />
                </div>
            </form>
        </div>
    );
}

export const ArchiveFilter = connect(
    null,
    (dispatch) => ({
        OnFilterChange: (event) => dispatch(setFilter(event.target.value))
    })
)(ArchiveFilterPresenter)