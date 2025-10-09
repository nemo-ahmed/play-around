import {createPortal} from 'react-dom'

export default function NotificationPortal({
  notifications,
}: {
  notifications: {
    id: string
    ele: React.JSX.Element
  }[]
}) {
  return createPortal(
    <ul className="fixed bottom-4 right-5 z-[9999909999] flex gap-4 justify-end flex-col">
      {notifications.map(notification => (
        <li key={notification.id}>{notification.ele}</li>
      ))}
    </ul>,
    document.body,
  )
}
