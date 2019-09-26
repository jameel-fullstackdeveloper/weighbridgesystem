import React from "react";
import { ToastProvider, useToasts } from 'react-toast-notifications'

const FormWithToasts = () => {
  const { addToast } = useToasts()

  const onSubmit = async value => {
    const { error } = await dataPersistenceLayer(value)

    if (error) {
      addToast(error.message, { appearance: 'error' })
    } else {
      addToast('Saved Successfully', { appearance: 'success' })
    }
  }

  return <form onSubmit={onSubmit}> <button type="submit">submit</button></form>
}

const Notification = () => (
  <ToastProvider>
    <FormWithToasts />
  </ToastProvider>
)

export default Notification;