import * as FFmpeg from '@ffmpeg/ffmpeg';

export default async (webmBlob: Blob): Promise<Blob> =>  {
  const ffmpeg = new FFmpeg.FFmpeg({ log: false });
  ffmpeg.readFile()
  await ffmpeg.load();

  const inputName = 'input.webm';
  const outputName = 'output.mp3';

  ffmpeg.FS('writeFile', inputName, await fetch(webmBlob).then((res) => res.arrayBuffer()));

  await ffmpeg.run('-i', inputName, outputName);

  const outputData = ffmpeg.FS('readFile', outputName);
  const outputBlob = new Blob([outputData.buffer], { type: 'audio/mp3' });

  return outputBlob;
}