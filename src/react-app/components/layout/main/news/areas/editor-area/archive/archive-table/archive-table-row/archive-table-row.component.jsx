import React from "react";

class ArchiveTableRow extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>{this.props.article.title}</td>
                <td>{this.props.article.description}</td>
                <td>{this.props.article.publishedAt}</td>
                <td><a href={this.props.article.url}>Link</a></td>
            </tr>
        );
    }
}

export default ArchiveTableRow;