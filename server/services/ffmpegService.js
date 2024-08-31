import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

// Function to convert video using ffmpeg
const convertVideo = async (videoPath, outputPath, videoUrl) => {
    const ffmpegCommand = `ffmpeg -i ${videoPath} ` +
        `-vf "scale=-2:144" -c:v libx264 -b:v 400k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/144p/segment%03d.ts" -hls_flags single_file -hls_list_size 0 -hls_base_url "${videoUrl}/144p/" ${outputPath}/144p/playlist.m3u8 ` +
        `-vf "scale=-2:240" -c:v libx264 -b:v 800k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/240p/segment%03d.ts" -hls_flags single_file -hls_list_size 0 -hls_base_url "${videoUrl}/240p/" ${outputPath}/240p/playlist.m3u8 ` +
        `-vf "scale=-2:320" -c:v libx264 -b:v 1200k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/320p/segment%03d.ts" -hls_flags single_file -hls_list_size 0 -hls_base_url "${videoUrl}/320p/" ${outputPath}/320p/playlist.m3u8 ` +
        `-vf "scale=-2:480" -c:v libx264 -b:v 2000k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/480p/segment%03d.ts" -hls_flags single_file -hls_list_size 0 -hls_base_url "${videoUrl}/480p/" ${outputPath}/480p/playlist.m3u8 ` +
        `-vf "scale=-2:720" -c:v libx264 -b:v 3500k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/720p/segment%03d.ts" -hls_flags single_file -hls_list_size 0 -hls_base_url "${videoUrl}/720p/" ${outputPath}/720p/playlist.m3u8 ` +
        `-vf "scale=-2:1080" -c:v libx264 -b:v 6000k -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${outputPath}/1080p/segment%03d.ts" -hls_flags single_file -hls_list_size 0 -hls_base_url "${videoUrl}/1080p/" ${outputPath}/1080p/playlist.m3u8`;

    try {
        const { stdout, stderr } = await execPromise(ffmpegCommand);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        return { success: true };
    } catch (error) {
        console.error(`exec error: ${error}`);
        return { success: false, error };
    }
};

export default convertVideo;
