import AFProvider from "../context/AFContext";
import IAFProvider from "../interfaces/IAFProvider";
import { Outlet, useNavigate} from "react-router-dom";
import NavbarAutomato from "../components/navbarAutomato";
import AF from "../classes/AF";

export default () => {

    let afProvider: IAFProvider = AFProvider();
    const navigate = useNavigate();

    if (afProvider.afState == null) {
        let automato = AF.load();
        if (automato != null) {
            afProvider.saveAF(automato);
        } else {
            navigate('/');
        }

    }

    return (
        <>
            <NavbarAutomato />
            <Outlet context={{ afProvider }}></Outlet>
        </>
    )
}