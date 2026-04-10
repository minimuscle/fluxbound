export class AudioManager {
  private backgroundMusic: HTMLAudioElement | null = null;
  private musicVolume: number = 0.5;
  private soundVolume: number = 1;
  private mutedMusic: boolean = false;
  private mutedSound: boolean = false;

  private soundEffects = {
    cardDraw: "/src/assets/audio/cardDraw.ogg",
    buttonHover: "/src/assets/audio/buttonHover.ogg",
  } as const;

  public playBackgroundMusic(source: string) {
    if (this.backgroundMusic?.src.includes(source)) return;

    this.stopBackgroundMusic();

    const audio = new Audio(source);
    audio.loop = true;
    audio.volume = this.mutedMusic ? 0 : this.musicVolume;
    audio.play().catch(() => {
      console.log("autoplay blocked");
      // autoplay blocked until user interaction
    });

    this.backgroundMusic = audio;
  }

  public stopBackgroundMusic() {
    if (!this.backgroundMusic) return;
    const audio = this.backgroundMusic;
    this.backgroundMusic = null;

    const startVolume = audio.volume;
    const fadeDurationMs = 2000;
    const fadeSteps = 100;
    const stepDurationMs = fadeDurationMs / fadeSteps;

    if (startVolume <= 0) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    let currentStep = 0;
    const fadeInterval = window.setInterval(() => {
      currentStep += 1;
      const nextVolume = startVolume * (1 - currentStep / fadeSteps);
      audio.volume = Math.max(0, nextVolume);

      if (currentStep >= fadeSteps) {
        window.clearInterval(fadeInterval);
        audio.pause();
        audio.currentTime = 0;
      }
    }, stepDurationMs);
  }

  public setMusicVolume(volume: number) {
    this.musicVolume = volume;
    if (this.backgroundMusic && !this.mutedMusic) {
      this.backgroundMusic.volume = volume;
    }
  }

  public setMusicMuted(muted: boolean) {
    console.log("set music muted", muted, this.backgroundMusic);
    this.mutedMusic = muted;
    if (this.backgroundMusic) {
      this.backgroundMusic.volume = muted ? 0 : this.musicVolume;
    }
  }

  public get musicMuted() {
    return this.mutedMusic;
  }

  public setSoundVolume(volume: number) {
    this.soundVolume = volume;
  }

  public setSoundMuted(muted: boolean) {
    this.mutedSound = muted;
  }

  public get soundMuted() {
    return this.mutedSound;
  }

  public playSoundEffect(name: keyof typeof this.soundEffects) {
    if (!this.soundEffects[name] || this.mutedSound) return;
    const audio = new Audio(this.soundEffects[name]);
    audio.volume = this.soundVolume;
    audio.play();
  }
}

export const audioManager = new AudioManager();
