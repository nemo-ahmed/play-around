'use client'

import {useActionState, useOptimistic} from 'react'
import {CgSpinnerTwoAlt} from 'react-icons/cg'
import {FaRegCircle} from 'react-icons/fa'

const prods = Array(10).fill(null)
const updateProds = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() > 0.9) {
        return reject('rejected')
      }
      prods.push(null)
      return resolve('added')
    }, 2000),
  ).catch(err => {
    console.log(err)
    return err
  })

function Products() {
  const [optimisticProds, addOptimisticProd] = useOptimistic(
    prods,
    (state, newlyAdded) => [...state, newlyAdded],
  )

  const [state, submitAction, isPending] = useActionState(async () => {
    addOptimisticProd(null)

    return await updateProds()
  }, null)
  const fakeProducts = prods
  console.log(prods, state)
  return (
    <div className="p-4">
      <form action={submitAction}>
        <input type="hidden" name="addProd" className="hidden" />
        <div>
          <button
            type="submit"
            className="flex gap-2 items-center justify-center"
          >
            {isPending && (
              <div className="relative flex">
                <FaRegCircle size={18} className="fill-gray-400" />
                <CgSpinnerTwoAlt size={18} className="absolute animate-spin" />
              </div>
            )}
            {isPending ? 'Adding' : 'Add Product'}
          </button>
        </div>
        {/* // ? Bla Bla fading after a certain time. I might do it later */}
        {state === 'added' && (
          <div className="text-green-800 dark:text-green-400">
            Product Added
          </div>
        )}
        {state === 'failed' && (
          <div className="text-red-800 dark:text-red-400">
            Failed to add product
          </div>
        )}
      </form>

      <div className="flex gap-2 mt-3">
        {optimisticProds.map((_, i) => (
          <div key={`prod-${i}`} className="card px-3 py-2.5 rounded-md">
            Prod {i}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
