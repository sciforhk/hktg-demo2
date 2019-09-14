import {TGCase, TGCasesJSON} from './Types'; 
import {VideoRef, VideoRefJSON} from './Types'; 
import {VideoEvidence} from './Types'; 


// Function for decoding the JSON-format live_video_refs in refVideoRawData
function decodeLiveVideoRefs(rawJSON:string): VideoEvidence[]{
    let rawVideoEvidence = JSON.parse(rawJSON);
    let allVideoEvidence = Object.keys(rawVideoEvidence).map(function(key){

        return {'refVideoCode':key, 
                'elapsedSeconds':getElapsedSecondsFromTimeString(rawVideoEvidence[key])}

    });
    return allVideoEvidence;

}
// Function for decoding the JSON-format refVideoRawData
function decodeRefVideo(json:VideoRefJSON): VideoRef{
    return{
        url: json['url'],
        videoTitle: json['video_title'], 
        media: json['media'],
        videoHost:getVideoHost(json['url'])
    }    
}

// Function for decoding the JSON-format TGCasesRawData
function decodeTGCase(caseKey:string,json:TGCasesJSON): TGCase{
    return{
        datetime: json['case_datetime'],
        caseSite: json['case_site'],
        lat: json['lat'], 
        lon: json['lon'], 
        quantity: json['quantity'], 
        cartridge: json['cartridge'],
        allVideoEvidence: decodeLiveVideoRefs(json['live_video_refs']),
    }    
}

// Function for converting hh:mm:ss string to elapsed seconds
function getElapsedSecondsFromTimeString(timeString: string):number{
    // Presume the timeString is in the format of hh:mm:ss
    let components = timeString.split(':');
    let elapsedSeconds:number = parseInt(components[0])*3600 +parseInt(components[1])*60 + parseInt(components[2]);
    return elapsedSeconds;
}

// Function for determing the host of the video 
function getVideoHost(url:string): string{

    let videoHost:string = 'unkown';

    // may need to consider shorten URLs in future 
    if (url.includes('facebook')){ 
        videoHost = 'facebook';
    } else if (url.includes('youtube')){
        videoHost = 'youtube';
    }

    return videoHost;
}



// Read the informaion of the live videos from the JSON file
const refVideoRawData = require('./Data/TG-livevideo_ref_df_lev1_compiled-20190911.json');

// Parse the refVideoRawData and create a 'dictionary' contaning VideoRef objects
var refVideosInfo_temp: {[key:string]: VideoRef} = {};

for (var i_video in refVideoRawData){
    if (refVideoRawData.hasOwnProperty(i_video)) {
        refVideosInfo_temp[i_video] = decodeRefVideo(refVideoRawData[i_video])
    }
}

// Export refVideoRawData directly for external uses
export const refVideosInfo = refVideosInfo_temp;



// Read the information of all the TG cases from the JSON file
const TGCasesRawData = require('./Data/TG-Database_compiled-20190911.json');

// Create an array of tg cases for external uses
export const TGData =  Object.keys(TGCasesRawData).map(function(key){

    return decodeTGCase(key,TGCasesRawData[key]);

});
