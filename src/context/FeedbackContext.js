import { createContext } from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'


const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [feedback, setFeedback] = useState([])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit : false
    })

    useEffect(() => {
        fetchFeedback()
    },[])

    //Fetch feedback
    const fetchFeedback = async() => {
        
        const response = await fetch('http://localhost:5001/feedback', {
            method: 'GET',
            mode: 'cors',
            headers : {
                "Content-Type" : 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);
        setFeedback(data)
        setIsLoading(false)
    }


    //delete Feedback
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?'))
        setFeedback(feedback.filter((item) => item.id !== id))
    }

    //Add feedback
    const addFeedback = (newFeedback) =>{
        newFeedback.id = uuidv4()
        setFeedback([newFeedback,...feedback])
    }

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Update Feedback Item
    const updateFeedback = (id, updItem) => {
        setFeedback(feedback.map((item) => (item.id === id ? {...item, ...updItem} : item)))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,

    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext