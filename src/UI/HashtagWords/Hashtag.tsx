import {useSelector} from "react-redux";
import {hashtagSelector, wordSelector} from "../../BLL/selectors";
import {useLocation} from 'react-router-dom'
import {useParams, Redirect} from 'react-router-dom'
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../BLL/store";
import {getHashtag, getWord} from "../../BLL/slices/hashtag-words-slice";

function Words() {
    const [loadingHashtag, setLoadingHashtag] = useState(true)

    const hashtagId = useParams<{ hashtagId: string }>().hashtagId
    let wordNumber = Number((useLocation().search.match(/\?word=\d{1,}/) || [])[0]?.slice(6)) || 1

    const dispatch = useAppDispatch()
    const hashtag = useSelector(hashtagSelector)
    const word = useSelector(wordSelector)

    useEffect(() => {
        dispatch(getHashtag(hashtagId)).then(() => setLoadingHashtag(true))
    }, [hashtagId])

    useEffect(() => {
        if(!loadingHashtag ) {
            dispatch(getWord)
        }
    }, [hashtagId, wordNumber, loadingHashtag])


    if (!hashtagId) {
        return <Redirect to={'/'}/>
    }
    return <>{word.name}</>
}

export default Words