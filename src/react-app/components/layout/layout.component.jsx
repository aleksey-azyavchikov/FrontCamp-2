
import { Header } from "../header/header.component";
import { PageLoader } from "../page-loader/page-loader.component";
import { Navigation } from "../navigation/navigation.component";

export class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Header/>
                <Navigation/>
                <PageLoader/>
            </div>
        );
    }
}