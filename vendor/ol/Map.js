const DEFAULT_BBOX_SCALE = 180;

function resolveElement(target) {
  if (!target) {
    return null;
  }

  if (typeof target === "string") {
    return document.getElementById(target) ?? null;
  }

  if (target instanceof HTMLElement) {
    return target;
  }

  return null;
}

function createIframe(view) {
  const iframe = document.createElement("iframe");
  const [lon, lat] = Array.isArray(view?.center) ? view.center : [0, 0];
  const zoom = typeof view?.zoom === "number" ? view.zoom : 2;
  const bboxRadius = DEFAULT_BBOX_SCALE / Math.max(2 ** zoom, 1);
  const minLon = lon - bboxRadius;
  const maxLon = lon + bboxRadius;
  const minLat = lat - bboxRadius / 2;
  const maxLat = lat + bboxRadius / 2;

  const url = new URL("https://www.openstreetmap.org/export/embed.html");
  url.searchParams.set("bbox", `${minLon},${minLat},${maxLon},${maxLat}`);
  url.searchParams.set("layer", "mapnik");
  url.searchParams.set("marker", `${lat},${lon}`);

  iframe.src = url.toString();
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "0";
  iframe.setAttribute("loading", "lazy");

  return iframe;
}

export default class OlMapImpl {
  constructor(options) {
    this._target = options?.target ?? null;
    this._view = options?.view ?? null;
    this._layers = Array.isArray(options?.layers) ? options.layers : [];
    this._controls = options?.controls ?? null;
    this._container = null;

    const element = resolveElement(this._target);
    if (element) {
      this._attach(element);
    }
  }

  _attach(element) {
    this._container = element;

    if (!this._container) {
      return;
    }

    this._container.classList.add("ol-viewport");
    this._container.innerHTML = "";
    this._container.appendChild(createIframe(this._view));
  }

  setTarget(target) {
    if (!target) {
      if (this._container) {
        this._container.classList.remove("ol-viewport");
        this._container.innerHTML = "";
      }
      this._container = null;
      return;
    }

    const element = resolveElement(target);
    if (element) {
      this._attach(element);
    }
  }
}
