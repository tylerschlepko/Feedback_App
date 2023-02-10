import { FaTimes } from 'react-icons/fa'
import Card from './Shared/Card'
import PropTypes from 'prop-types'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'


function FeedbackItem({item}) {
    const {deleteFeedback} = useContext(FeedbackContext)

    return (
        <Card >
            <div className="num-display">{item.rating}</div>
            <button className="close" onClick={() => deleteFeedback(item.id)}><FaTimes color='purple'/></button>
            <div className="text-display">{item.text}</div>
        </Card>
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem