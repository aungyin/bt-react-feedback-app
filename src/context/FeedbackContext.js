import { createContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'Lorem ipsum 1.',
    },
    {
      id: 2,
      rating: 9,
      text: 'Lorem ipsum 2.',
    },
    {
      id: 3,
      rating: 8,
      text: 'Lorem ipsum 3.',
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    isEdit: false,
  })

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)
    setFeedback([newFeedback, ...feedback])
  }

  // delete feedback
  const deleteFeedback = (id) => {
    if (id) {
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //  Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, isEdit: true })
  }

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
    // reset feedback edit mode
    setFeedbackEdit({
      item: {},
      isEdit: false,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        // functions
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
