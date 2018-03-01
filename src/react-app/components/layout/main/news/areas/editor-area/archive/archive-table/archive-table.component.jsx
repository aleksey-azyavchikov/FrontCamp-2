import { Guid } from "../../../../../../../../../core/guid";
import ArchiveTableRow from "./archive-table-row/archive-table-row.component";
import React from "react";
import "./archive-table.component.scss";

class ArchiveTable extends React.Component {

    render() {
        const headers = ["№", "Title", "Description", "Handle", "Link"].map((name, index) => <th key={index} scope="col">{name}</th>)
        const rows = this.props.articles.map((article, index) => <ArchiveTableRow key={Guid.create()} index={index + 1} article={article} />)

        return (
            <div class="container">
                <table class="table table-bordered table-hover archive-table--position">
                    <thead class="thead-dark">
                        <tr>
                            {headers}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArchiveTable;