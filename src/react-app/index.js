import { Login } from "./components/login/login.component";

class Layout extends React.Component {
    constructor() {
        super();
        this.state = { name: "Alex" };
    }
    render() {
        return (
            <div>
                <h1>It works! {this.state.name}</h1>
                <Login />
            </div>
        );
    }
}

const app = document.getElementById("react-app");

ReactDOM.render(<Layout />, app);