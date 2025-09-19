export type SodukuGetParams = {
  offset?: string
  limit?: string
  ratting?: string
}

export interface SodukuType {
  id: string
  data: string
  rating: string
}

export type SodukuTypeReturn = SodukuType[]
