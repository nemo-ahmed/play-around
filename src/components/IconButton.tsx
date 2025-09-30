import {cx} from '@/other/exports'
import {motion} from 'motion/react'
import {useState, type ButtonHTMLAttributes} from 'react'

function IconButton({
  'aria-label': ariaLabel,
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const [y, setY] = useState(0)
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={cx(
        'size-full overflow-hidden flex items-center justify-center hover:bg-rich-black-800/10 active:bg-rich-black-800/18',
        className,
      )}
      {...rest}
      onMouseEnter={() => {
        setY(-32)
        console.log(true)
      }}
      onMouseLeave={() => {
        setY(0)
      }}
    >
      <motion.div
        className="size-full text-center first:size-9/12 first:mx-auto first:my-1"
        animate={{y}}
        transition={{type: 'spring'}}
      >
        {children}
        <p className="size-9/12 mx-auto mt-[7px] capitalize text-nowrap">
          {ariaLabel}
        </p>
      </motion.div>
    </button>
  )
}

export default IconButton
