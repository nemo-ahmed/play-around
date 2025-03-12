import genericFetch from '@/api/fetch'
import {BIRDS_URL} from '@/api/urls'
import {BirdsWatchResponse} from '@/types/useBirds'
import {useQuery} from '@tanstack/react-query'
import useInfiniteData from './useInfiniteData'

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

function useBirdsWatch({
  page = 1,
  query = 'cnt:portugal',
}: {
  query: string
  page: number
}) {
  const url = new URL(BIRDS_URL)
  url.searchParams.append('query', query)
  url.searchParams.append('page', page.toString())
  const {data, isFetching, isLoading} = useQuery<BirdsWatchResponse>({
    queryFn: () => genericFetch({url: url.toString()}),
    queryKey: ['Birds', 'watch', query, `page:${page}`],
  })
  const infiniteData = useInfiniteData({
    data,
    page,
    onDataReturn(obj) {
      const vals = Object.values(obj)
      return {
        ...vals.at(0),
        recordings: vals.flatMap(d => d?.recordings ?? []),
      } as BirdsWatchResponse
    },
    isLoading: isFetching || isLoading,
  })
  return {data: infiniteData as BirdsWatchResponse, isFetching}
}

export default useBirdsWatch
