export type SodukuGetParams = {
  offset?: string
  limit?: string
  ratting?: string
}

export interface SodukuType {
  id: string
  soduku: string
  rating: string
}

export interface SodukuTypeReturn {
  total: number
  data: SodukuType[]
}
