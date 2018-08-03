import { AudioFile } from '../auto-attendant/audio-file';
import { VideoFile } from '../auto-attendant/video-file';
import { KeyConfigurationObject } from '../auto-attendant/key-configuration';

export class AfterHoursMenu {
    announcementSelection: string;
    audioFile: AudioFile;
    enableFirstMenuLevelExtensionDialing: boolean;
    keyConfiguration: KeyConfigurationObject[];
    videoFile: VideoFile;

    constructor (sourceObject: Object) {
        this.announcementSelection = sourceObject['announcementSelection'] || '';
        this.audioFile = sourceObject['audioFile'] || {};
        this.enableFirstMenuLevelExtensionDialing = sourceObject['enableFirstMenuLevelExtensionDialing'] || false;
        this.videoFile = sourceObject['videoFile'] || {};
    }
}

