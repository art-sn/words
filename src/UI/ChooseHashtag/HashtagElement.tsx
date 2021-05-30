import {HashtagType} from "../../common-types";
import {Link} from "react-router-dom";

type PropsType = {
    hashtag: HashtagType
}

function Hashtag({hashtag}: PropsType) {
    return <Link to={`/words/${hashtag.id}`}>
        <div>
            <img src={hashtag.image} style={{width: 300, filter: 'blur(0px)'}}/>
            <span>{hashtag.title}</span>
        </div>
    </Link>
}

export default Hashtag