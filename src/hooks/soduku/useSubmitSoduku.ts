import {useMutation} from '@tanstack/react-query'

import {notify} from '@/context'
import {SodukuPromiseData} from '@/types/soduku'

function useSubmitSoduku() {
  return useMutation({
    mutationKey: ['submit'],
    mutationFn: (body: SodukuPromiseData) =>
      fetch('http://localhost:3000/api/soduku/submit', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess() {
      notify({
        title: 'Woohoo!',
        icon: '🥳',
        message: 'Soduku successfully saved',
      })
    },
    onError() {
      notify({
        title: 'Oh No!',
        icon: '😔',
        message: 'Soduku wasn`t saved',
      })
    },
  })
}

export {useSubmitSoduku}
