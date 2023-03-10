import { createContext } from "react";
import { useState, useEffect } from "react";



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
        
        const response = await fetch('/feedback', {
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
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            setFeedback(feedback.filter((item) => item.id !== id))
            
            const response = await fetch(`/feedback/${id}`, {
                method: 'DELETE',
                mode: 'cors'
            } )
            const data = await response.json()
            console.log(data)
        }
    }

    //Add feedback
    const addFeedback = async (newFeedback) =>{
        const response = await fetch('/feedback', {
            method: 'POST',
            mode: 'cors',
            headers : {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        fetchFeedback()
        await setFeedback([newFeedback,...feedback])

    }

    //Set item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    //Update Feedback Item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            mode: 'cors',
            headers : {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        fetchFeedback()
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