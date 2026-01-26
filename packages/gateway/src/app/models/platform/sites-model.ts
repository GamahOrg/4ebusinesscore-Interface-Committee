export class PlatformModelSitesTab1Array {
    data: PlatformModelSitesTab1[]
    totalPages: number
    totalItems: number
  
    constructor(data: PlatformModelSitesTab1[], totalPages: number, totalItems: number) {
      this.data = data
      this.totalPages = totalPages
      this.totalItems = totalItems
    }
  }
  export class PlatformModelSitesTab1 {
    id: string
    mainSetId: string
    siteName: string
    siteUrl: string
    constructor(id: string, mainSetId: string, siteName: string, siteUrl: string) {
      this.mainSetId = mainSetId
      this.siteName = siteName
      this.siteUrl = siteUrl
      this.id = id
    }
  }
  