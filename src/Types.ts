
export type VideoRef = {
    url: string,
    videoTitle: string,
    media: string,
    videoHost:string,
}

export type VideoRefJSON = {
    ref_code: string,
    url: string,
    video_title: string,
    downloaded_for_backup: Boolean, 
    date: Date, 
    startTime: string, 
    media: string,
}

export type TGCase = {

    datetime: string,
    caseSite: string, 
    lat: number, 
    lon: number, 
    quantity: number, 
    cartridge: string,
    allVideoEvidence: VideoEvidence[],
}

export type TGCasesJSON = {
    lev1_case_code: string,
    case_datetime:string,
    case_site:string,
    lat:number,
    lon:number,
    quantity:number,
    cartridge:string,
    live_video_refs: string,
}

export type VideoEvidence = {

    refVideoCode: string,
    elapsedSeconds: number, 

}
