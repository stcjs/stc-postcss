const plugin = require('stc-plugin');
const { extend } = require('stc-helper');
const postcss = require('postcss');

module.exports = class PostCSSPlugin extends Plugin {
  async run() {
    const content = await this.getContent('utf-8');
    const postcss = postcss(this.options);

    let result = null;
    try {
      result = await postcss.process(content);
    } catch (e) {
      this.fatal(`[${e.status}] ${e.message}`, e.line, e.column);
    }

    return { content: result.css };
  }
  /**
   * update
   */
  update({ content }) {
    this.setContent(content);
  }
  /**
   * use cluster
   */
  static cluster() {
    return true;
  }
  /**
   * enable cache
   */
  static cache() {
    return true;
  }
  /**
   * set default include file
   */
  static include() {
    return /\.css/;
  }
}