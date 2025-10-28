import { useLocation } from "react-router-dom"
import type { SignDetailPageProps } from "../../../types/page/sign/detail.type"

function SignDetailPage() {
    const location = useLocation()
    const props = location.state as SignDetailPageProps
    return (
        <div>
            <img src={props.imgUrl}/>
            <p>{props.label}</p>
            <p>{props.explan}</p>
        </div>
    )
}

export default SignDetailPage