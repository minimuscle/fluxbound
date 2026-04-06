export class AudioManager {
  private backgroundMusic: HTMLAudioElement | null = null;
  private musicVolume: number = 1;
  private soundVolume: number = 1;
  private muted: boolean = false;

  public playBackgroundMusic(source: string) {
    console.log("playing music", source);
    if (this.backgroundMusic?.src.includes(source)) return;

    this.stopBackgroundMusic();

    const audio = new Audio(source);
    audio.loop = true;
    audio.volume = this.muted ? 0 : this.musicVolume;
    audio.play().catch(() => {
      console.log("autoplay blocked");
      // autoplay blocked until user interaction
    });

    this.backgroundMusic = audio;
  }

  public stopBackgroundMusic() {
    if (!this.backgroundMusic) return;
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic = null;
  }

  public setMusicVolume(volume: number) {
    this.musicVolume = volume;
    if (this.backgroundMusic && !this.muted) {
      this.backgroundMusic.volume = volume;
    }
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = muted ? 0 : this.musicVolume;
    }
  }
}

export const audioManager = new AudioManager();
