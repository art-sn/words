import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../BLL/store";
import {useSelector} from "react-redux";
import {hashtagSelector, wordSelector} from "../../../BLL/selectors";
import {getWord} from "../../../BLL/slices/hashtag-words-slice";

function Word() {
    const [loading, setLoading] = useState(true)

    const wordNumber = Number((useLocation().search.match(/\?word=\d{1,}/) || [])[0]?.slice(6)) || 1

    const dispatch = useAppDispatch()
    const hashtag = useSelector(hashtagSelector)
    const word = useSelector(wordSelector)
    console.log(wordNumber, hashtag, word)
    useEffect(() => {
        if (wordNumber <= hashtag.wordIds.length) {
            dispatch(getWord(hashtag.wordIds[wordNumber - 1])).then(() => setLoading(false))
        } else if (loading) {
            setLoading(false)
        }
    }, [hashtag, wordNumber])

    if (loading) return <>Loading...</>
    if (!hashtag.wordIds.length) return <>У этого хештэга пока нету слов</>
    if (!word.id) return <>Слова Закончились</>

    return <div style={{position: 'relative'}}>
        <img style={{width: 300, filter: 'blur(5px)'}}
            src={word.image ? word.image : 'https://res.cloudinary.com/artur0015/image/upload/v1621432815/Image_25_e406nl.jpg'}/>
            <span>{word.name}</span>
    </div>
}

export default Word