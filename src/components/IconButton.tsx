import {cx} from '@/other/exports'
import {
  type Dispatch,
  type SetStateAction,
  useState,
  type ButtonHTMLAttributes,
} from 'react'
import {motion} from 'motion/react'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  isActive?: boolean
  y: number
  setY: Dispatch<SetStateAction<number>>
}

const BORDER = 6
const transitionVal = (isActive?: boolean) => (isActive ? 13 : 15)

function IconButton({
  'aria-label': ariaLabel,
  className,
  children,
  label,
  isActive,
  setY,
  y,
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cx(
        'size-full active:scroll-auto flex items-center justify-center overflow-hidden hover:bg-rich-black-800/10 active:bg-rich-black-800/18 disabled:bg-rich-black/10 dark:disabled:bg-platinum-900/10',
        className,
        'transition-all',
        {
          'h-8': !isActive,
        },
      )}
      style={{
        height: isActive ? `calc(2rem - ${BORDER}px)` : undefined,
        ...(style ?? {}),
      }}
      onMouseEnter={e => {
        setY(-transitionVal(isActive) - (isActive ? 3 : 1))
        onMouseEnter?.(e)
        console.log(true)
      }}
      onMouseLeave={e => {
        setY(transitionVal(isActive))
        onMouseLeave?.(e)
      }}
      {...rest}
    >
      <motion.div
        className="size-full flex items-center justify-center flex-col gap-[7px] text-center first:size-9/12 first:mx-auto first:my-1"
        animate={{y}}
        initial={{y}}
        aria-hidden
        transition={{type: 'spring'}}
      >
        <div className="size-full">{children}</div>
        <p aria-hidden className="size-full mx-auto capitalize text-nowrap">
          {label}
        </p>
      </motion.div>
    </button>
  )
}

function IconButtonWithActive({
  isActive,
  ...rest
}: Omit<IconButtonProps, 'y' | 'setY'>) {
  const [y, setY] = useState(transitionVal(isActive))
  const color = '#9ae600'

  if (!isActive) return <IconButton {...rest} y={y} setY={setY} />
  return (
    <div
      className="w-full h-8 flex items-center transition-all justify-center isolate relative overflow-hidden"
      role="button"
      tabIndex={0}
    >
      <div
        style={{
          backgroundImage: `conic-gradient(from 45deg, ${color}40, ${color}50 , ${color}, ${color}40, ${color}40, ${color}50, ${color}, ${color}40, ${color}40)`,
          animation: 'borderanimation 2.5s linear infinite',
        }}
        className="flex size-[1000%] transition-all items-center justify-center isolate absolute z-10"
      />
      <div
        style={{
          width: `calc(100% - ${BORDER}px)`,
        }}
        className={cx(
          'z-20 absolute transition-all',
          'w-full bg-outer-space-800 dark:bg-eerie-black-600',
        )}
      >
        <IconButton {...rest} isActive={isActive} y={y} setY={setY} />
      </div>
    </div>
  )
}

export default IconButtonWithActive
