const assetUrls = Object.values(
  import.meta.glob<string>("../assets/**/*.{png,jpg,jpeg,svg,webp,gif,mp4,webm,ogg,mp3,wav,woff,woff2}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
);

const preloadedAssets = new Set<string>();
const decodingImages = new Set<HTMLImageElement>();

const imageExtensions = new Set(["png", "jpg", "jpeg", "svg", "webp", "gif"]);
const videoExtensions = new Set(["mp4", "webm"]);
const audioExtensions = new Set(["ogg", "mp3", "wav"]);
const fontExtensions = new Set(["woff", "woff2"]);

type PreloadKind = "image" | "video" | "audio" | "font" | "fetch";

function getAssetExtension(assetUrl: string) {
  return new URL(assetUrl, window.location.href).pathname.split(".").at(-1)?.toLowerCase() ?? "";
}

function getPreloadKind(assetUrl: string): PreloadKind {
  const extension = getAssetExtension(assetUrl);

  if (imageExtensions.has(extension)) return "image";
  if (videoExtensions.has(extension)) return "video";
  if (audioExtensions.has(extension)) return "audio";
  if (fontExtensions.has(extension)) return "font";

  return "fetch";
}

function appendPreloadLink(assetUrl: string, kind: PreloadKind) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = assetUrl;
  link.as = kind;

  if (kind === "font") {
    link.crossOrigin = "anonymous";
  }

  document.head.append(link);
}

function preloadImage(assetUrl: string) {
  const image = new Image();
  decodingImages.add(image);
  image.decoding = "async";
  image.src = assetUrl;

  return image.decode().catch(() => undefined).finally(() => decodingImages.delete(image));
}

function preloadAsset(assetUrl: string) {
  const kind = getPreloadKind(assetUrl);
  appendPreloadLink(assetUrl, kind);

  if (kind === "image") {
    return preloadImage(assetUrl);
  }

  return fetch(assetUrl, { cache: "force-cache" }).then(() => undefined).catch(() => undefined);
}

export function preloadAssets() {
  return Promise.all(
    assetUrls.map((assetUrl) => {
      if (preloadedAssets.has(assetUrl)) return Promise.resolve();

      preloadedAssets.add(assetUrl);
      return preloadAsset(assetUrl);
    }),
  ).then(() => undefined);
}
