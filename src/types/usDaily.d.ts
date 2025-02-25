type CommonType<CalculatedExtra = Record<string, unknown> | undefined> = {
  value: number
  calculated: {
    population_percent: number
    change_from_prior_day: number
    seven_day_change_percent: number
  } & CalculatedExtra
}

type TotalType = CommonType
type CurrentlyType = CommonType<{change_from_prior_day: number}>

export interface USDailyType {
  links: {self: string}
  meta: {
    build_time: string
    license: string
    version: string
    field_definitions: [
      {
        name: string
        field: string
        deprecated: boolean
        prior_names: string[]
      },
    ]
  }
  data: [
    {
      date: string
      states: number
      cases: {
        total: TotalType
      }
      testing: {
        total: TotalType
      }
      outcomes: {
        hospitalized: {
          currently: CurrentlyType
          in_icu: {
            currently: CurrentlyType
          }
          on_ventilator: {
            currently: CurrentlyType
          }
        }
        death: {
          total: CurrentlyType
        }
      }
    },
  ]
}
