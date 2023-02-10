import { FaTimes } from 'react-icons/fa'
import Card from './Shared/Card'
import PropTypes from 'prop-types'

function FeedbackItem({item, handleDelete}) {

    return (
        <Card >
            <div className="num-display">{item.rating}</div>
            <button className="close" onClick={() => handleDelete(item.id)}><FaTimes color='purple'/></button>
            <div className="text-display">{item.text}</div>
        </Card>
    )
}

FeedbackItem.propTypes = {
    item: PropTypes.object.isRequired
}

export default FeedbackItem