import React from "react";
import PropTypes from "prop-types";

import Highlighter from "react-highlight-words";
import "./archive-rable-row.component.scss";
class ArchiveTableRow extends React.Component {
    render() {
        return (
            <tr>
                <th scope="row">{this.props.index}</th>
                <td>
                    <Highlighter 
                        searchWords={[this.props.filter]} 
                        textToHighlight={this.props.article.title} 
                        highlightStyle={{ fontWeight: "normal" }}/>
                </td>
                <td>{this.props.article.description}</td>
                <td>{this.props.article.publishedAt}</td>
                <td><a href={this.props.article.url}>Link</a></td>
            </tr>
        );
    }
}

ArchiveTableRow.propsTypes = {
    index: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        publishedAt: PropTypes.string,
        url: PropTypes.string
    })
}

export default ArchiveTableRow;