import { useState, useContext, useEffect } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from 'context/FeedbackContext'

function FeedbackForm() {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.isEdit === true) {
      setBtnDisabled(false)
      setReviewText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  const handleTextChange = (e) => {
    if (reviewText === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (reviewText !== '' && reviewText.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }

    setReviewText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (reviewText.trim().length > 10) {
      const newFeedback = {
        text: reviewText,
        rating,
      }

      if (feedbackEdit.isEdit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
        setBtnDisabled(true)
      } else {
        addFeedback(newFeedback)
        setBtnDisabled(true)
      }
      setReviewText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Rate us?</h2>
        {/* Rating component */}
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            placeholder="write a review"
            onChange={handleTextChange}
            value={reviewText}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
