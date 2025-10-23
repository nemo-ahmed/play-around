'use client'
import useInfiniteScroll from '@/hooks/useInfiniteScroll'
import type {BirdDataType} from '@/types/useBirds'

// ? id: the catalogue number of the recording on xeno-canto
// ? gen: the generic name of the species
// ? sp: the specific name (epithet) of the species
// ? ssp: the subspecies name (subspecific epithet)
// ? group: the group to which the species belongs (birds, grasshoppers, bats)
// ? en: the English name of the species
// ? rec: the name of the recordist
// ? cnt: the country where the recording was made
// ? loc: the name of the locality
// ? lat: the latitude of the recording in decimal coordinates
// ? lng: the longitude of the recording in decimal coordinates
// ? type: the sound type of the recording (combining both predefined terms such as 'call' or 'song' and additional free text options)
// ? sex: the sex of the animal
// ? stage: the life stage of the animal (adult, juvenile, etc.)
// ? method: the recording method (field recording, in the hand, etc.)
// ? url: the URL specifying the details of this recording
// ? file: the URL to the audio file
// ? file-name: the original file name of the audio file
// ? sono: an object with the urls to the four versions of sonograms
// ? osci: an object with the urls to the three versions of oscillograms
// ? lic: the URL describing the license of this recording
// ? q: the current quality rating for the recording
// ? length: the length of the recording in minutes
// ? time: the time of day that the recording was made
// ? date: the date that the recording was made
// ? uploaded: the date that the recording was uploaded to xeno-canto
// ? also: an array with the identified background species in the recording
// ? rmk: additional remarks by the recordist
// ? bird-seen: despite the field name (which was kept to ensure backwards compatibility), this field indicates whether the recorded animal was seen
// ? animal-seen: was the recorded animal seen?
// ? playback-used: was playback used to lure the animal?
// ? temperature: temperature during recording (applicable to specific groups only)
// ? regnr: registration number of specimen (when collected)
// ? auto: automatic (non-supervised) recording?
// ? dvc: recording device used
// ? mic: microphone used
// ? smp: sample rate

const heads: Record<string, keyof BirdDataType> = {
  id: 'id',
  name: 'en',
  type: 'type',
  gender: 'sex',
  taken: 'date',
  uploaded: 'uploaded',
}

function Table({
  data: incomingData,
  onPageChange,
  page,
  numPages,
  isFetching,
}: {
  data: BirdDataType[]
  onPageChange?: (p: number) => void
  page?: number
  numPages: number
  isFetching: boolean
}) {
  const {data, onScroll} = useInfiniteScroll({
    data: incomingData,
    onPageChange,
    page,
    numPages,
    isFetching,
  })

  return (
    <table className="w-full text-gray-700 dark:text-gray-300">
      <thead className="bg-black/20">
        <tr className="grid grid-cols-6 border-[0.5px] border-gray-500">
          {Object.keys(heads).map(header => (
            <th
              key={`table-header-${header}`}
              className="border-r-[0.5px] border-gray-500 capitalize text-start py-1.5 px-1"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        className="flex flex-col h-[calc(100dvh-13.7rem)] overflow-auto"
        onScroll={onScroll}
      >
        {data.map(n => (
          <tr
            key={n.id}
            className="grid grid-cols-6 border-[.5px] border-t-0 border-gray-500 py-0.5"
          >
            {Object.values(heads).map(key => (
              <td
                key={`table-body-${n.id}-${key}`}
                className="px-1 py-0.5 capitalize"
              >
                {(n[key] as string) || 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
