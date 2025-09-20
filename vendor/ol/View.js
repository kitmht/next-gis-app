export default class View {
  constructor(options = {}) {
    this.center = options.center ?? [0, 0];
    this.zoom = typeof options.zoom === "number" ? options.zoom : 2;
  }
}
