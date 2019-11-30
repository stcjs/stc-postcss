const plugin = require('stc-plugin');
const postcss = require('postcss');

const Base = plugin.__esModule ? plugin.default : plugin;
module.exports = class PostCSSPlugin extends Base {
  async run() {
    const content = await this.getContent('utf-8');

    let result = null;
    try {
      result = await postcss(this.options).process(content, {
        from: this.file.path
      });
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