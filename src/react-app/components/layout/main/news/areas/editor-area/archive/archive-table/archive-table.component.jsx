import { Guid } from "../../../../../../../../../core/guid";
import { ArchiveTableRow } from "./archive-table-row/archive-table-row.component";
import { connect } from "react-redux";
import React from "react";
import "./archive-table.component.scss";

class ArchiveTablePresenter extends React.Component {

    render() {
        const headers = ["№", "Title", "Description", "Date", "Link"].map((name, index) => <th key={index} scope="col">{name}</th>)
        const rows = this.props.articles.map((article, index) => <ArchiveTableRow filter={this.props.filter} key={Guid.create()} index={index + 1} article={article} />)

        return (
            <table class="table table-bordered table-hover">
                <thead class="thead-dark">
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export const ArchiveTable = connect()(ArchiveTablePresenter)