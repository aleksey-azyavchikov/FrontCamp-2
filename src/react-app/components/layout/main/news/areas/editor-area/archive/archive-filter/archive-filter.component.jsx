
import React from "react";
import "./archive-filter.component.scss";

export class ArchiveFilter extends React.Component {

    render() {
        return this.layout();
    }

    layout = () => (
        <div class="archive-filter--padding">
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline-info my-2 my-sm-0 cs-btn" type="button" data-toggle="collapse" data-target="#collapseSearch" aria-expanded="false" aria-controls="collapseSearch">
                    Search
                </button>
                <div class="collapse" id="collapseSearch">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                </div>
            </form>
        </div>
    );
}