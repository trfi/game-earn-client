import { useState, forwardRef, useImperativeHandle, ForwardRefRenderFunction } from 'react'

type VictoryNotiProps = {}
    
export type VictoryNotiHandle = {
  show: () => void,
}

const VictoryNoti: ForwardRefRenderFunction<VictoryNotiHandle, VictoryNotiProps> = (props, ref) => {
  const [showSnackbar, setShowSnackbar] = useState(false)

  useImperativeHandle(ref, () => ({
    show() {
      setShowSnackbar(true)
      setTimeout(() => {
        setShowSnackbar(false)
      }, 3000)
    },
  }))

  return (
    <div id="snackbar" className={showSnackbar ? 'show' : ''}>
      <img
          className="mx-auto"
          width={300}
          src="/images/victory.webp"
          alt="victory"
        />
    </div>
  )
}

export default forwardRef(VictoryNoti)
