import React from "react";
import Highlighter from "react-highlight-words";
import "./archive-rable-row.component.scss";
class ArchiveTableRow extends React.Component {
    render() {
        console.log(this.props.filter);
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

export default ArchiveTableRow;