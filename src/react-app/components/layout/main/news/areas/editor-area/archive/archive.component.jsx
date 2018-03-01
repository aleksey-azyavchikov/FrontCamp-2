import ArchiveTable from "./archive-table/archive-table.component";
import React from "react";


class Archive extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            articles: [{ url: "http://ree", title: "ololo"}, { title: "ere", utl: "http://rer" }]
        }
    }

    render() {
        return (
            <ArchiveTable articles={this.state.articles} />
        )
    }
}

export default Archive;