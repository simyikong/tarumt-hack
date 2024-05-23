import "../../css/Dashboard.css"
import { Menu } from "../../app/face/Menu"
import { Detection } from "../../app/face/Detection"
import { Matching } from "../../app/face/Matching"
import { Similarity } from "../../app/face/Similarity"

export const Dashboard = () => {

    return (
        <div className="container dashboard">
            <div className="row">
                <div className="col-lg-3 my-box left-side">
                    <Menu />
                </div>
                <div className="col-lg-9 right-side">
                    <div className="row">
                        <Similarity />
                        <Detection />
                        <Matching />
                    </div>
                </div>
            </div>        
        </div>
    )
}