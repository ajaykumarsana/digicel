import { AudioFile } from './audio-file';
import { VideoFile } from './video-file';

export class Entry {
    action: string;
    audioFile?: AudioFile;
    description: string;
    phoneNumber?: string;
    submenuId?: string;
    videoFile?: VideoFile;
    leadin?: string;

    constructor (sourceObject: Object) {
        this.action = sourceObject['action'] || '';
        this.audioFile = sourceObject['audioFile'] || {};
        this.description = sourceObject['description'] || '';
        this.phoneNumber =  sourceObject['phoneNumber'] || '';
        this.submenuId = sourceObject['submenuId'] || '';
        this.videoFile = sourceObject['videoFile'] || {};
        this.leadin = sourceObject['leadin'] || 'For';
    }
}
