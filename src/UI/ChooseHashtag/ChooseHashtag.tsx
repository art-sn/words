import {useSelector} from "react-redux";
import {hashtagsSelector} from "../../BLL/selectors";
import Hashtag from "./Hashtag";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../BLL/store";
import {getMyHashtags} from "../../BLL/slices/hashtags-slice";

function Hashtags() {
    const dispatch = useAppDispatch()
    const hashtags = useSelector(hashtagsSelector)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(getMyHashtags()).then(() => setLoading(false))
    }, [])

    if (isLoading) return <>Loading...</>
    if (!hashtags.length) return <h1 style={{textAlign: 'center', fontSize: '1.5rem'}}>Список хештэгов пуст</h1>

    return <div>
        {hashtags.map(h => <Hashtag hashtag={h} key={h.id}/>)}
    </div>
}

export default Hashtags