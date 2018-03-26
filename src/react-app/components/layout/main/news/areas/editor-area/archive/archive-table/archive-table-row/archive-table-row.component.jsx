import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


import Highlighter from "react-highlight-words";
import "./archive-rable-row.component.scss";
import { setSelectedArticle } from "../../../../../../../../../redux/modules/archive";
class ArchiveTableRowPresenter extends React.Component {
    onClick() {
        this.props.dispatch(setSelectedArticle(this.props.article));
    }

    render() {
        return (
            <tr class={this.props.isSelected ? "article selected-row" : "aricle"} onClick={this.onClick.bind(this)}>
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

ArchiveTableRowPresenter.propsTypes = {
    index: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    article: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        publishedAt: PropTypes.string,
        url: PropTypes.string
    })
}

export const ArchiveTableRow = connect()(ArchiveTableRowPresenter);